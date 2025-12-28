"use client";

import { useState } from "react";
import { ChatList } from "./chat-list";
import { ChatWindow } from "./chat-window";
import { useSocket } from "@/hooks/useSocket";

export default function ChatPage() {
  const mode = sessionStorage.getItem("mode");
  const currentUser = sessionStorage.getItem("currentUser");
  const selectedUserString = sessionStorage.getItem("selectedUser");
  const selectedUser = selectedUserString ? JSON.parse(selectedUserString) : {};
  const userData = currentUser ? JSON.parse(currentUser) : null;
  const { onlineUsers } = useSocket(userData?.userId);
  console.log("Current online Users: ", onlineUsers);
  return (
    <main className="flex items-center justify-center min-h-screen p-4">
      <div className="flex h-[90vh] w-full lg:h-[80vh] lg:flex-row">
        {mode == "chat" && <ChatList />}
        <ChatWindow userSelected={selectedUser} />
      </div>
    </main>
  );
}
