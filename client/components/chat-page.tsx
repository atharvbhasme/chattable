"use client";

import { ChatList } from "./chat-list";
import { ChatWindow } from "./chat-window";


export default function ChatPage() {
  return (
    <main className="flex items-center justify-center min-h-screen p-4">
      {/* Parent container for desktop fit */}
      <div className="flex h-[90vh] w-full lg:h-[80vh] lg:flex-row">
         <ChatList />
        <ChatWindow />
      </div>
    </main>
  );
}
