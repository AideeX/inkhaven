import useSWR from 'swr';
import { collection, getDocs, query, orderBy, limit, startAfter, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '@/app/lib/firebase/config';

type User = {
    id: string;
    displayName: string;
    photoURL?: string;
    email: string;
};

const PAGE_SIZE = 20;

export const fetchUsers = async (startAfterDoc?: QueryDocumentSnapshot<DocumentData>) => {
    let q = query(
        collection(db, 'users'),
        orderBy('displayName'),
        limit(PAGE_SIZE)
    );

    if (startAfterDoc) {
        q = query(q, startAfter(startAfterDoc));
    }

    const querySnapshot = await getDocs(q);
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    const users = querySnapshot.docs.map(doc => ({
        id: doc.id,
        displayName: doc.data().displayName || '',
        photoURL: doc.data().photoURL || '',
        email: doc.data().email || '',
    }));

    return { users, lastVisible };
};

export const useUsers = () => {
    const { data, error, mutate } = useSWR('communityUsers', () => fetchUsers());

    const loadMore = async (lastVisible: QueryDocumentSnapshot<DocumentData>) => {
        const { users: newUsers, lastVisible: newLastVisible } = await fetchUsers(lastVisible);
        mutate((currentData) => ({
            users: [...(currentData?.users ?? []), ...newUsers],
            lastVisible: newLastVisible,
        }), false);
    };

    return {
        users: data?.users || [],
        lastVisible: data?.lastVisible || null,
        loading: !data && !error,
        error,
        loadMore,
    };
};
