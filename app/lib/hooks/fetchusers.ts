'use client';

import useSWR from 'swr';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/app/lib/firebase/config';

type User = {
    id: string;
    displayName: string;
    photoURL?: string;
};

const fetchUsers = async (): Promise<User[]> => {
    const usersRef = collection(db, 'users');
    const querySnapshot = await getDocs(usersRef);
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    } as User));
};

export const useUsers = () => {
    const { data: users = [], error } = useSWR('communityUsers', fetchUsers);

    return { users, loading: !error && !users.length, error };
};
