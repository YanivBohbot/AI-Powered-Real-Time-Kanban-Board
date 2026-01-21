import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SERVER_URL = "http://localhost:3000"; // Your Backend URL

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // 1. Connect to the server
    const socketInstance = io(SERVER_URL);

    // 2. Save the connection
    setSocket(socketInstance);

    // 3. Cleanup on close
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return socket;
};
