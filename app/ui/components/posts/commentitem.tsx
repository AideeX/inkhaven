'use client';

import { useState, useEffect } from 'react';
import { 
  subscribeToReplies, 
  likeComment, 
  unlikeComment, 
  updateComment, 
  deleteComment 
} from '@/app/lib/utils/commentactions'; 
import { triggerNotification } from '@/app/lib/utils/notificationactions'; 
import { FaRegHeart, FaReply, FaTrash } from "react-icons/fa6";
import { FaHistory, FaEdit } from 'react-icons/fa';
import { HeartIcon } from '@heroicons/react/24/solid';
import CommentForm from './commentform';
import { useAuth } from '@/app/lib/firebase/auth/authcontext'; 

function CommentItem({ comment }: { comment: any }) {
  const { user } = useAuth(); 
  const [replies, setReplies] = useState<any[]>([]);
  const [likes, setLikes] = useState<number>(comment.likes || 0);
  const [liked, setLiked] = useState<boolean>(comment.likedBy?.includes(user?.uid));
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    if (comment.id) {
      const unsubscribe = subscribeToReplies(comment.id, setReplies);
      return () => unsubscribe();
    }
  }, [comment.id]);

  const handleLikeToggle = async () => {
    if (!user) return;

    if (liked) {
      await unlikeComment(comment.id, user.uid);
      setLikes((prevLikes) => prevLikes - 1);
    } else {
      await likeComment(comment.id, user.uid, comment.authorId, comment.postId); 
      setLikes((prevLikes) => prevLikes + 1);

      
      if (user?.uid !== comment.authorId) { 
        await triggerNotification({
          type: 'like',
          sourceUserId: user.uid,
          targetProfileId: comment.authorId,
          targetPostId: comment.postId,
          message: `${user.displayName || 'Someone'} liked your comment.`
        });
      }
    }
    setLiked(!liked);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleEditSubmit = async () => {
    if (!editContent.trim()) return;
    try {
      await updateComment(comment.id, editContent);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update comment:', err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await deleteComment(comment.id);
      } catch (err) {
        console.error('Failed to delete comment:', err);
      }
    }
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <li className="bg-light-primary dark:bg-dark-primary p-4 rounded-lg shadow mb-4">
      <div className="flex justify-between items-center">
        <p className="text-light-heading dark:text-dark-heading font-semibold">{comment.authorName}</p>
        {user?.uid === comment.authorId && (
          <div className="flex space-x-2">
            <button onClick={handleEditToggle}>
              <FaEdit className="h-5 w-5 text-light-secondaryText dark:text-dark-secondaryText" />
            </button>
            <button onClick={handleDelete}>
              <FaTrash className="h-5 w-5 text-light-secondaryText dark:text-dark-secondaryText" />
            </button>
            <button onClick={toggleHistory}>
              <FaHistory className="h-5 w-5 text-light-secondaryText dark:text-dark-secondaryText" />
            </button>
          </div>
        )}
      </div>
      {isEditing ? (
        <div>
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full mt-2 p-2 bg-light-secondaryBg dark:bg-dark-secondaryBg text-light-text dark:text-dark-text rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-light-accentMedium dark:focus:ring-dark-accentMedium"
          />
          <div className="flex justify-end space-x-2 mt-2">
            <button
              onClick={handleEditSubmit}
              className="bg-light-buttonDefault dark:bg-dark-buttonDefault text-white py-1 px-3 rounded-lg shadow hover:bg-light-buttonHover dark:hover:bg-dark-buttonHover"
            >
              Save
            </button>
            <button
              onClick={handleEditToggle}
              className="bg-gray-200 dark:bg-gray-700 text-light-text dark:text-dark-text py-1 px-3 rounded-lg shadow"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-2 text-light-text dark:text-dark-text">{comment.content}</p>
      )}
      {showHistory && comment.editHistory?.length > 0 && (
        <div className="mt-2">
          <p className="font-semibold">Edit History:</p>
          <ul className="ml-4 list-disc text-sm">
            {comment.editHistory.map((historyItem: any, index: number) => (
              <li key={index} className="text-light-secondaryText dark:text-dark-secondaryText">
                <p>{historyItem.content}</p>
                <p className="text-xs text-gray-500">
                  Edited at: {new Date(historyItem.editedAt.seconds * 1000).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex items-center space-x-4 mt-4">
        <button onClick={handleLikeToggle} className="flex items-center space-x-2">
          {liked ? <HeartIcon className="h-6 w-6 text-red-500" /> : <FaRegHeart className="h-6 w-6 text-light-secondaryText dark:text-dark-secondaryText" />}
          <span className="text-light-text dark:text-dark-text">{likes}</span>
        </button>
        <button onClick={() => setShowReplyForm(!showReplyForm)} className="flex items-center space-x-2">
          <FaReply className="h-6 w-6 text-light-secondaryText dark:text-dark-secondaryText" />
          <span className="text-light-text dark:text-dark-text">Reply</span>
        </button>
      </div>
      
      {showReplyForm && (
        <div className="mt-4">
          <CommentForm 
            postId={comment.postId} 
            parentCommentId={comment.id} 
            onCommentAdded={async () => {
              setShowReplyForm(false);
              if (user?.uid !== comment.authorId) {
                await triggerNotification({
                  type: 'reply',
                  sourceUserId: user?.uid || '',
                  targetProfileId: comment.authorId,
                  targetPostId: comment.postId,
                  message: `${user?.displayName || 'Someone'} replied to your comment.`
                });
              }
            }} 
          />
        </div>
      )}

      {replies.length > 0 && (
        <ul className="ml-8 mt-4 space-y-4">
          {replies.map(reply => (
            <CommentItem key={reply.id} comment={reply} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default CommentItem;
