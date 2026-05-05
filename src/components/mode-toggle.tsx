import { useTheme } from "@/components/theme-provider";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const toggle = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <button
      onClick={toggle}
      className="inline-flex items-center justify-center w-[34px] h-[34px] rounded-lg border border-white/25 bg-white/10 text-white cursor-pointer transition-colors hover:bg-white/20 hover:border-white/40"
      aria-label="Toggle theme"
    >
      <Sun className="size-[15px] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute size-[15px] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </button>
  );
}
