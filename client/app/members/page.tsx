"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { ChatListItem } from "@/components/chat-list-item";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getAllUsers } from "@/services/user";
import { userType } from "@/types";
import { useEffect, useState } from "react";

export default function Members() {
  const [selectedUser, setSelectedUser] = useState();
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
  const currentUserString = sessionStorage.getItem("currentUser");
  const currentUser = currentUserString ? JSON.parse(currentUserString) : {};
  useEffect(() => {
    const fetchUserData = async () => {
      await getUserData();
    };

    fetchUserData();
  }, []);

  return (
    <SidebarProvider>
      <div className="flex w-full">
        <AppSidebar />
        <main className="flex-1 p-4">
          <SidebarTrigger />
          <div className="grid grid-cols-3 gap-4">
            {usersData.map((data, index) => (
              <ChatListItem
                key={index}
                user={data}
                currentUser={currentUser}
                // setSelectedUser={setSelectedUser}
              />
            ))}
          </div>
          {/* <InvitationsCard /> */}
        </main>
      </div>
    </SidebarProvider>
  );
}
