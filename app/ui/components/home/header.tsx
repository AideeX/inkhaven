'use client'

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ThemeSwitch from "@/app/ui/components/general/themeswitch";
import { CreateButton } from "@/app/ui/components/general/buttons";
import SearchBar from "./searchbar";
import Notifications from "./notifications";
import ProfileMenu from "./profilemenu";
import MobileMenu from "./mobilemenu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="bg-light-secondaryBg dark:bg-dark-secondaryBg shadow-md py-4 w-full h-16">
        <div className="container flex items-center justify-between px-4 sm:px-6 h-full my-auto">

          <div className="flex items-center space-x-4">
            <MobileMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
            <Link href="/home" className="flex-shrink-0">
              <Image
                src="/lightmode.svg"
                alt="Inkhaven logo for light mode"
                width={160}
                height={50}
                priority={true}
                className="dark:hidden"
              />
              <Image
                src="/darkmode.svg"
                alt="Inkhaven logo for dark mode"
                width={160}
                height={50}
                priority={true}
                className="hidden dark:block"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-2 sm:space-x-4 lg:space-x-6 w-full justify-center sm:mr-5">
            <SearchBar placeholder="Search InkHaven..." />
            <CreateButton />
          </div>

          <div className="flex items-center justify-end space-x-2 sm:space-x-4 lg:space-x-6 w-1/3 h-full pr-2 sm:pr-4 lg:pr-6">
            <div className="hidden md:flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
              <Notifications />
              <ThemeSwitch />
            </div>
            <ProfileMenu 
              includeCreateButtonOnMobile={true} 
              includeSearchBarOnMobile={true} 
              includeIconsOnMobile={true} 
            />
          </div>
        </div>
      </header>
    </>
  );
}
