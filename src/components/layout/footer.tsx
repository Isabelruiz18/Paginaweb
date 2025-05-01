import Link from 'next/link';

const familyLinks = [
  { href: '/family', label: 'NOVAE FAMILY' },
  { href: '/life', label: 'NOVAE LIFE' },
  { href: '/recruit', label: 'NOVAE RECRUIT' },
  { href: '/shop', label: 'NOVAE SHOP' }, // Example, adjust if needed
];

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-6 mt-12 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2 text-foreground">Familysite</h3>
            <nav className="flex flex-wrap gap-x-4 gap-y-2">
              {familyLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm hover:text-accent transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Novae Entertainment. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
