import useSWR from 'swr';
import { collection, query, where, getDocs } from 'firebase/firestore';
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
    status: 'draft' | 'published';
};

const fetchDrafts = async (authorId: string): Promise<Post[]> => {
    const draftsQuery = query(
        collection(db, 'posts'),
        where('authorId', '==', authorId),
        where('status', '==', 'draft')
    );

    const querySnapshot = await getDocs(draftsQuery);
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
    } as Post));
};

export const useDrafts = (authorId: string) => {
    const { data: drafts = [], error } = useSWR(['drafts', authorId], () => fetchDrafts(authorId));
    return { drafts, loading: !error && !drafts.length, error };
};
