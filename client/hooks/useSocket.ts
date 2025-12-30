"use client";

import { useEffect, useState } from "react";
import { getSocket } from "@/lib/socket";

export function useSocket(userId: string | null) {
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = getSocket();

    function onConnect() {
      setIsConnected(true);
      console.log("Socket connected");
    }

    function onDisconnect() {
      setIsConnected(false);
      console.log("Socket disconnected");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    // Initial check
    if (socket.connected) {
      onConnect();
    }

    if (userId) {
      socket.emit("user-online", userId);
    }

    socket.on("online-users", (users: string[]) => {
      setOnlineUsers(users);
    });

    socket.on("receive-message", (msg: any) => {
      const formattedMsg = {
        id: Math.random().toString(36).substring(7), // Temporary ID
        sender: msg.sender,
        receiver: userId || "", // Typo fixed
        content: msg.content,
        read: false,
        createdAt: msg.createdAt,
        updatedAt: msg.createdAt,
      };
      setMessages((prev) => [...prev, formattedMsg]);
    });

    socket.on("video-signal", ({ from, signal }) => {
      console.log("📹 Incoming video signal:", from, signal);
      // Handle WebRTC offer/answer/ICECandidate here
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("online-users");
      socket.off("receive-message");
      socket.off("video-signal");
    };
  }, [userId]);

  // Send private message
  const sendMessage = (receiver: string, content: string) => {
    const socket = getSocket();
    socket.emit("send-message", { sender: userId, receiver, content });
  };

  // Send WebRTC signaling message
  const sendVideoSignal = (to: string, signal: any) => {
    const socket = getSocket();
    socket.emit("video-signal", { to, from: userId, signal });
  };

  const sendRequest = (from: string, to: string) => {
    const socket = getSocket();
    socket.emit("send-request", { from, to });
  };

  const acceptRequest = (from: string, to: string) => {
    const socket = getSocket();
    socket.emit("accept-request", { from, to });
  };

  return { onlineUsers, messages, sendMessage, sendVideoSignal, sendRequest, acceptRequest, isConnected };
}
