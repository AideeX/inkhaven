'use client';

import useSWR from 'swr';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/app/lib/firebase/config';
import { useAuth } from '@/app/lib/firebase/auth/authcontext';

const fetchUserPosts = async (userId: string) => {
  const postsRef = collection(db, 'posts');
  const postsQuery = query(postsRef, where('authorId', '==', userId));
  const querySnapshot = await getDocs(postsQuery);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const useUserPosts = () => {
  const { user } = useAuth();

  const { data: posts = [], error } = useSWR(
    user ? ['userPosts', user.uid] : null,
    () => fetchUserPosts(user!.uid)
  );

  return { posts, loading: !error && !posts.length, error };
};
