import React from "react";

const TerminalHeader = () => {
  return (
    <div className=" text-blue-400 font-mono mb-6">
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
        Type <span className="text-orange font-semibold">help</span> to get a
        list of available commands.
        <br />
        Use <span className="text-orange font-semibold">↑</span> and{" "}
        <span className="text-orange font-semibold">↓</span> to navigate command
        history.
      </div>
    </div>
  );
};

export default TerminalHeader;
