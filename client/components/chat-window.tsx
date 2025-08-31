"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { ChatHeader } from "@/components/chat-header";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux";
import { getMessagesForUser } from "@/services/messaging";
import { messageInterface } from "@/types";
import { useRouter } from "next/navigation";
import { useSocket } from "@/hooks/useSocket";

export function ChatWindow() {
  const mode = sessionStorage.getItem("mode");
  const router = useRouter();
  const [userMessages, setUserMessages] = useState<messageInterface[]>();
  const userData = useSelector((state: RootState) => state.auth.loginResponse);
  const { sendMessage, sendChatRequest, acceptChatRequest, messages } = useSocket(userData.userId);

  const getUserMessages = async () => {
    console.log("user data is", userData);
    const messageData = userData.userId
      ? await getMessagesForUser(userData.userId)
      : [];
    if (messageData.length > 0) {
      setUserMessages(messageData);
    } else {
      console.log(
        "User does not have any old chat history, redirecting it to members page"
      );
      router.push("/members");
    }
  };
  useEffect(() => {
    getUserMessages();
  }, []);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // const sendMessage = () => {
  //   if (!input.trim()) return;
  //   const newMessage: Message = {
  //     id: Date.now(),
  //     text: input,
  //     sender: "user",
  //     timestamp: getCurrentTime(),
  //   };
  //   setMessages((prev) => [...prev, newMessage]);
  //   setInput("");
  //   setTimeout(
  //     () => simulateBotResponse("This is a streamed bot reply for demo..."),
  //     500
  //   );
  // };

  return (
    <div className="flex flex-col h-full w-full mx-auto border rounded-lg overflow-hidden bg-background">
      {/* chat heafer */}
      {mode == "normal" && <ChatHeader />}
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {userMessages &&
          userMessages.map((msg) => {
            const dateTimeStamp = new Date(msg.updatedAt).toLocaleTimeString(
              [],
              {
                hour: "2-digit",
                minute: "2-digit",
              }
            );
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === userData.userId ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-[75%] whitespace-pre-wrap ${
                    msg.sender === userData.userId
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {msg.content}
                </div>
                <span className="text-xs text-muted-foreground mt-1">
                  {dateTimeStamp}
                </span>
              </div>
            );
          })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-3 border-t flex items-center gap-2">
        <Input
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button size="icon" >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
