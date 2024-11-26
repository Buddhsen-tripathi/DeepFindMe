"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, User, Menu, X } from "lucide-react";

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navClassName = `fixed w-full z-50 transition-all duration-300 ${
    isScrolled || isOpen ? "bg-gray-900 bg-opacity-90 backdrop-blur-md" : "bg-transparent"
  }`;

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
            <button className="text-white hover:text-cyan-400 transition-colors">
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
