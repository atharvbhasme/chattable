"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { ChatListItem } from "@/components/chat-list-item";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { RootState, } from "@/lib/redux";
import { setAllUsers } from "@/lib/redux/slices/userSlice";
import { getAllUsers } from "@/services/user";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Members() {
  const dispatch = useDispatch();
  const usersData = useSelector((state: RootState) => state.users.allUsers);
  useEffect(() => {
    if (!usersData || usersData.length === 0) {
      getAllUsers().then(data => dispatch(setAllUsers(data)))
    }
  }, [usersData, dispatch]);
  console.log("all the data ", usersData)
  return (
    <SidebarProvider>
      <div className="flex w-full">
        <AppSidebar />
        <main className="flex-1 p-4">
          <SidebarTrigger />
          {/* Grid with exactly 3 items per row */}
          <div className="grid grid-cols-3 gap-4">
            {usersData.map((data, index) => (
              <ChatListItem key={index} />
            ))}
          </div>
          {/* <InvitationsCard /> */}
        </main>
      </div>
    </SidebarProvider>
  );
}
