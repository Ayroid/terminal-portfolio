const AliasCommand = () => {
  const aliases = [
    { alias: "ll", command: "ls -la" },
    { alias: "la", command: "ls -a" },
    { alias: "cls", command: "clear" },
    { alias: "h", command: "history" },
    { alias: "...", command: "cd ../.." },
    { alias: "gs", command: "git status" },
    { alias: "gp", command: "git pull" },
    { alias: "gc", command: "git commit" },
  ];

  return (
    <div className="font-hack text-sm">
      <p className="text-comment mb-2"># Defined aliases:</p>
      {aliases.map((item, i) => (
        <div key={i} className="flex">
          <span className="text-green">{item.alias}</span>
          <span className="text-foreground">=&apos;</span>
          <span className="text-yellow">{item.command}</span>
          <span className="text-foreground">&apos;</span>
        </div>
      ))}
    </div>
  );
};

export default AliasCommand;
