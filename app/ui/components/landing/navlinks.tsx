import Link from 'next/link';

const links = [
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Support', href: '/support' },
];

export default function NavLinks() {
  return (
    <nav className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
      {links.map(({ name, href }) => (
        <Link 
          key={name} 
          href={href} 
          className="inline-block px-4 py-1 md:px-6 md:py-2 rounded-full text-light-text transition-colors duration-200 hover:bg-light-accentLight hover:text-light-linkActive shadow hover:shadow-md"
        >
          {name}
        </Link>
      ))}
    </nav>
  );
}
