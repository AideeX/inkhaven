'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { playfairDisplay } from './ui/styles/fonts';

export default function Custom404() {
    const router = useRouter();

    const handleGoHome = () => {
        router.replace('/home');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-light-primary dark:bg-dark-primary">
            <div className="text-center p-8">
                <Image src="/under-construction.svg" alt="404 illustration" width={500} height={500} className="justify-center" />
                <h1 className={`${playfairDisplay.className} text-6xl font-bold text-light-heading dark:text-dark-heading mb-4`}>404</h1>
                <p className="text-2xl text-light-text dark:text-dark-text mb-6">
                    Oops! The page you are looking for doesn&apos;t exist.
                </p>
                <button onClick={handleGoHome} className="text-dark-text dark:text-dark-linkDefault hover:text-dark-text dark:hover:text-dark-linkHover bg-light-buttonDefault dark:bg-dark-buttonDefault py-2 px-4 rounded-md">
                    Go Home
                </button>
            </div>
        </div>
    );
}
