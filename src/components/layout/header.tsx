"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, Languages } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/ui/logo';
import { cn } from '@/lib/utils';
import React from 'react';

const navLinks = [
  { href: '/', label: 'NOVAE AUDITION' },
  { href: '/auditions', label: 'AUDICIONES' },
  { href: '/news', label: 'NOTICIAS' },
  { href: '/faq', label: 'PREGUNTAS FRECUENTES' },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold" aria-label="Go to homepage">
          <Logo className="h-6 w-auto text-primary-foreground" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-accent",
                pathname === link.href ? "text-accent" : "text-primary-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80 hover:text-accent">
                <Languages className="h-5 w-5" />
                <span className="sr-only">Select Language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>ES</DropdownMenuItem>
              <DropdownMenuItem>EN</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Navigation Trigger */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80 hover:text-accent">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] bg-primary text-primary-foreground p-4 pt-10">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-accent",
                       pathname === link.href ? "text-accent" : "text-primary-foreground"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
