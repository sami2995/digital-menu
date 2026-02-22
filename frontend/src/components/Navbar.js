import { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function Navbar({ favoritesCount = 0 }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-stone-900 dark:bg-stone-950 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 text-white font-bold text-lg no-underline"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/857/857681.png"
            alt="Digital Menu logo"
            className="w-7 h-7"
          />
          <span>Digital Menu</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="#hero"
            className="text-stone-300 hover:text-white transition-colors text-sm font-medium no-underline"
          >
            Home
          </a>
          <a
            href="#menu"
            className="text-stone-300 hover:text-white transition-colors text-sm font-medium no-underline"
          >
            Menu
          </a>
          <a
            href="#contact"
            className="text-stone-300 hover:text-white transition-colors text-sm font-medium no-underline"
          >
            Contact
          </a>

          {favoritesCount > 0 && (
            <span className="flex items-center gap-1 text-sm text-amber-400 font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              {favoritesCount}
            </span>
          )}

          <ThemeToggle />
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-3">
          {favoritesCount > 0 && (
            <span className="flex items-center gap-1 text-sm text-amber-400 font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              {favoritesCount}
            </span>
          )}
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white p-1"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-stone-700 bg-stone-900 dark:bg-stone-950 px-4 pb-4">
          <a
            href="#hero"
            className="block py-2 text-stone-300 hover:text-white transition-colors text-sm no-underline"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </a>
          <a
            href="#menu"
            className="block py-2 text-stone-300 hover:text-white transition-colors text-sm no-underline"
            onClick={() => setMobileOpen(false)}
          >
            Menu
          </a>
          <a
            href="#contact"
            className="block py-2 text-stone-300 hover:text-white transition-colors text-sm no-underline"
            onClick={() => setMobileOpen(false)}
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
