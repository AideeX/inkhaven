import Link from 'next/link';
import Image from 'next/image';
import { literata } from '../../styles/fonts';

export function Header() {
    return (
        <header className="bg-light-secondaryBg dark:bg-dark-secondaryBg shadow-md py-2 w-full h-16">
            <div className="container mx-auto flex items-center justify-between px-4 h-full">
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
                    <h2 className={`${literata.className} text-light-heading dark:text-dark-heading text-xl font-bold`}>
                        Create Post
                    </h2>
                </div>
                <div className="flex items-center space-x-4">
                </div>
            </div>
        </header>
    );
}
