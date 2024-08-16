'use client';

import useSWR from 'swr';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/lib/firebase/config';

type UserProfile = {
    displayName: string;
    email: string;
    photoURL: string;
    bio: string;
    interests: string[];
    createdAt: Date;
    updatedAt?: Date | null;
    follows: number;
    followers: number;
    likes: number;
    comments: number;
};

const fetchUserProfile = async (userId: string): Promise<UserProfile> => {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
        const data = userDoc.data();
        return {
            displayName: data.displayName || '',
            email: data.email || '',
            photoURL: data.photoURL || '/default-profile.png',
            bio: data.bio || '',
            interests: data.interests || [],
            createdAt: data.createdAt.toDate(),
            updatedAt: data.updatedAt ? data.updatedAt.toDate() : null,
            follows: data.follows || 0,
            followers: data.followers || 0,
            likes: data.likes || 0,
            comments: data.comments || 0,
        };
    } else {
        throw new Error('User profile not found');
    }
};

export const useUserProfile = (userId: string) => {
    const { data: profile, error } = useSWR(userId ? `profile-${userId}` : null, () => fetchUserProfile(userId));

    return { profile, loading: !error && !profile, error };
};
