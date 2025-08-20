"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { ChatListItem } from "@/components/chat-list-item";
import { InvitationsCard } from "@/components/ui/invitation-card";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Members() {
  const arr = Array.from({ length: 50 }, (_, i) => i);

  return (
    <SidebarProvider>
      <div className="flex w-full">
        <AppSidebar />
        <main className="flex-1 p-4">
          <SidebarTrigger />
          {/* Grid with exactly 3 items per row */}
          <div className="grid grid-cols-3 gap-4">
            {arr.map((data, index) => (
              <ChatListItem key={index} />
            ))}
          </div>
          {/* <InvitationsCard /> */}
        </main>
      </div>
    </SidebarProvider>
  );
}
