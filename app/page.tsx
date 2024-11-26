import CommandInput from "@/components/terminal/CommandInput";
import TerminalHeader from "@/components/terminal/TerminalHeader";

export default function Home() {
  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <TerminalHeader />
      <CommandInput />
    </div>
  );
}
