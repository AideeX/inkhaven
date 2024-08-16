'use client';

import { useAuth } from "@/app/lib/firebase/auth/authcontext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SignOutButton, CreateButton } from "@/app/ui/components/general/buttons";

const getDicebearAvatar = (seed: string) => {
    return `https://avatars.dicebear.com/api/initials/${encodeURIComponent(seed)}.svg`;
};

type ProfileMenuProps = {
    includeCreateButtonOnMobile?: boolean;
};

const ProfileMenu: React.FC<ProfileMenuProps> = ({ includeCreateButtonOnMobile = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();

    const profilePicture = user?.photoURL || getDicebearAvatar(user?.email || "Anonymous User");

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
                    className="rounded-full mr-6"
                />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-light-primary dark:bg-dark-primary shadow-3xl rounded-xl overflow-hidden z-50 md:z-10">
                    <div className="p-4 border-b border-light-accentLight dark:border-dark-secondaryBg">
                        <p className="font-semibold text-light-heading dark:text-dark-heading">
                            {user?.displayName || "User"}
                        </p>
                        <p className="text-sm text-light-text dark:text-dark-secondaryText">
                            {user?.email}
                        </p>
                    </div>
                    <div className="p-2 text-center">
                        {includeCreateButtonOnMobile && (
                            <div className="block md:hidden mb-2">
                                <CreateButton />
                            </div>
                        )}
                        <Link
                            href={`/home/${user?.uid}/user/profile`}
                            className="block w-full text-center px-4 py-2 text-light-text dark:text-dark-text hover:bg-light-secondaryBg dark:hover:bg-dark-secondaryBg rounded"
                        >
                            Profile
                        </Link>
                        <Link
                            href={`/home/${user?.uid}/user/content?tab=posts`}
                            className="block w-full text-center px-4 py-2 text-light-text dark:text-dark-text hover:bg-light-secondaryBg dark:hover:bg-dark-secondaryBg rounded"
                        >
                            My Posts
                        </Link>
                        <Link
                            href={`/home/${user?.uid}/user/content?tab=drafts`}
                            className="block w-full text-center px-4 py-2 text-light-text dark:text-dark-text hover:bg-light-secondaryBg dark:hover:bg-dark-secondaryBg rounded"
                        >
                            Drafts
                        </Link>
                        <Link
                            href={`/home/${user?.uid}/user/content?tab=saved`}
                            className="block w-full text-center px-4 py-2 text-light-text dark:text-dark-text hover:bg-light-secondaryBg dark:hover:bg-dark-secondaryBg rounded"
                        >
                            Saved Posts
                        </Link>
                        <Link
                            href={`/home/${user?.uid}/user/dashboard`}
                            className="block w-full text-center px-4 py-2 text-light-text dark:text-dark-text hover:bg-light-secondaryBg dark:hover:bg-dark-secondaryBg rounded"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href={`/home/${user?.uid}/user/settings`}
                            className="block w-full text-center px-4 py-2 text-light-text dark:text-dark-text hover:bg-light-secondaryBg dark:hover:bg-dark-secondaryBg rounded"
                        >
                            Settings
                        </Link>
                        <SignOutButton />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileMenu;
