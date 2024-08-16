'use client'

import useSWR from 'swr';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/app/lib/firebase/config';
import { useAuth } from '@/app/lib/firebase/auth/authcontext';


type Notification = {
    id: string;
    type: 'follow' | 'like' | 'comment';
    sourceUserId: string;
    targetProfileId: string;
    targetPostId?: string;
    message: string;
    createdAt: Date;
};

const fetchNotifications = async (userId: string): Promise<Notification[]> => {
    const notificationsRef = collection(db, 'notifications');
    const notificationsQuery = query(
        notificationsRef,
        where('targetProfileId', '==', userId),
        orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(notificationsQuery);
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(), 
    } as Notification));
};

export const useNotifications = () => {
    const { user } = useAuth();

    const { data: notifications = [], error } = useSWR(
        user ? ['notifications', user.uid] : null,
        () => fetchNotifications(user!.uid),
    );

    return { notifications, loading: !error && !notifications.length, error };
};
