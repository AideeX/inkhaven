'use client';

import { useAuth } from "@/app/lib/firebase/auth/authcontext";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import md5 from 'md5';
import { SignOutButton, CreateButton } from "@/app/ui/components/general/buttons";
import SearchBar from './searchbar';
import Notifications from './notifications';
import ThemeSwitch from '@/app/ui/components/general/themeswitch';

const getGravatarUrl = (email: string) => {
    const hash = md5(email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
};

type ProfileMenuProps = {
    includeCreateButtonOnMobile?: boolean;
    includeSearchBarOnMobile?: boolean;
    includeIconsOnMobile?: boolean;
};

const ProfileMenu: React.FC<ProfileMenuProps> = ({
    includeCreateButtonOnMobile = false,
    includeSearchBarOnMobile = false,
    includeIconsOnMobile = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();
    const [profilePicture, setProfilePicture] = useState<string>('');

    useEffect(() => {
        if (user?.email) {
            const gravatarUrl = getGravatarUrl(user.email);
            setProfilePicture(user?.photoURL || gravatarUrl);
        } else {
            setProfilePicture('/default-profile.png');
        }
    }, [user?.email, user?.photoURL]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
        <button onClick={toggleMenu} className="flex items-center">
          <Image
            src={profilePicture}
            alt="Profile Picture"
            width={40}
            height={40}
            className="rounded-full"
          />
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-80 h-auto bg-light-secondaryBg dark:bg-dark-secondaryBg shadow-3xl rounded-xl overflow-hidden z-50 md:z-10 ">
 
            <div className="bg-light-secondaryBg dark:bg-dark-secondaryBg p-4 border-b border-light-accentLight dark:border-dark-secondaryBg flex flex-col items-center hover:bg-light-accentLight dark:hover:bg-dark-accentLight">
              <Image
                src={profilePicture}
                alt="Profile Picture"
                width={60}
                height={60}
                className="rounded-full mb-2"
              />
              <p className="font-semibold text-light-heading dark:text-dark-heading ">
                {user?.displayName || "User"}
              </p>
              <p className="text-sm text-light-text dark:text-dark-secondaryText">
                {user?.email}
              </p>
            </div>
      

            <div className="p-4 flex flex-col items-center space-y-4">
              {includeCreateButtonOnMobile && (
                <div className="block md:hidden w-full text-center mb-4">
                  <div className="pb-2">
                    <CreateButton />
                  </div>
                </div>
              )}
      
 
              {includeSearchBarOnMobile && (
                <div className="block md:hidden w-full text-center mb-4">
                  <div className="pb-2">
                    <SearchBar  placeholder="Search InkHaven"/>
                  </div>
                </div>
              )}
      

              {includeIconsOnMobile && (
                <div className="md:hidden w-full text-center mt-4">
                  <div className="flex justify-center items-center space-x-4 pb-2 hover:bg-light-accentLight dark:hover:bg-dark-accentLight">
                    <Notifications />
                    <ThemeSwitch />
                  </div>
                </div>
              )}
            </div>
    
            <div className="p-2 border-t border-light-accentLight dark:border-dark-secondaryBg hover:bg-light-accentLight dark:hover:bg-dark-accentLight">
              <Link
                href={`/home/${user?.uid}/user/profile`}
                className="block w-full text-center px-4 py-2 text-light-text dark:text-dark-text hover:bg-light-secondaryBg dark:hover:bg-dark-secondaryBg rounded"
              >
                Profile
              </Link>
              <Link
                href={`/home/${user?.uid}/user/content?tab=posts`}
                className="block w-full text-center px-4 py-2 text-light-text dark:text-dark-text hover:bg-light-accentLight dark:hover:bg-dark-accentLight rounded "
              >
                My Posts
              </Link>
              <Link
                href={`/home/${user?.uid}/user/content?tab=drafts`}
                className="block w-full text-center px-4 py-2 text-light-text dark:text-dark-text hover:bg-light-accentLight dark:hover:bg-dark-accentLight rounded"
              >
                Drafts
              </Link>
              <Link
                href={`/home/${user?.uid}/user/content?tab=saved`}
                className="block w-full text-center px-4 py-2 text-light-text dark:text-dark-text hover:bg-light-accentLight dark:hover:bg-dark-accentLight rounded"
              >
                Saved Posts
              </Link>
              <Link
                href={`/home/${user?.uid}/user/dashboard`}
                className="block w-full text-center px-4 py-2 text-light-text dark:text-dark-text hover:bg-light-accentLight dark:hover:bg-dark-accentLight rounded"
              >
                Dashboard
              </Link>
              <Link
                href={`/home/${user?.uid}/user/settings`}
                className="block w-full text-center px-4 py-2 text-light-text dark:text-dark-text hover:bg-light-accentLight dark:hover:bg-dark-accentLight rounded"
              >
                Settings
              </Link>
              <div className="block w-full text-center px-4 py-2 text-light-text dark:text-dark-text hover:bg-light-accentLight dark:hover:bg-dark-accentLight rounded">
                <SignOutButton />
              </div>
            </div>
          </div>
        )}
      </div>
      

      
    );
};

export default ProfileMenu;
