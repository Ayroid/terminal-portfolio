"use client";
import CommandInput from "@/components/terminal/CommandInput";
import TerminalHeader from "@/components/terminal/TerminalHeader";
import InitialLoading from "@/components/InitialLoading";
import { useState } from "react";

export default function Home() {
  const [isBooting, setIsBooting] = useState(true);

  if (isBooting) {
    return <InitialLoading setIsBooting={setIsBooting} />;
  }

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <TerminalHeader />
      <CommandInput />
    </div>
  );
}
