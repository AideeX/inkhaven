'use client';

import useSWR from 'swr';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/app/lib/firebase/config';
import { useSearchParams } from 'next/navigation';

type SearchResult = {
    id: string;
    postTitle: string;
    authorName: string;
    content: string;
    excerpt?: string;
    coverImageUrl?: string;
};

const fetcher = async (searchTerm: string): Promise<SearchResult[]> => {
    if (!searchTerm) return [];

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    const queries = [
        query(
            collection(db, 'posts'),
            where('keywords', 'array-contains', lowerCaseSearchTerm)
        ),
        query(
            collection(db, 'posts'),
            where('authorName', '>=', lowerCaseSearchTerm),
            where('authorName', '<=', lowerCaseSearchTerm + '\uf8ff')
        ),
        query(
            collection(db, 'posts'),
            where('postTitle', '>=', lowerCaseSearchTerm),
            where('postTitle', '<=', lowerCaseSearchTerm + '\uf8ff')
        ),
        query(
            collection(db, 'posts'),
            where('content', '>=', lowerCaseSearchTerm),
            where('content', '<=', lowerCaseSearchTerm + '\uf8ff')
        )
    ];

    const results: SearchResult[] = [];
    
    for (const q of queries) {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
            const data = doc.data();
        
            if (
                data.authorName.toLowerCase().includes(lowerCaseSearchTerm) ||
                data.postTitle.toLowerCase().includes(lowerCaseSearchTerm) ||
                data.content.toLowerCase().includes(lowerCaseSearchTerm)
            ) {
                results.push({
                    id: doc.id,
                    postTitle: data.postTitle,
                    authorName: data.authorName,
                    content: data.content,
                    excerpt: data.excerpt,
                    coverImageUrl: data.coverImageUrl,
                });
            }
        });
    }

    const uniqueResults = Array.from(new Set(results.map(result => result.id)))
        .map(id => results.find(result => result.id === id)!);

    console.log("Final results:", uniqueResults);

    return uniqueResults;
};


export const useSearch = (searchTerm: string) => {
    const searchParams = useSearchParams();
    const queryTerm = searchParams.get('q') || '';
    return useSWR<SearchResult[]>(queryTerm ? ['search', queryTerm] : null, () => fetcher(queryTerm));
};
