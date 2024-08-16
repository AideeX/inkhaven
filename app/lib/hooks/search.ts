'use client';   

import useSWR from 'swr';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/app/lib/firebase/config';

type SearchResult = {
    id: string;
    title: string;
    excerpt?: string;
    coverImageUrl?: string;
};

const fetcher = async (searchTerm: string): Promise<SearchResult[]> => {
    if (!searchTerm) return [];

    const q = query(
        collection(db, 'posts'),
        where('keywords', 'array-contains', searchTerm.toLowerCase())
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title,
        excerpt: doc.data().excerpt,
        coverImageUrl: doc.data().coverImageUrl,
    }));
};

export const useSearch = (searchTerm: string) => {
    return useSWR<SearchResult[]>(searchTerm ? ['search', searchTerm] : null, () => fetcher(searchTerm));
};
