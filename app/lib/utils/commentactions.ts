import { collection, query, where, orderBy, doc, updateDoc, increment, setDoc, serverTimestamp, onSnapshot, getDocs, limit, startAfter, arrayUnion, arrayRemove, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '@/app/lib/firebase/config';
import { triggerNotification } from '@/app/lib/utils/notificationactions';

export function subscribeToTopLevelComments(postId: string, onCommentsUpdate: (comments: any[]) => void) {
  const commentsRef = collection(db, 'comments');

  const commentsQuery = query(
    commentsRef,
    where('postId', '==', postId),
    where('parentCommentId', '==', null), 
    orderBy('createdAt', 'asc')
  );

  const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
    const comments = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
    }));
    onCommentsUpdate(comments);
  });

  return unsubscribe; 
}

export function subscribeToReplies(parentCommentId: string, onRepliesUpdate: (replies: any[]) => void) {
  const commentsRef = collection(db, 'comments');

  const repliesQuery = query(
    commentsRef,
    where('parentCommentId', '==', parentCommentId), 
    orderBy('createdAt', 'asc')
  );

  const unsubscribe = onSnapshot(repliesQuery, (snapshot) => {
    const replies = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
    }));
    onRepliesUpdate(replies);
  });

  return unsubscribe; 
}

export async function fetchPaginatedTopLevelComments(postId: string, pageSize: number, lastDoc: any = null) {
  const commentsRef = collection(db, 'comments');

  let commentsQuery = query(
    commentsRef,
    where('postId', '==', postId),
    where('parentCommentId', '==', null), 
    orderBy('createdAt', 'asc'),
    limit(pageSize) 
  );

  if (lastDoc) {
    commentsQuery = query(commentsQuery, startAfter(lastDoc)); 
  }

  const querySnapshot = await getDocs(commentsQuery);
  const comments = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt.toDate(),
  }));

  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]; 

  return { comments, lastDoc: lastVisible }; 
}


export async function likeComment(commentId: string, userId: string, authorId: string, postId: string) {
  const commentRef = doc(db, 'comments', commentId);

  await updateDoc(commentRef, {
    likedBy: arrayUnion(userId), 
    likes: increment(1) 
  });

  if (userId !== authorId) { 
    await triggerNotification({
      type: 'like',
      sourceUserId: userId,
      targetProfileId: authorId,
      targetPostId: postId,
      message: 'Someone liked your comment.',
    });
  }
}


export async function unlikeComment(commentId: string, userId: string) {
  const commentRef = doc(db, 'comments', commentId);

  await updateDoc(commentRef, {
    likedBy: arrayRemove(userId), 
    likes: increment(-1) 
  });
}


export async function submitComment({
  content,
  postId,
  authorId,
  authorName,
  parentCommentId = null, 
  parentAuthorId = null, 
}: {
  content: string;
  postId: string;
  authorId: string;
  authorName: string;
  parentCommentId?: string | null; 
  parentAuthorId?: string | null; 
}) {
  const commentRef = doc(collection(db, 'comments'));
  
  await setDoc(commentRef, {
    content,
    postId,
    authorId,
    authorName,
    parentCommentId, 
    createdAt: serverTimestamp(),
    likes: 0, 
    likedBy: [],
    editHistory: [] 
  });

  if (parentAuthorId && parentAuthorId !== authorId) {
    await triggerNotification({
      type: 'reply',
      sourceUserId: authorId,
      targetProfileId: parentAuthorId,
      targetPostId: postId,
      message: 'Someone replied to your comment.',
    });
  }
}


export async function updateComment(commentId: string, newContent: string) {
  const commentRef = doc(db, 'comments', commentId);

  const commentDoc = await getDoc(commentRef);
  const currentData = commentDoc.data();

  if (currentData) {
    await updateDoc(commentRef, {
      content: newContent,
      editHistory: arrayUnion({
        content: currentData.content,
        editedAt: serverTimestamp(),
      }),
    });
  }
}


export async function deleteComment(commentId: string) {
  const commentRef = doc(db, 'comments', commentId);
  await deleteDoc(commentRef);
}
