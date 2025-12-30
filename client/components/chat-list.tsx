"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ChatListItem } from "@/components/chat-list-item";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux";
import { useSocket } from "@/hooks/useSocket";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getAllUsers } from "@/services/user";
import { userType } from "@/types";

export function ChatList(props: { setSelectedUser: Dispatch<SetStateAction<any>> }) {
  const [usersData, setUsersData] = useState<userType[]>([
    {
      id: "",
      username: "",
      email: "",
      password: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);
  const getUserData = async () => {
    const userData = await getAllUsers();
    setUsersData(userData);
  };
  const currentUser = sessionStorage.getItem("currentUser");
  const userData = currentUser ? JSON.parse(currentUser) : null;
  const { onlineUsers } = useSocket(userData.userId);
  const offlineUsers = usersData.filter((usr) => !onlineUsers.includes(usr.id));
  useEffect(() => {
    const fetchUserData = async () => {
      await getUserData();
    };

    fetchUserData();
  }, []);
  console.log(`online users`, onlineUsers);
  return (
    <Accordion
      type="multiple"
      className="max-w-lg my-4 w-full space-y-2"
      defaultValue={["item-1"]}
    >
      {/* <AccordionItem value="item-1" className="border rounded-md">
        <AccordionTrigger className="px-3 py-2">Online</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance px-3 pb-3 h-[400px] overflow-y-auto">
          {onlineUsers &&
            onlineUsers.map((userId, i) => {
              const user = usersData.find((u) => u.id === userId);
              if (!user) return null;
              return (
                <ChatListItem
                  key={i}
                  user={user}
                  currentUser={userData}
                  setSelectedUser={props.setSelectedUser}
                />
              );
            })}
        </AccordionContent>
      </AccordionItem> */}

      <AccordionItem value="item-2" className="border rounded-md">
        <AccordionTrigger className="px-3 py-2">Users</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance px-3 pb-3 h-[400px] overflow-y-auto">
          {usersData &&
            usersData.map((user, i) => (
              <ChatListItem
                key={i}
                user={user}
                currentUser={userData}
                setSelectedUser={props.setSelectedUser}
              />
            ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
