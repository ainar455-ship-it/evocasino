import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
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
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-lg font-bold tracking-tight text-gray-900 md:text-xl flex items-center gap-2"
              aria-label="FreeSpinsCasinoZA Home"
            >
              <span className="text-xl">🎰</span>
              <span className="hidden sm:inline">FreeSpinsCasinoZA</span>
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
                        ? "font-semibold text-[var(--color-primary)]"
                        : "text-gray-600 hover:text-[var(--color-primary)]"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>
            <button
              type="button"
              className="p-2 text-gray-600 hover:text-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 rounded-full"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-[var(--color-primary)] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--color-primary)] md:hidden"
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
          <div className="space-y-0.5 px-2 py-2 sm:px-3">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`block rounded-lg px-3 py-2 text-base font-medium transition-colors duration-200 ${
                    active
                      ? "font-semibold text-[var(--color-primary)] bg-gray-50"
                      : "text-gray-600 hover:bg-gray-100 hover:text-[var(--color-primary)]"
                  }`}
                  aria-current={active ? "page" : undefined}
                  role="menuitem"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
