'use client';

import { useState } from 'react';
import { submitComment } from '@/app/lib/utils/commentactions';
import { useAuth } from '@/app/lib/firebase/auth/authcontext'; 

type CommentFormProps = {
  postId: string;
  parentCommentId?: string | null;
  onCommentAdded: () => void;
};

function CommentForm({ postId, parentCommentId = null, onCommentAdded }: CommentFormProps) {
  const { user } = useAuth(); 
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in to submit a comment.');
      return;
    }

    if (content.trim() === '') {
      setError('Comment cannot be empty');
      return;
    }

    try {
      await submitComment({
        content,
        postId,
        authorId: user.uid,
        authorName: user.displayName || 'Anonymous',
        parentCommentId, 
      });
      setContent(''); 
      onCommentAdded(); 
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-light-primary dark:bg-dark-primary p-4 rounded-lg shadow">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={parentCommentId ? "Write a reply..." : "Write a comment..."} 
        disabled={!user} 
        className="w-full p-2 bg-light-secondaryBg dark:bg-dark-secondaryBg text-light-text dark:text-dark-text rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-light-accentMedium dark:focus:ring-dark-accentMedium"
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <button
        type="submit"
        disabled={!user}
        className="mt-4 w-full bg-light-buttonDefault dark:bg-dark-buttonDefault text-white py-2 px-4 rounded-lg shadow hover:bg-light-buttonHover dark:hover:bg-dark-buttonHover"
      >
        {parentCommentId ? "Reply" : "Submit Comment"}
      </button>
      {!user && <p className="text-center text-light-secondaryText dark:text-dark-secondaryText mt-2">Please log in to leave a comment.</p>}
    </form>
  );
}

export default CommentForm;
