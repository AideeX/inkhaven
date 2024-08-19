'use client';

import useSWR from 'swr';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/app/lib/firebase/config';

type Comment = {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  authorName: string;
  createdAt: Date;
  replies?: Comment[];
};

const fetchComments = async (postId: string): Promise<Comment[]> => {
  const commentsRef = collection(db, 'comments');
  const commentsQuery = query(
    commentsRef,
    where('postId', '==', postId),
    where('parentCommentId', '==', null), 
    orderBy('createdAt', 'asc')
  );

  const querySnapshot = await getDocs(commentsQuery);

  const comments = await Promise.all(querySnapshot.docs.map(async (doc) => {
    const commentData = doc.data();
    const repliesQuery = query(
      commentsRef,
      where('parentCommentId', '==', doc.id),
      orderBy('createdAt', 'asc')
    );
    const repliesSnapshot = await getDocs(repliesQuery);

    const replies = repliesSnapshot.docs.map((replyDoc) => ({
      id: replyDoc.id,
      ...replyDoc.data(),
      createdAt: replyDoc.data().createdAt.toDate(),
    } as Comment));

    return {
      id: doc.id,
      ...commentData,
      createdAt: commentData.createdAt?.toDate(),
      replies,
    } as Comment;
  }));

  return comments;
};

export const useComments = (postId: string) => {
  const { data: comments = [], error, isValidating } = useSWR(
    postId ? ['comments', postId] : null, 
    () => fetchComments(postId),
    {
      revalidateOnFocus: true,
    }
  );

  return { comments, isLoading: isValidating, error };
}
