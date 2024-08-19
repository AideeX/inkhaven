'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useSearch } from '@/app/lib/hooks/search';

export default function SearchBar({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const currentSearchTerm = searchParams.get('q') || '';

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('q', term);
        } else {
            params.delete('q');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 500);

    const { data: results = [], error } = useSearch(currentSearchTerm);

    return (
        <div className="relative flex items-center bg-light-secondaryBg dark:bg-dark-secondaryBg rounded-lg w-full md:max-w-md">
            <div className="relative flex items-center w-full">
                <MagnifyingGlassIcon className="absolute left-3 h-6 w-6 text-light-text dark:text-dark-text" />
                <input
                    type="text"
                    placeholder={placeholder}
                    className="pl-10 bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text focus:outline-none py-2 px-4 rounded-md transition-all duration-300 ease-in-out w-full"
                    defaultValue={currentSearchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>

            {currentSearchTerm && (
                <div className="absolute top-full left-0 right-0 mt-2 p-2 rounded-lg shadow-lg max-h-64 overflow-y-auto z-50 bg-white dark:bg-dark-secondaryBg">
                    {error && <p className="text-red-500">Error loading search results</p>}
                    {results.length > 0 ? (
                        results.map(result => (
                            <a
                                key={result.id}
                                href={`/home/${result.id}/post`}
                                className="block px-4 py-2 text-light-text dark:text-dark-text hover:bg-light-secondaryBg dark:hover:bg-dark-secondaryBg rounded"
                            >
                                <div className="font-bold">{result.postTitle}</div>
                                {result.excerpt && <div className="text-sm text-gray-500">{result.excerpt}</div>}
                            </a>
                        ))
                    ) : (
                        currentSearchTerm && <p className="text-light-text dark:text-dark-text">No results found</p>
                    )}
                </div>
            )}
        </div>
    );
}
