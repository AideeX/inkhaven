'use client';

import { Sling as Hamburger } from "hamburger-react";
import Link from "next/link";

export default function MobileMenu({ isOpen, toggleMenu }: { isOpen: boolean; toggleMenu: () => void }) {
  return (
    <>

      <div className="flex md:hidden items-center z-50">
        <Hamburger
          toggled={isOpen}
          toggle={toggleMenu}
          color="#4B4BFF"
          aria-label="Toggle menu"
        />
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-80 transition-opacity duration-300 z-40"></div>
          <div className="absolute top-16 left-0 w-2/3 bg-light-secondaryBg shadow-md flex flex-col items-start space-y-4 py-4 z-50">
            <Link href="/home/featured" className="text-lg font-bold text-blue-600 hover:underline">
              Featured Posts
            </Link>
            <Link href="/home/members" className="text-lg font-bold text-blue-600 hover:underline">
              Community Members
            </Link>
          </div>
        </>
      )}
    </>
  );
}
