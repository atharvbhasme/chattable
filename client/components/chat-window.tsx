"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { ChatHeader } from "@/components/chat-header";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: string;
}

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  
  useEffect(() => {
    setMessages([
      { id: 1, text: "Hello!", sender: "bot", timestamp: getCurrentTime() },
      { id: 2, text: "Hi there!", sender: "user", timestamp: getCurrentTime() },
    ]);
  }, []);
  const [input, setInput] = useState("");
  const [showChatHeader, setShowChatHeader] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage: Message = {
      id: Date.now(),
      text: input,
      sender: "user",
      timestamp: getCurrentTime(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setTimeout(() => simulateBotResponse("This is a streamed bot reply for demo..."), 500);
  };

  const simulateBotResponse = (fullText: string) => {
    const botId = Date.now();
    const timestamp = getCurrentTime();
    setMessages((prev) => [...prev, { id: botId, text: "", sender: "bot", timestamp }]);

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botId ? { ...msg, text: fullText.slice(0, i) } : msg
        )
      );
      if (i === fullText.length) clearInterval(interval);
    }, 40); // speed of streaming
  };

  return (
    <div className="flex flex-col h-full w-full mx-auto border rounded-lg overflow-hidden bg-background">
      {/* chat heafer */}
     {showChatHeader && <ChatHeader />}
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === "user" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-[75%] whitespace-pre-wrap ${
                msg.sender === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              {msg.text}
            </div>
            <span className="text-xs text-muted-foreground mt-1">
              {msg.timestamp}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-3 border-t flex items-center gap-2">
        <Input
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button size="icon" onClick={sendMessage}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// Utility: get current time
function getCurrentTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
