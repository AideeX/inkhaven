import Image from 'next/image';
import Link from 'next/link';
import ThemeSwitch from '@/app/ui/components/general/themeswitch';
import { CreateButton } from '@/app/ui/components/general/buttons';
import SearchBar from './searchbar';
import Notification from './notifications';
import ProfileMenu from './profilemenu';

export default function Header() {
  return (
    <header className="bg-light-secondaryBg dark:bg-dark-secondaryBg shadow-md py-4 w-full h-16">
    <div className="container mx-auto flex items-center justify-between px-4 h-full">
        
        <div className="flex items-center space-x-4 w-1/2">
            <Link href="/home">
                <Image
                    src="/lightmode.svg"
                    alt="Inkhaven logo for light mode"
                    width={200}
                    height={75}
                    priority={true}
                    className="dark:hidden"
                />
                <Image
                    src="/darkmode.svg"
                    alt="Inkhaven logo for dark mode"
                    width={200}
                    height={75}
                    priority={true}
                    className="hidden dark:block"
                />
            </Link>
            <SearchBar />
        </div>

        <div className="flex items-center justify-end space-x-4 md:space-x-8 w-1/2">
            <div className="hidden md:block">
                <CreateButton />
            </div>
            <ThemeSwitch />
            <Notification />
            <ProfileMenu includeCreateButtonOnMobile={true} />
        </div>
    </div>
</header>

  );
}
