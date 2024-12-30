"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { ThemeSwitcher } from "../ThemeSwitcher";

type PatternsType = { [key: string]: string[] };

const generateAsciiArt = (text: string) => {
  const patterns: PatternsType = {
    A: [" ████ ", "██  ██", "██████", "██  ██", "██  ██"],
    B: ["██████", "██  ██", "██████", "██  ██", "██████"],
    C: [" ████ ", "██    ", "██    ", "██    ", " ████ "],
    D: ["██████", "██  ██", "██  ██", "██  ██", "██████"],
    E: ["██████", "██    ", "████  ", "██    ", "██████"],
    F: ["██████", "██    ", "████  ", "██    ", "██    "],
    G: [" ████ ", "██    ", "██ ███", "██  ██", " ████ "],
    H: ["██  ██", "██  ██", "██████", "██  ██", "██  ██"],
    I: ["██████", "  ██  ", "  ██  ", "  ██  ", "██████"],
    J: ["██████", "   ██ ", "   ██ ", "██ ██ ", " ███  "],
    K: ["██  ██", "██ ██ ", "████  ", "██ ██ ", "██  ██"],
    L: ["██    ", "██    ", "██    ", "██    ", "██████"],
    M: ["██   ██", "███ ███", "██ █ ██", "██   ██", "██   ██"],
    N: ["██  ██", "███ ██", "██ ███", "██  ██", "██  ██"],
    O: [" ████ ", "██  ██", "██  ██", "██  ██", " ████ "],
    P: ["██████", "██  ██", "██████", "██    ", "██    "],
    Q: [" ████ ", "██  ██", "██  ██", "██ ██ ", " ██ ██"],
    R: ["██████", "██  ██", "██████", "██ ██ ", "██  ██"],
    S: [" ████ ", "██    ", " ████ ", "    ██", "████  "],
    T: ["██████", "  ██  ", "  ██  ", "  ██  ", "  ██  "],
    U: ["██  ██", "██  ██", "██  ██", "██  ██", " ████ "],
    V: ["██  ██", "██  ██", "██  ██", " ████ ", "  ██  "],
    W: ["██   ██", "██   ██", "██ █ ██", "███ ███", "██   ██"],
    X: ["██  ██", " ████ ", "  ██  ", " ████ ", "██  ██"],
    Y: ["██  ██", " ████ ", "  ██  ", "  ██  ", "  ██  "],
    Z: ["██████", "   ██ ", "  ██  ", " ██   ", "██████"],
    " ": ["      ", "      ", "      ", "      ", "      "],
    0: [" ████ ", "██  ██", "██  ██", "██  ██", " ████ "],
    1: ["  ██  ", " ███  ", "  ██  ", "  ██  ", "██████"],
    2: [" ████ ", "    ██", " ████ ", "██    ", "██████"],
    3: [" ████ ", "    ██", " ████ ", "    ██", " ████ "],
    4: ["██  ██", "██  ██", "██████", "    ██", "    ██"],
    5: ["██████", "██    ", "██████", "    ██", "██████"],
    6: [" ████ ", "██    ", "██████", "██  ██", " ████ "],
    7: ["██████", "    ██", "   ██ ", "  ██  ", " ██   "],
    8: [" ████ ", "██  ██", " ████ ", "██  ██", " ████ "],
    9: [" ████ ", "██  ██", " █████", "    ██", " ████ "],
  };

  const lines = ["", "", "", "", ""];
  const chars = text.toUpperCase().split("");

  chars.forEach((char) => {
    const pattern = patterns[char] || patterns[" "];
    for (let i = 0; i < 5; i++) {
      lines[i] += pattern[i] + " ";
    }
  });

  return lines.join("\n");
};

interface TerminalHeaderProps {
  username?: string;
}

const TerminalHeader = ({ username = "AYROID" }: TerminalHeaderProps) => {
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
            {generateAsciiArt(username)}
          </pre>

          <div className="mt-4 text-white">
            Welcome to my portfolio!
            <br />
            Type <span className="text-orange font-semibold">help</span> to get
            a list of available commands.
          </div>
        </>
      )}
      <div className="fixed bottom-6 right-8 text-sm font-semibold flex flex-col items-end gap-4">
        <ThemeSwitcher />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              className="text-primary"
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
