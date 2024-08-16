'use client';

import useSWR from 'swr';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/app/lib/firebase/config';
import { useAuth } from '@/app/lib/firebase/auth/authcontext';

type AnalyticsData = {
    postId: string;
    views: number;
    likes: number;
    comments: number;
    bookmarks: number;
};

const fetchAnalytics = async (userId: string): Promise<AnalyticsData[]> => {
    const analyticsRef = collection(db, 'analytics');
    const analyticsQuery = query(
        analyticsRef,
        where('userId', '==', userId)
    );

    const querySnapshot = await getDocs(analyticsQuery);
    return querySnapshot.docs.map(doc => ({
        postId: doc.id,
        ...doc.data(),
    } as AnalyticsData));
};

export const useAnalytics = () => {
    const { user } = useAuth();

    const { data: analytics = [], error } = useSWR(
        user ? ['analytics', user.uid] : null,
        () => fetchAnalytics(user!.uid),
    );

    return { analytics, loading: !error && !analytics.length, error };
};
