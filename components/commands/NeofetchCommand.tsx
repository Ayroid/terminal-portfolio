import { useTheme } from "@/themes/theme-provider";
import { validCommands } from "@/data/constants";

const NeofetchCommand = () => {
  const { theme } = useTheme();

  const formatThemeName = (t: string) => {
    return t
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const logo = [
    "       ▄▄▄▄▄▄▄       ",
    "    ▄█████████████▄    ",
    "  ▄███████████████████▄  ",
    " █████████████████████████ ",
    "████████████████████████████",
    "███████████  ███████████████",
    "███████████  ███████████████",
    "████████████████████████████",
    " █████████████████████████ ",
    "  ▀███████████████████▀  ",
    "    ▀█████████████▀    ",
    "       ▀▀▀▀▀▀▀       ",
  ];

  const info = [
    { label: "ayroid@portfolio", value: "", isTitle: true },
    { label: "─────────────────", value: "", isDivider: true },
    { label: "OS", value: "Portfolio Terminal v1.0" },
    { label: "Host", value: "ayroid.dev" },
    { label: "Kernel", value: "Next.js 14" },
    { label: "Shell", value: "zsh 5.9" },
    { label: "Theme", value: formatThemeName(theme) },
    { label: "Terminal", value: "Web Terminal" },
    { label: "Packages", value: `${validCommands.length} commands` },
    { label: "Memory", value: "Unlimited creativity" },
  ];

  return (
    <div className="font-hack text-sm my-2">
      <div className="flex gap-8">
        {/* Logo */}
        <div className="text-cyan">
          {logo.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>

        {/* System Info */}
        <div className="flex flex-col justify-center">
          {info.map((item, i) => (
            <div key={i} className="flex">
              {item.isTitle ? (
                <span className="text-cyan font-bold">{item.label}</span>
              ) : item.isDivider ? (
                <span className="text-foreground">{item.label}</span>
              ) : (
                <>
                  <span className="text-cyan font-bold w-24">{item.label}</span>
                  <span className="text-foreground">{item.value}</span>
                </>
              )}
            </div>
          ))}

          {/* Color Palette */}
          <div className="flex gap-1 mt-2">
            <span className="w-4 h-4 bg-red inline-block"></span>
            <span className="w-4 h-4 bg-orange inline-block"></span>
            <span className="w-4 h-4 bg-yellow inline-block"></span>
            <span className="w-4 h-4 bg-green inline-block"></span>
            <span className="w-4 h-4 bg-cyan inline-block"></span>
            <span className="w-4 h-4 bg-purple inline-block"></span>
            <span className="w-4 h-4 bg-pink inline-block"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeofetchCommand;
