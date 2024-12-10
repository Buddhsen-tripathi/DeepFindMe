"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, User, Menu, X } from "lucide-react";

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Toggle search visibility
  const searchRef = useRef<HTMLDivElement | null>(null); // Reference to the search input area

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);

    // Close the search input when clicked outside
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false); // Close the search input
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside); // Clean up the event listener
    };
  }, []);

  const navClassName = `fixed w-full z-50 transition-all duration-300 ${isScrolled || isOpen ? "bg-gray-900 bg-opacity-90 backdrop-blur-md" : "bg-transparent"
    }`;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search for:", searchQuery);
    // You can redirect to a search results page if needed
    // router.push(`/search?q=${searchQuery}`);
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
            <button
              className="text-white hover:text-cyan-400 transition-colors"
              onClick={() => setIsSearchOpen(!isSearchOpen)} // Toggle search input visibility
            >
              <Search size={20} />
            </button>
            <button className="text-white hover:text-cyan-400 transition-colors">
              <User size={20} />
            </button>
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

      {/* Search Input Field (visible when isSearchOpen is true) */}
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

      {/* Mobile menu */}
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

function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="block py-2 text-gray-300 hover:text-cyan-400 transition-colors">
      {children}
    </Link>
  );
}
