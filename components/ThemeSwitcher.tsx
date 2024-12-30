import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Theme, useTheme } from "@/themes/theme-provider";
import { PaletteIcon, CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const themes: Array<{ name: string; value: Theme }> = [
    { name: "Catppuccin", value: "catppuccin" },
    { name: "Dracula", value: "dracula" },
    { name: "Solarized Dark", value: "solarized" },
    { name: "Nord", value: "nord" },
    { name: "Gruvbox Dark", value: "gruvbox" },
    { name: "One Dark", value: "onedark" },
    { name: "Monokai", value: "monokai" },
    { name: "Tokyo Night", value: "tokyo-night" },
    { name: "GitHub Dark", value: "github-dark" },
    { name: "Material", value: "material" },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <PaletteIcon className="h-5 w-5 text-primary cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[350px] max-w-[400px] border-none shadow-lg rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Select Theme
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[400px] overflow-y-auto pr-4 -mr-4 theme-scroller">
          <div className="space-y-2">
            {themes.map((t) => (
              <Button
                key={t.value}
                variant={theme === t.value ? "default" : "ghost"}
                onClick={() => setTheme(t.value)}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  theme === t.value && "font-medium"
                )}
              >
                {t.name}
                {theme === t.value && (
                  <CheckIcon className="ml-auto h-4 w-4" />
                )}
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
