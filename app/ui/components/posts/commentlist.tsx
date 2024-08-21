'use client';

import { useEffect, useState } from 'react';
import { subscribeToTopLevelComments, fetchPaginatedTopLevelComments } from '@/app/lib/utils/commentactions';
import CommentItem from './commentitem';
import CommentForm from './commentform';
import { useAuth } from '@/app/lib/firebase/auth/authcontext'; 
import { CommentListSkeleton } from '../../skeletons';

function CommentList({ postId }: { postId: string }) {
  const { user } = useAuth(); 
  const [comments, setComments] = useState<any[]>([]);
  const [lastDoc, setLastDoc] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const PAGE_SIZE = 8;

  useEffect(() => {
    const loadInitialComments = async () => {
      setLoading(true);
      try {
        const { comments: fetchedComments, lastDoc: newLastDoc } = await fetchPaginatedTopLevelComments(postId, PAGE_SIZE);
        setComments(fetchedComments);
        setLastDoc(newLastDoc);

        const unsubscribe = subscribeToTopLevelComments(postId, setComments);
        return () => unsubscribe();
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadInitialComments();
  }, [postId]);

  const loadMoreComments = async () => {
    setLoading(true);
    try {
      const { comments: fetchedComments, lastDoc: newLastDoc } = await fetchPaginatedTopLevelComments(postId, PAGE_SIZE, lastDoc);
      setComments((prevComments) => [...prevComments, ...fetchedComments]);
      setLastDoc(newLastDoc);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;


  return (
    <div className="bg-light-secondaryBg dark:bg-dark-secondaryBg p-4 mt-8 sm:p-6 md:p-8 w-full sm:w-11/12 md:w-2/3 lg:w-3/4 mx-auto rounded-xl shadow-md">
      {user ? (
        <CommentForm postId={postId} onCommentAdded={() => {
          setComments([]); 
          setLastDoc(null); 
          loadMoreComments(); 
        }} />
      ) : (
        <p className="text-center text-light-secondaryText dark:text-dark-secondaryText">Please log in to leave a comment.</p>
      )}
      <ul className="space-y-4 mt-4">
        {comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </ul>
      {loading && <CommentListSkeleton />}
      {!loading && lastDoc && (
        <button
          onClick={loadMoreComments}
          className="block mx-auto md:mt-8 sm:mt-6 bg-light-buttonDefault dark:bg-dark-buttonDefault text-white py-2 px-4 rounded-lg shadow hover:bg-light-buttonHover dark:hover:bg-dark-buttonHover"
        >
          Load More Comments
        </button>
      )}
    </div>
  );
}

export default CommentList;
