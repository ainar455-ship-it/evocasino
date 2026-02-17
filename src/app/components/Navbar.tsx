"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

type NavLink = {
  label: string;
  href: string;
};

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Reviews", href: "/reviews" },
  { label: "Bonuses", href: "/bonuses" },
  { label: "Payment Methods", href: "/payment-methods" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="/"
              className="text-xl font-bold tracking-tight text-gray-900 md:text-2xl"
              aria-label="FreeSpinsCasinoZA Home"
            >
              FreeSpinsCasinoZA
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors duration-200"
                aria-current={link.href === "/" ? "page" : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary md:hidden"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-menu"
          className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}
          role="menu"
          aria-label="Mobile Navigation"
        >
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors duration-200"
                aria-current={link.href === "/" ? "page" : undefined}
                role="menuitem"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}