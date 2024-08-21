'use client';

import useSWR from 'swr';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/app/lib/firebase/config';
import { useAuth } from '@/app/lib/firebase/auth/authcontext';

type AnalyticsData = {
    postId: string;
    postTitle: string;
    views: number;
    likes: number;
    comments: number;
    bookmarks: number;
    shares: number;
};

const fetchAnalytics = async (userId: string): Promise<AnalyticsData[]> => {
    const postsRef = collection(db, 'posts');
    const postsQuery = query(
        postsRef,
        where('authorId', '==', userId)
    );

    const postsSnapshot = await getDocs(postsQuery);
    const postIds = postsSnapshot.docs.map(doc => doc.id);

    if (postIds.length === 0) {
        return [];
    }

    const analyticsRef = collection(db, 'analytics');
    const analyticsQuery = query(
        analyticsRef,
        where('postId', 'in', postIds)
    );

    const querySnapshot = await getDocs(analyticsQuery);

    return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            postId: doc.id,
            postTitle: data.postTitle || 'Untitled Post', 
            views: data.views || 0,
            likes: data.likes || 0,
            comments: data.comments || 0,
            bookmarks: data.bookmarks || 0,
            shares: data.shares || 0,
        } as AnalyticsData;
    });
};

export const useAnalytics = () => {
    const { user } = useAuth();

    const { data: analytics, error, isLoading } = useSWR(
        user ? ['analytics', user.uid] : null,
        () => fetchAnalytics(user!.uid),
        { suspense: false }
    );

    return { analytics: analytics || [], loading: isLoading, error };
};
