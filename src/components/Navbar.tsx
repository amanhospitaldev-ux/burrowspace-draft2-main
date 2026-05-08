"use client";

import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-full.png";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import JoinUsModal from "@/components/JoinUsModal";

const navLinks = [
  { label: "ABOUT US", to: "/about" },
  //{ label: "Career", href: "#" },
  { label: "CONTACT US", to: "/contactus" },
  { label: "FAQS", to: "/faqs" },
  { label: "CYBERSEC COMMUNITY", to: "/cybersec-community" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [joinUsOpen, setJoinUsOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50); // Hide logo after 50px scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-transparent px-6 py-6 sm:px-8 md:px-8 md:py-7 lg:px-16">
      <Link to="/" className={`flex items-center gap-3 py-2 transition-opacity duration-300 ${isMobile && isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <img src={logo} alt="BurrowSpace" className="h-13 w-auto" />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden items-center gap-2 md:flex">
        {navLinks.map((link) =>
          link.to.startsWith("/") ? (
            <Link
              key={link.label}
              to={link.to}
              className="px-4 py-3 text-xs font-medium tracking-[0.2em] text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ) : (
            <span
              key={link.label}
              className="cursor-default px-4 py-3 text-xs font-medium tracking-[0.2em] text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </span>
          )
        )}
      </div>

      <button
        onClick={() => setJoinUsOpen(true)}
        className="hidden rounded-none border border-white px-7 py-3 text-xs font-semibold tracking-[0.15em] text-white transition-colors hover:bg-white hover:text-[oklch(0.08_0.02_260)] md:inline-flex"
      >
        JOIN US
      </button>

      {/* Mobile Navigation Menu */}
      {isMobile && (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className="inline-flex items-center justify-center h-12 w-12 rounded-md md:hidden" aria-label="Toggle menu">
              {isOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64 bg-[oklch(0.08_0.02_260)]">
            <div className="flex flex-col gap-6 py-8">
              {navLinks.map((link) =>
                link.to.startsWith("/") ? (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="text-sm font-medium tracking-[0.15em] text-white/80 transition-colors hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <span
                    key={link.label}
                    className="cursor-default text-sm font-medium tracking-[0.15em] text-white/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </span>
                )
              )}
              <button
                onClick={() => { setIsOpen(false); setJoinUsOpen(true); }}
                className="mt-4 rounded-none border border-white px-6 py-2 text-xs font-semibold tracking-[0.15em] text-white transition-colors hover:bg-white hover:text-[oklch(0.08_0.02_260)] w-full"
              >
                JOIN US
              </button>
            </div>
          </SheetContent>
        </Sheet>
      )}

      <JoinUsModal open={joinUsOpen} onOpenChange={setJoinUsOpen} />
    </nav>
  );
}
