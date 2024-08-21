import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return (
        <header className="fixed top-0 left-0 w-full bg-light-secondaryBg dark:bg-dark-secondaryBg shadow-md z-50">
            <div className="container mx-auto flex items-center justify-between px-4 py-2 h-16">
                <div className="flex items-center space-x-4">
                    <Link href="/home">
                        <Image
                            src="/lightmode.svg"
                            alt="Inkhaven logo for light mode"
                            width={150}
                            height={70}
                            priority={true}
                            className="dark:hidden mt-2"
                        />
                        <Image
                            src="/darkmode.svg"
                            alt="Inkhaven logo for dark mode"
                            width={150}
                            height={70}
                            priority={true}
                            className="hidden dark:block mt-2"
                        />
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                </div>
            </div>
        </header>
    );
}
