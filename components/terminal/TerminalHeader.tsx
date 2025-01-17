"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "@/themes/theme-provider";
import { validCommands } from "@/data/constants";
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

const SystemInfo = () => {
  const { theme } = useTheme();
  const commandCount = validCommands.length;

  const formatThemeName = (t: string) => {
    return t
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="font-hack text-sm mt-4 grid grid-cols-[auto_auto] gap-x-4 gap-y-1 w-fit">
      <span className="text-cyan font-bold">OS</span>
      <span className="text-foreground">Portfolio Terminal v1.0</span>
      <span className="text-cyan font-bold">Host</span>
      <span className="text-foreground">ayroid.dev</span>
      <span className="text-cyan font-bold">Shell</span>
      <span className="text-foreground">zsh 5.9</span>
      <span className="text-cyan font-bold">Theme</span>
      <span className="text-foreground">{formatThemeName(theme)}</span>
      <span className="text-cyan font-bold">Packages</span>
      <span className="text-foreground">{commandCount} commands</span>
    </div>
  );
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
    <div className="text-cyan font-mono mb-6">
      {showHeader && (
        <>
          <pre className="text-sm whitespace-pre">
            {generateAsciiArt(username)}
          </pre>

          <SystemInfo />

          <div className="mt-4 text-foreground font-hack">
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
