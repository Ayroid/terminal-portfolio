"use client";
import React, { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TerminalHeader = () => {
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.altKey && event.key === "/") {
        setShowHeader((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="text-blue-400 font-mono mb-6">
      {showHeader && (
        <>
          <pre className="text-sm whitespace-pre">
            {`
 █████    ██    ██   ██████     ██████    ██    ██████
██   ██    ██  ██    ██   ██   ██    ██   ██    ██   ██
███████     ████     ██████    ██    ██   ██    ██   ██
██   ██      ██      ██   ██   ██    ██   ██    ██   ██
██   ██      ██      ██   ██    ██████    ██    ██████
`}
          </pre>

          <div className="mt-4 text-white">
            Welcome to my portfolio!
            <br />
            Type <span className="text-orange font-semibold">help</span> to
            get a list of available commands.
          </div>
        </>
      )}
      <div className="fixed bottom-6 right-8 text-sm font-semibold">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              className="text-pink"
              onClick={() => setShowHeader((prev) => !prev)}
            >
              Ctrl + Alt + /
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle header</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default TerminalHeader;
