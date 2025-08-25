"use client";
import { Home, Inbox, MessageCircle} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavUser } from "@/components/ui/nav-user"
import { title } from "process"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/landing",
    icon: Home,
  },
  {
    title: "Find new people",
    url: "/members",
    icon: Inbox,
  },{
    title: 'Old Chats',
    url: '/chat',
    icon: MessageCircle
  }
]

const data = {
   user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "https://ui-avatars.com/api/?name=Chat&background=random",
  }
}

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
     <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}