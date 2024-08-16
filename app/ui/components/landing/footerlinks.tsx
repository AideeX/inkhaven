import Link from 'next/link';

const links = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Use', href: '/terms' },
    { name: 'Frequently Asked Questions', href: '/faq' },
];

export function FooterLinks() {
    return (
        <nav className="flex flex-col items-center gap-4">
            {links.map(({ name, href }) => (
                <Link key={name} href={href} className="text-light-heading hover:text-light-accentMedium active:text-light-accentDark visited:text-light-accentDark transition duration-300 ease-in-out transform hover:scale-105">
                    {name}
                </Link>
            ))}
        </nav>
    );
}