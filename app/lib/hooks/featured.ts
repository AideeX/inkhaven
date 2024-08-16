'use client';

import useSWR from 'swr';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/app/lib/firebase/config';

type Post = {
    id: string;
    title: string;
    coverImageUrl?: string;
    createdAt: Date;
};

const fetchFeaturedPosts = async (): Promise<Post[]> => {
    const postsRef = collection(db, 'posts');
    const featuredQuery = query(
        postsRef,
        where('isFeatured', '==', true),
        orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(featuredQuery);
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
    } as Post));
};

export const useFeaturedPosts = () => {
    const { data: posts = [], error } = useSWR('featuredPosts', fetchFeaturedPosts);

    return { posts, loading: !error && !posts.length, error };
};
