"use client";

import { useEffect, useState } from "react";

interface InitialLoadingProps {
  setIsBooting: (isBooting: boolean) => void;
}

const InitialLoading = ({ setIsBooting }: InitialLoadingProps) => {
  const bootMessages = [
    "Initializing system...",
    "Loading kernel modules...",
    "Starting terminal services...",
    "Establishing connection...",
  ];

  const [currentMessages, setCurrentMessages] = useState<string[]>([]);

  useEffect(() => {
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      if (messageIndex < bootMessages.length) {
        setCurrentMessages((prev) => [...prev, bootMessages[messageIndex]]);
        messageIndex++;
      }
    }, 750);

    const bootTimer = setTimeout(() => {
      setIsBooting(false);
    }, 4000);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(bootTimer);
    };
  }, []);

  return (
    <div className="container mx-auto p-8 max-w-4xl font-mono">
      <div className="text-green-500 animate-pulse mb-4">$ Starting system</div>
      {currentMessages.map((message, index) => (
        <div
          key={index}
          className="text-green-400"
          style={{
            animation: "typewriter 0.5s steps(40, end)",
          }}
        >
          {message}
        </div>
      ))}
    </div>
  );
};

export default InitialLoading;
