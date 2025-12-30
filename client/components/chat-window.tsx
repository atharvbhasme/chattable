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

interface chatWindowInterface {
  userSelected: any;
}

export function ChatWindow(props: chatWindowInterface) {
  const mode = sessionStorage.getItem("mode");
  const router = useRouter();
  const [userMessages, setUserMessages] = useState<messageInterface[]>([]);
  const currentUserString = sessionStorage.getItem("currentUser");
  const currentUser = currentUserString ? JSON.parse(currentUserString) : {};
  const { sendMessage, messages, sendVideoSignal, isConnected } = useSocket(
    currentUser.userId
  );
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const selectedUser = props.userSelected;

  const startVideoCall = async () => {
    setIsVideoCallActive(true);
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    if (localVideoRef.current) localVideoRef.current.srcObject = stream;

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
    peerConnectionRef.current = pc;

    stream.getTracks().forEach((track) => pc.addTrack(track, stream));

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        sendVideoSignal(props.userSelected, { candidate: event.candidate });
      }
    };

    pc.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    sendVideoSignal(props.userSelected, { offer });
  };

  const getUserMessages = async () => {
    console.log(
      `currnet user ${currentUser.userId}, selected user ${
        selectedUser._id || selectedUser.id
      }`
    );
    const messageData = await getMessagesForUser(
      currentUser.userId,
      selectedUser._id || selectedUser.id
    );

    console.log(`users message ${JSON.stringify(userMessages)}`);
    if (messageData.length > 0) {
      setUserMessages(messageData);
    } else {
      console.log(
        "User does not have any old chat history, redirecting it to members page"
      );
      // router.push("/members");
    }
  };
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    if (
      props.userSelected &&
      (props.userSelected._id || props.userSelected.id)
    ) {
      getUserMessages();
    }
  }, [messages, props.userSelected, currentUser]);

  return (
    <div className="flex flex-col h-full w-full mx-auto border rounded-lg overflow-hidden bg-background relative">
      {mode == "chat" && (
        <div className="flex items-center justify-between border-b px-4 py-2">
          <ChatHeader onVideoCall={startVideoCall} />
          <div className="flex items-center gap-2">
            <div
              className={`h-2 w-2 rounded-full ${
                isConnected ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span className="text-xs text-muted-foreground">
              {isConnected ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>
      )}

      {isVideoCallActive && (
        <div className="absolute inset-0 z-50 bg-black/80 flex flex-col items-center justify-center gap-4">
          <div className="relative w-full max-w-4xl flex gap-4 justify-center">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-1/3 border-2 border-primary rounded-lg"
            />
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-1/3 border-2 border-secondary rounded-lg"
            />
          </div>
          <Button
            variant="destructive"
            onClick={() => setIsVideoCallActive(false)}
          >
            End Call
          </Button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {[...userMessages, ...messages]
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
          .map((msg) => {
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
                  msg.sender === currentUser.userId
                    ? "items-end"
                    : "items-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-[75%] whitespace-pre-wrap ${
                    msg.sender === currentUser.userId
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

      <div className="p-3 border-t flex items-center gap-2">
        <Input
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setInput("");
            }
          }}
        />
        <Button
          size="icon"
          onClick={() => {
            sendMessage(props.userSelected, input);
            setInput("");
          }}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
