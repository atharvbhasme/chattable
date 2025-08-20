'use client'
import { AppSidebar } from "@/components/app-sidebar";
import ChatPage from "@/components/chat-page";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { StickyHeader } from "@/components/ui/sticky-header";

export default function AI() {
  return (
    <SidebarProvider>
        <div className="flex w-full">
          <AppSidebar />
          <main className="flex-1">
            <SidebarTrigger />
              <StickyHeader />
              <ChatPage />
          </main>
        </div>
      </SidebarProvider>
  );
}