'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import NavLinks from "@/app/ui/components/landing/navlinks";
import { LoginButton, SignupButton } from "@/app/ui/components/general/buttons";
import { Sling as Hamburger } from "hamburger-react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="w-full h-16 bg-light-secondaryBg shadow-md flex items-center justify-between px-2 md:px-4">
            <div className="flex items-center z-50">
                <Link href="/" className="pt-4 hover:scale-105 transition-transform duration-300">
                    <Image 
                        src="/lightmode.svg" 
                        alt="InkHaven Logo" 
                        width={200} 
                        height={70} 
                        priority={true} 
                    />
                </Link>
            </div>
            <div className="hidden md:flex items-center space-x-2 md:space-x-4">
                <NavLinks />
            </div>
            <div className="hidden md:flex items-center space-x-2 md:space-x-4">
                <LoginButton />
                <SignupButton />
            </div>
            <div className="flex md:hidden items-center z-50">
                <Hamburger 
                    toggled={isMenuOpen} 
                    toggle={setIsMenuOpen} 
                    color="#4B4BFF" 
                    aria-label="Toggle menu"
                />
            </div>
            {isMenuOpen && (
                <>
                <div className="fixed inset-0 bg-light-secondaryBg opacity-50 transition-opacity duration-300 z-40"></div>
                <div className="absolute top-16 right-0 w-full bg-light-secondaryBg shadow-md flex flex-col items-center space-y-4 py-4 z-50">
                    <NavLinks />
                    <LoginButton />
                    <SignupButton />
                </div>
                </>
            )}
        </header>
    );
}
