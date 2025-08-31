import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket() {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_BASE_URL, { 
      transports: ["websocket"],
    });
  }
  return socket;
}
