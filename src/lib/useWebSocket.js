import { useState, useRef, useEffect } from "react";

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [output, setOutput] = useState("");
  const wsRef = useRef(null);

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (wsRef.current) wsRef.current.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const connectWebSocket = () => {
    if (
      wsRef.current &&
      (wsRef.current.readyState === WebSocket.OPEN ||
        wsRef.current.readyState === WebSocket.CONNECTING)
    ) {
      console.log("WebSocket is already connected or connecting");
      return;
    }

    // TODO - Replace with your own WebSocket server URL
    wsRef.current = new WebSocket("ws://localhost:8765");

    wsRef.current.onopen = (event) => {
      console.log("WebSocket Connected", event);
      setIsConnected(true);
    };

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "output") {
        setOutput(data.data + "\n");
      }
    };

    wsRef.current.onclose = (event) => {
      console.log("WebSocket Disconnected", event);
      setIsConnected(false);
      setTimeout(connectWebSocket, 5000);
    };

    wsRef.current.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };
  };

  const sendCode = (code) => {
    if (!isConnected) {
      setOutput("Not connected to server. Please wait...\n");
      return;
    }
    wsRef.current.send(JSON.stringify({ type: "runCode", code }));
  };

  return { isConnected, output, sendCode };
}
