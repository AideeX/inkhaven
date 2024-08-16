
'use client';

import useSWR from 'swr';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/app/lib/firebase/config';

const fetchPostsByTab = async (tab: string, tags?: string[]) => {
  const postsRef = collection(db, 'posts');
  let postsQuery;

  if (tab === 'latest') {
    postsQuery = query(postsRef, where('status', '==', 'published'), orderBy('createdAt', 'desc'));
  } else if (tab === 'trending') {
    postsQuery = query(postsRef, where('status', '==', 'published'), orderBy('views', 'desc'));
  } else if (tab === 'relevant' && tags && tags.length > 0) {
    postsQuery = query(postsRef, where('status', '==', 'published'), where('tags', 'array-contains-any', tags));
  } else if (tab === 'featured') {
    postsQuery = query(postsRef, where('isFeatured', '==', true), where('status', '==', 'published'));
  } else {
    postsQuery = query(postsRef, where('status', '==', 'published'), orderBy('createdAt', 'desc'));
  }

  const querySnapshot = await getDocs(postsQuery);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const useAllPosts = (tab: string, tags?: string[]) => {
  const { data: posts = [], error } = useSWR([tab, tags], () => fetchPostsByTab(tab, tags));
  return { posts, error };
};