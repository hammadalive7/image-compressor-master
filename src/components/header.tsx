import { ThemeToggle } from "./mode-toggle";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#047863]/40" style={{ background: "#047863" }}>
      <div className="mx-auto flex h-13 max-w-7xl items-center justify-between px-4 xl:px-8">

        <a href="/" className="group flex items-center gap-2.5">
          {/* Icon-only logo for small screens */}
          <img
            src="/logo piedpiper.svg"
            alt="Pied Piper"
            className="h-8 w-8 flex-shrink-0 transition-transform duration-150 group-hover:scale-105 sm:hidden"
          />
          {/* Full long logo for sm+ screens */}
          <img
            src="/long logo.png"
            alt="Pied Piper"
            className="hidden h-8 w-auto flex-shrink-0 transition-opacity duration-150 group-hover:opacity-80 sm:block"
          />
        </a>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-white/30 bg-white/10 px-3 py-0.5 text-[0.7rem] font-semibold tracking-wide text-white/90">
            Middle-Out™
          </span>
          <span className="hidden lg:block text-[10px] text-white/50 italic">
            Weissman score: ∞
          </span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
