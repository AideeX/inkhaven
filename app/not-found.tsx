'use client';

import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-light-primary dark:bg-dark-primary">
      <div className="text-center p-8">
        <h1 className="text-6xl font-bold text-light-heading dark:text-dark-heading mb-4">404</h1>
        <p className="text-2xl text-light-text dark:text-dark-text mb-6">
                Oops! The page you are looking for doesn&apos;t exist.
        </p>
        <Link href="/" className="text-light-linkDefault dark:text-dark-linkDefault hover:text-light-linkHover dark:hover:text-dark-linkHover bg-light-buttonDefault dark:bg-dark-buttonDefault py-2 px-4 rounded-md">Go Hom</Link>
      </div>
    </div>
  );
}
