import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

type NavLink = {
  label: string;
  href: string;
};

const navLinks: NavLink[] = [
  { label: "All Casinos", href: "/all-casinos" },
  { label: "Free Spins", href: "/free-spins" },
  { label: "No Deposit", href: "/no-deposit" },
  { label: "Mobile", href: "/mobile" },
  { label: "Payment Methods", href: "/payment-methods" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (href: string) => {
    // Exact match for now; can be extended for nested routes
    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#1a2b4a] shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Hamburger Menu / Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-[#2a3b5a] focus:outline-none focus:ring-2 focus:ring-[#FF6B00] md:hidden"
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
            <Link
              href="/"
              className="text-lg font-bold tracking-tight text-white md:text-xl flex items-center gap-2"
              aria-label="FreeSpinsSA Home"
            >
              <span className="text-xl">🎰</span>
              <span className="hidden sm:inline">FreeSpinsSA</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <nav className="flex items-center space-x-6" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`text-sm font-medium transition-colors duration-200 relative py-1 ${
                      active
                        ? "font-semibold text-[#FF6B00]"
                        : "text-gray-300 hover:text-white"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>
            {/* Orange Sign Up CTA */}
            <a
              href="/signup"
              className="inline-flex items-center justify-center rounded-lg bg-[#FF6B00] px-4 py-2 text-sm font-semibold text-white hover:bg-[#e65c00] transition-colors"
            >
              Sign Up
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-[#2a3b5a] focus:outline-none focus:ring-2 focus:ring-[#FF6B00] md:hidden ml-auto"
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
          <div className="space-y-0.5 px-2 py-3 sm:px-3 bg-[#1a2b4a]">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`block rounded-lg px-3 py-2 text-base font-medium transition-colors duration-200 ${
                    active
                      ? "font-semibold text-[#FF6B00] bg-[#2a3b5a]"
                      : "text-gray-300 hover:bg-[#2a3b5a] hover:text-white"
                  }`}
                  aria-current={active ? "page" : undefined}
                  role="menuitem"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              );
            })}
            {/* Mobile Sign Up CTA */}
            <div className="mt-3 px-3">
              <a
                href="/signup"
                className="block w-full text-center rounded-lg bg-[#FF6B00] px-4 py-3 text-base font-semibold text-white hover:bg-[#e65c00] transition-colors"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
