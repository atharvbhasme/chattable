"use client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Video } from "lucide-react";

interface ChatHeaderProps {
  onVideoCall: () => void;
  selectedUser: any;
}

export function ChatHeader({ onVideoCall, selectedUser }: ChatHeaderProps) {
  const showVideo = true;
  return (
    <div className="flex flex-row justify-between border p-2">
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage
          src={
            "https://png.pngtree.com/png-clipart/20191120/original/pngtree-outline-user-icon-png-image_5045523.jpg"
          }
          alt={"user"}
        />
        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
      </Avatar>
      <div className="text-lg font-semibold">{selectedUser.username}</div>
      {showVideo && (
        <div>
          <Button onClick={onVideoCall}>
            <Video />
          </Button>
        </div>
      )}
    </div>
  );
}
