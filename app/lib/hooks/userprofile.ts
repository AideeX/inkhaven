'use client';

import useSWR from 'swr';
import { doc, getDoc, updateDoc, onSnapshot, setDoc, deleteDoc,  increment } from 'firebase/firestore';
import { useEffect } from 'react';
import { db } from '@/app/lib/firebase/config';

type UserProfile = {
    uid: string;  
    displayName: string;
    username?: string;
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
    displayChoice?: {
        useDisplayName: boolean;
        useUsername: boolean;
    };
};

const fetchUserProfile = async (userId: string): Promise<UserProfile> => {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
        const data = userDoc.data();
        return {
            uid: userId, 
            displayName: data.displayName || '',
            username: data.username || '',
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
            displayChoice: data.displayChoice || {
                useDisplayName: true,
                useUsername: false,
            },
        };
    } else {
        throw new Error('User profile not found');
    }
};

export const useUserProfile = (userId: string) => {
    const { data: profile, error, mutate } = useSWR(userId ? `profile-${userId}` : null, () => fetchUserProfile(userId), {
        revalidateOnFocus: false, 
    });

    useEffect(() => {
        if (!userId) return;

        const userDocRef = doc(db, 'users', userId);

        const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.data();
                const updatedProfile: UserProfile = {
                    uid: userId, 
                    displayName: data.displayName || '',
                    username: data.username || '',
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
                    displayChoice: data.displayChoice || {
                        useDisplayName: true,
                        useUsername: false,
                    },
                };

                mutate(updatedProfile, false); 
            }
        });

        return () => unsubscribe(); 
    }, [userId, mutate]);

    const updateProfile = async (updatedData: Partial<UserProfile>) => {
        if (!userId) throw new Error('User ID is required to update the profile');
        const userDocRef = doc(db, 'users', userId);

        try {
            await updateDoc(userDocRef, {
                ...updatedData,
                updatedAt: new Date(),
            });
            await mutate(); 
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
    };

    return { profile, loading: !error && !profile, error, updateProfile };
};

export const checkIfFollowing = async (currentUserId: string, targetUserId: string) => {
    try {
        const followDoc = await getDoc(doc(db, 'follows', `${currentUserId}_${targetUserId}`));
        return followDoc.exists();
    } catch (error) {
        console.error('Error checking follow status:', error);
        return false;
    }
};


export const followUser = async (currentUserId: string, targetUserId: string, currentUserName: string) => {
    try {

        await setDoc(doc(db, 'follows', `${currentUserId}_${targetUserId}`), {
            followerId: currentUserId,
            followerName: currentUserName, 
            followingId: targetUserId,
            createdAt: new Date(),
        });

        await updateDoc(doc(db, 'users', targetUserId), { followers: increment(1) });
        await updateDoc(doc(db, 'users', currentUserId), { follows: increment(1) });
    } catch (error) {
        console.error('Error following user:', error);
        throw error;
    }
};


export const unfollowUser = async (currentUserId: string, targetUserId: string) => {
    try {
        await deleteDoc(doc(db, 'follows', `${currentUserId}_${targetUserId}`));

 
        await updateDoc(doc(db, 'users', targetUserId), { followers: increment(-1) });
        await updateDoc(doc(db, 'users', currentUserId), { follows: increment(-1) });
    } catch (error) {
        console.error('Error unfollowing user:', error);
        throw error;
    }
};
