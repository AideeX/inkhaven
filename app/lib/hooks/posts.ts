'use client';

import useSWR from 'swr';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/app/lib/firebase/config';

type Post = {
    id: string;
    title: string;
    content: string;
    coverImageUrl?: string;
    authorId: string;
    createdAt: Date;
    tags: string[];
    likes: number;
    views: number;
    comments: number;
};

const fetchPosts = async (authorId?: string): Promise<Post[]> => {
    const postsRef = collection(db, 'posts');
    let postsQuery;

    if (authorId) {
        postsQuery = query(
            postsRef,
            where('authorId', '==', authorId),
            where('status', '==', 'published'),  
            orderBy('createdAt', 'desc')
        );
    } else {
        postsQuery = query(postsRef, orderBy('createdAt', 'desc'));
    }

    const querySnapshot = await getDocs(postsQuery);
    return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            title: data.postTitle, 
            content: data.content,
            coverImageUrl: data.coverImageUrl,
            authorId: data.authorId,
            createdAt: data.createdAt.toDate(),
            tags: data.tags,
            likes: data.likes,
            views: data.views,
            comments: data.comments,
        } as Post;
    });
};

export const usePosts = (authorId?: string) => {
    const { data: posts = [], error } = useSWR(['posts', authorId], () => fetchPosts(authorId));

    return { posts, loading: !error && !posts.length, error };
};