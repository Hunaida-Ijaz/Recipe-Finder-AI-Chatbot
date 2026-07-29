import { useState } from "react";

export default function Navbar({ onHome, onDesiCorner, onFavorites, onOpenChat, favoritesActive }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", action: onHome },
    { label: "Desi Corner 🌶️", action: onDesiCorner },
    { label: `Favorites ♥`, action: onFavorites, active: favoritesActive },
    { label: "Ask the Kitchen 🍃", action: onOpenChat },
  ];

  return (
    <nav className="wood-texture sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
        <span className="font-logo text-2xl sm:text-3xl text-cream tracking-wide">
          Naida Bites
        </span>

        {/* desktop nav */}
        <div className="hidden sm:flex items-center gap-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className={`font-body text-sm px-4 py-2 rounded-sm transition-colors ${
                item.active ? "bg-sage text-brown" : "text-cream/85 hover:bg-white/10"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* mobile menu toggle */}
        <button
          className="sm:hidden text-cream text-2xl leading-none"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* mobile menu */}
      {menuOpen && (
        <div className="sm:hidden flex flex-col gap-1 px-4 pb-4">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                item.action();
                setMenuOpen(false);
              }}
              className={`font-body text-sm text-left px-4 py-3 rounded-sm ${
                item.active ? "bg-sage text-brown" : "text-cream/85 hover:bg-white/10"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
