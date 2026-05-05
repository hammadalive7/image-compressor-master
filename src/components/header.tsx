import { ThemeToggle } from "./mode-toggle";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-surface">
      <div className="mx-auto flex h-13 max-w-7xl items-center justify-between px-4 xl:px-8">

        <a href="/" className="group flex items-center gap-2.5">
          {/* Pied Piper feather logo */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="h-8 w-8 flex-shrink-0 transition-transform duration-150 group-hover:scale-105"
            aria-label="Pied Piper logo"
          >
            <defs>
              <linearGradient id="pp-g1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#155724" />
                <stop offset="100%" stopColor="#28a745" />
              </linearGradient>
            </defs>
            {/* Feather quill */}
            <path d="M50 8 C70 8, 88 22, 88 50 C88 72, 72 90, 50 90 L50 8 Z" fill="url(#pp-g1)" />
            <path d="M50 8 C30 8, 12 22, 12 50 C12 72, 28 90, 50 90 L50 8 Z" fill="#1e8a38" opacity="0.7" />
            {/* Quill spine */}
            <line x1="50" y1="8" x2="50" y2="90" stroke="white" strokeWidth="2" opacity="0.6" />
            {/* Barbs */}
            <path d="M50 25 L72 35" stroke="white" strokeWidth="1.2" opacity="0.5" />
            <path d="M50 38 L76 45" stroke="white" strokeWidth="1.2" opacity="0.5" />
            <path d="M50 51 L74 56" stroke="white" strokeWidth="1.2" opacity="0.5" />
            <path d="M50 64 L68 68" stroke="white" strokeWidth="1.2" opacity="0.5" />
            <path d="M50 25 L28 35" stroke="white" strokeWidth="1.2" opacity="0.4" />
            <path d="M50 38 L24 45" stroke="white" strokeWidth="1.2" opacity="0.4" />
            <path d="M50 51 L26 56" stroke="white" strokeWidth="1.2" opacity="0.4" />
            <path d="M50 64 L32 68" stroke="white" strokeWidth="1.2" opacity="0.4" />
          </svg>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-bold tracking-tight text-foreground">
              Pied Piper
            </span>
            <span className="text-[9px] font-medium uppercase tracking-widest" style={{ color: "var(--primary)" }}>
              Image Compressor
            </span>
          </div>
        </a>

        <div className="flex items-center gap-2">
          <span className="app-chip app-chip-primary hidden sm:inline-flex">
            Middle-Out™
          </span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
