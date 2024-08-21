'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/lib/firebase/auth/authcontext';

const links = [
  { name: 'Profile', href: '/home/[id]/user/profile' },
  { name: 'Content', href: '/home/[id]/user/content' },
  { name: 'Dashboard', href: '/home/[id]/user/dashboard' },
  { name: 'Settings', href: '/home/[id]/user/settings' },
];

export default function NavLinks() {
  const { user } = useAuth();
  const pathname = usePathname();

  return (
    <nav className="flex flex-col space-y-2 p-4 bg-light-secondaryBg dark:bg-dark-secondaryBg text-center">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href.replace('[id]', user?.uid || '')}
          className={`block px-4 py-2 rounded-md text-light-text dark:text-dark-text ${
            pathname === link.href.replace('[id]', user?.uid || '')
              ? 'bg-light-accentMedium dark:bg-dark-accentMedium text-white'
              : 'hover:bg-light-accentLight dark:hover:bg-dark-accentLight'
          }`}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
