interface UnameCommandProps {
  args?: string[];
}

const UnameCommand = ({ args = [] }: UnameCommandProps) => {
  const showAll = args.includes("-a") || args.includes("--all");

  if (showAll) {
    return (
      <div className="text-foreground font-hack">
        Portfolio-Terminal 1.0.0 ayroid-dev Next.js-14 x86_64 Web/Browser
      </div>
    );
  }

  return <div className="text-foreground font-hack">Portfolio-Terminal</div>;
};

export default UnameCommand;
