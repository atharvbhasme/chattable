"use client";

import { useEffect, useState } from "react";
import { getSocket } from "@/lib/socket";

export function useSocket(userId: string | null) {
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const socket = getSocket();

    if (userId) {
      socket.emit("user-online", userId);
    }

    socket.on("online-users", (users: string[]) => {
      setOnlineUsers(users);
    });

    socket.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("incoming-chat-request", ({ fromUserId }) => {
      console.log("📩 Chat request from:", fromUserId);
    });

    socket.on("chat-request-accepted", ({ roomId }) => {
      console.log("✅ Joined room:", roomId);
    });

    return () => {
      socket.off("online-users");
      socket.off("receive-message");
      socket.off("incoming-chat-request");
      socket.off("chat-request-accepted");
    };
  }, [userId]);

  const sendMessage = (roomId: string, sender: string, receiver: string, content: string) => {
    const socket = getSocket();
    socket.emit("send-message", { roomId, sender, receiver, content });
  };

  const sendChatRequest = (fromUserId: string, toUserId: string) => {
    const socket = getSocket();
    socket.emit("chat-request", { fromUserId, toUserId });
  };

  const acceptChatRequest = (fromUserId: string, toUserId: string, roomId: string) => {
    const socket = getSocket();
    socket.emit("accept-chat-request", { fromUserId, toUserId, roomId });
  };

  return { onlineUsers, messages, sendMessage, sendChatRequest, acceptChatRequest };
}
