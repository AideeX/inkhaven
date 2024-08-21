'use client';

import { useState } from 'react';
import NavLinks from "@/app/ui/components/user/navlinks";
import Image from "next/image";
import Link from "next/link";
import { SignOutButton } from "../general/buttons";
import { FaBars, FaTimes } from "react-icons/fa"; 

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative shadow">

            <button
                onClick={toggleSidebar}
                className="absolute top-4 left-4 sm:hidden z-50 text-2xl text-light-text dark:text-dark-text"
            >
                {isOpen ? <FaTimes /> : <FaBars />}
            </button>


            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-light-secondaryBg dark:bg-dark-secondaryBg p-4 z-40 transform ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out sm:translate-x-0 sm:relative sm:w-64`}
            >
                <div className="mb-8 justify-center items-center">
                    <Link href="/home">
                        <Image
                            src="/lightmode.svg"
                            alt="Inkhaven logo for light mode"
                            width={150}
                            height={75}
                            priority={true}
                            className="dark:hidden"
                        />
                        <Image
                            src="/darkmode.svg"
                            alt="Inkhaven logo for dark mode"
                            width={150}
                            height={75}
                            priority={true}
                            className="hidden dark:block"
                        />
                    </Link>
                </div>

                <div className="flex-grow">
                    <NavLinks />
                </div>

                <div className="mt-8 flex justify-center">
                    <SignOutButton />
                </div>
            </aside>


            {isOpen && (
                <div
                    onClick={toggleSidebar}
                    className="fixed inset-0 bg-black opacity-50 z-30 sm:hidden"
                />
            )}
        </div>
    );
}

