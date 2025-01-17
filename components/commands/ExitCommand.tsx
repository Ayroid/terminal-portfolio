"use client";

import { useCommandLineHistory } from "@/store/commandLineHistoryStore";
import { useEffect, useState } from "react";

const ExitCommand = () => {
  const { clearHistory } = useCommandLineHistory((state) => state);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage("logout");
    const timer = setTimeout(() => {
      clearHistory();
    }, 1000);

    return () => clearTimeout(timer);
  }, [clearHistory]);

  return (
    <div className="font-hack">
      <p className="text-yellow">{message}</p>
      <p className="text-comment">Goodbye! Thanks for visiting.</p>
      <p className="text-comment">Clearing terminal...</p>
    </div>
  );
};

export default ExitCommand;
