"use client";

import { useSelector } from "react-redux";
import { ChatList } from "./chat-list";
import { ChatWindow } from "./chat-window";
import { useSocket } from "@/hooks/useSocket";
import { RootState } from "@/lib/redux";

export default function ChatPage() {
  const mode = sessionStorage.getItem("mode")
  const userData = useSelector((state: RootState) => state.auth.loginResponse);
  const { onlineUsers } = useSocket(userData.userId);
  console.log("online", onlineUsers)
  return (
    <main className="flex items-center justify-center min-h-screen p-4">
      {/* Parent container for desktop fit */}
      <div className="flex h-[90vh] w-full lg:h-[80vh] lg:flex-row">
         {mode=='chat' && <ChatList />}
        <ChatWindow />
      </div>
    </main>
  );
}
