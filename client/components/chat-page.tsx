"use client";

import { useState } from "react";
import { ChatList } from "./chat-list";
import { ChatWindow } from "./chat-window";
import { useSocket } from "@/hooks/useSocket";

export default function ChatPage() {
  const mode = sessionStorage.getItem("mode");
  const currentUser = sessionStorage.getItem("currentUser");
  const [selectedUser, setSelectedUser] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("selectedUser");
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  const userData = currentUser ? JSON.parse(currentUser) : null;
  const { onlineUsers } = useSocket(userData?.userId);

  return (
    <main className="flex items-center justify-center min-h-screen p-4">
      <div className="flex h-[90vh] w-full lg:h-[80vh] lg:flex-row">
        {mode == "chat" && <ChatList setSelectedUser={setSelectedUser} />}
        <ChatWindow userSelected={selectedUser} />
      </div>
    </main>
  );
}
