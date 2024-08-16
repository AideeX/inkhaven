'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useSearch } from '@/app/lib/hooks/search';
import { SearchSkeleton } from '@/app/ui/skeletons';

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const { data: results = [], error, isValidating: loading } = useSearch(searchTerm);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    return (
        <div className="relative flex items-center bg-light-secondaryBg dark:bg-dark-secondaryBg rounded-lg w-full md:max-w-md">
        <div className="relative flex items-center w-full">
            <button 
                onClick={toggleSearch} 
                className="focus:outline-none md:hidden absolute left-3 h-6 w-6"  
            >
                <MagnifyingGlassIcon className="h-6 w-6 text-light-text dark:text-dark-text" />
            </button>
    
            <input
                type="text"
                placeholder="Search..."
                className={`pl-10 bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text focus:outline-none py-2 px-4 rounded-md transition-all duration-300 ease-in-out w-full ${
                    isSearchOpen ? "opacity-100 visible" : "opacity-0 invisible md:opacity-100 md:visible"
                }`}
                value={searchTerm}
                onChange={handleSearchChange}
            />
    
            <MagnifyingGlassIcon className="hidden md:block absolute left-3 h-6 w-6 text-light-text dark:text-dark-text" />
        </div>
    
        {loading && <SearchSkeleton />}
        {error && <p className="text-red-500">Error loading search results</p>}
        {results.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white dark:bg-dark-secondaryBg mt-2 p-2 rounded-lg shadow-lg max-h-64 overflow-y-auto z-50">
                {results.map(result => (
                    <Link 
                        key={result.id} 
                        href={`/post/${result.id}`} 
                        className="block px-4 py-2 text-light-text dark:text-dark-text hover:bg-light-secondaryBg dark:hover:bg-dark-secondaryBg rounded"
                    >
                        {result.title}
                    </Link>
                ))}
            </div>
        )}
    </div>
    
    );
}
