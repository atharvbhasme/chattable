"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { SidebarMenuButton } from "./ui/sidebar";
import { Dispatch, SetStateAction } from "react";
import { useSocket } from "@/hooks/useSocket";
import { usePathname, useRouter } from "next/navigation";
import { userType } from "@/types";

interface chatListItemInterface {
  name: string;
  // setSelectedUser: Dispatch<SetStateAction<string>>;
}

export function ChatListItem({
  user,
  currentUser,
  setSelectedUser,
}: {
  user: userType;
  currentUser: any;
  setSelectedUser: Dispatch<SetStateAction<any>>;
}) {
  const router = useRouter();
  const { sendRequest, acceptRequest } = useSocket(currentUser.userId);
  const pathname = usePathname();
  const isOnMemberPage = pathname === "/members";
  const isOnChatPage = pathname === "/chat";
  // const isFriend = currentUser.friends?.includes(user._id);
  // const hasIncomingRequest = currentUser.requests?.some(
  //   (r: any) => r.from === user._id && r.status === "pending"
  // );
  // const hasSentRequest = user.requests?.some(
  //   (r: any) => r.from === currentUser.userId && r.status === "pending"
  // );

  const handleAction = () => {
    sessionStorage.setItem("selectedUser", JSON.stringify(user));
    router.push("/chat");
  };

  return (
    <SidebarMenuButton
      size="lg"
      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground border-1"
      // onClick={() => isFriend && setSelectedUser(user._id)}
      onClick={
        isOnChatPage
          ? () => {
              sessionStorage.setItem("selectedUser", JSON.stringify(user));
              setSelectedUser(user);
            }
          : () => {}
      }
    >
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage
          src={
            "https://png.pngtree.com/png-clipart/20191120/original/pngtree-outline-user-icon-png-image_5045523.jpg"
          }
          alt={"user"}
        />
        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{user.username}</span>
      </div>
      {isOnMemberPage && (
        <div
          onClick={handleAction}
          className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded cursor-pointer"
        >
          chat
        </div>
      )}
    </SidebarMenuButton>
  );
}
