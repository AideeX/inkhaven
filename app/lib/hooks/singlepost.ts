'use client';

import useSWR from 'swr';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/lib/firebase/config';



const fetchPost = async (postId: string) => {
    const postDoc = await getDoc(doc(db, 'posts', postId));
    if (postDoc.exists()) {
        return postDoc.data();
    } else {
        throw new Error('Post not found');
    }
};

export const usePost = (postId: string) => {
    const { data, error } = useSWR(postId ? `post-${postId}` : null, () => fetchPost(postId));
    
    return {
        post: data,
        loading: !error && !data,
        error,
    };
};