"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, User, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Track login status
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false); // User menu toggle
  const searchRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check login status from localStorage
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    if (loggedInStatus === "true") {
      setIsLoggedIn(true);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);

    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navClassName = `fixed w-full z-50 transition-all duration-300 ${isScrolled || isOpen ? "bg-gray-900 bg-opacity-90 backdrop-blur-md" : "bg-transparent"
    }`;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search for:", searchQuery);
  };

  const handleSignOut = () => {
    // Clear login status
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user_uuid");
    setIsLoggedIn(false);
    router.push("/");
    console.log("User signed out");
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <nav className={navClassName}>
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white">
            <Image
              src="/logo-white.png"
              alt="Logo"
              width={50}
              height={50}
              className="rounded-full"
            />
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <NavLink href="/tools">Tools</NavLink>
            <NavLink href="/blogs">Blogs</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </div>
          <div className="flex items-center space-x-4">
            {/* <button
              className="text-white hover:text-cyan-400 transition-colors"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search size={20} />
            </button> */}
            {isLoggedIn ? (
              <>
                <div className="relative">
                  <button
                    onClick={toggleUserMenu}
                    className="text-white hover:text-cyan-400 transition-colors flex items-center"
                  >
                    <User size={20} />
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 bg-gray-800 text-white rounded-md mt-2 w-40 z-50">
                      <Link href="/profile" className="block px-4 py-2 hover:bg-gray-700">View Profile</Link>
                      <button
                        onClick={handleSignOut}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-700"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <NavLink href="/login">Login</NavLink>
                <NavLink href="/signup">Sign Up</NavLink>
              </>
            )}
            <button
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="md:hidden text-white hover:text-cyan-400 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isSearchOpen && (
        <div
          ref={searchRef}
          className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-gray-800 bg-opacity-90 p-4 rounded-md w-full md:w-96"
        >
          <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <button
              type="submit"
              className="px-4 py-2 text-white bg-cyan-500 rounded-md hover:bg-cyan-400"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {isOpen && (
        <div id="mobile-menu" className="md:hidden mt-4 bg-black bg-opacity-90 backdrop-blur-md">
          <div className="container mx-auto px-4 py-2">
            <MobileNavLink href="/tools">Tools</MobileNavLink>
            <MobileNavLink href="/blogs">Blogs</MobileNavLink>
            <MobileNavLink href="/contact">Contact</MobileNavLink>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-gray-300 hover:text-cyan-400 transition-colors">
      {children}
    </Link>
  );
}

function MobileNavLink({ href, children, onClick }: { href: string, children: React.ReactNode, onClick?: () => void }) {
  return (
    <Link href={href} className="block py-2 text-gray-300 hover:text-cyan-400 transition-colors" onClick={onClick}>
      {children}
    </Link>
  );
}
