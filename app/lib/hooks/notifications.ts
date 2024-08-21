'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/app/lib/firebase/config';
import { useAuth } from '@/app/lib/firebase/auth/authcontext';

type Notification = {
    id: string;
    type: 'follow' | 'like' | 'comment' | 'reply';
    sourceUserId: string;
    targetProfileId: string;
    targetPostId?: string;
    message: string;
    createdAt: Date;
};

export const useNotifications = () => {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!user) return;

        const notificationsRef = collection(db, 'notifications');
        const notificationsQuery = query(
            notificationsRef,
            where('targetProfileId', '==', user.uid),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(notificationsQuery, (snapshot) => {
            const fetchedNotifications: Notification[] = snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    createdAt: data.createdAt.toDate(), 
                } as Notification;
            });

            setNotifications(fetchedNotifications);
            setLoading(false);
        }, (err) => {
            setError(err.message);
            setLoading(false);
        });

        return () => {
            unsubscribe();
            setLoading(false); 
        };
    }, [user]);

    return { notifications, loading, error };
};
