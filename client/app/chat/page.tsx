"use client";
import { AppSidebar } from "@/components/app-sidebar";
import ChatPage from "@/components/chat-page";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Chat() {
  return (
    <SidebarProvider>
      <div className="flex w-full">
        <AppSidebar />
        <main className="flex-1">
          <SidebarTrigger />
          <ChatPage />
        </main>
      </div>
    </SidebarProvider>
  );
}
