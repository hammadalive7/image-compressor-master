import { ThemeToggle } from "./mode-toggle";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-surface">
      <div className="mx-auto flex h-13 max-w-7xl items-center justify-between px-4 xl:px-8">

        <a href="/" className="group flex items-center gap-2.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 110"
            className="h-8 w-8 flex-shrink-0 transition-transform duration-150 group-hover:scale-105"
            aria-label="IMGZIP logo"
          >
            <defs>
              <linearGradient id="lg-frame" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#024950" />
                <stop offset="100%" stopColor="#0FA4AF" />
              </linearGradient>
              <linearGradient id="lg-inner" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0FA4AF" />
                <stop offset="100%" stopColor="#AFDDE5" />
              </linearGradient>
            </defs>
            <rect x="38" y="4" width="24" height="10" rx="5" fill="url(#lg-frame)" />
            <path d="M50 14 C18 14, 8 24, 8 50 C8 76, 18 90, 50 90 C82 90, 92 76, 92 50 C92 24, 82 14, 50 14 Z" fill="url(#lg-frame)" />
            <path d="M50 22 C26 22, 18 30, 18 50 C18 70, 26 82, 50 82 C74 82, 82 70, 82 50 C82 30, 74 22, 50 22 Z" fill="white" />
            <path d="M50 28 C30 28, 24 36, 24 50 C24 64, 30 76, 50 76 C70 76, 76 64, 76 50 C76 36, 70 28, 50 28 Z" fill="url(#lg-inner)" />
            <circle cx="63" cy="40" r="5" fill="white" opacity="0.90" />
            <polygon points="28,70 45,46 58,62" fill="white" opacity="0.75" />
            <polygon points="44,70 58,44 72,70" fill="white" opacity="0.95" />
          </svg>
          <span className="text-sm font-semibold tracking-tight text-foreground">
            IMGZIP
          </span>
        </a>

        <div className="flex items-center gap-2">
          <span className="app-chip app-chip-primary hidden sm:inline-flex">
            Free &amp; Local
          </span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
