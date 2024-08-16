'use client';

import { useState } from 'react';
import { useComments } from '@/app/lib/hooks/comments';
import { useSaveComment } from '@/app/lib/hooks/savecomments';
import { useAuth } from '@/app/lib/firebase/auth/authcontext';

type Comment = {
    id: string;
    authorName: string;
    createdAt: Date;
    content: string;
    replies?: Comment[];
};

type CommentData = {
    id: string;
    authorName: string;
    createdAt: number;
    content: string;
    replies?: CommentData[];
    parentCommentId?: string;
};

type CommentsProps = {
    postId: string;
};

const CommentItem: React.FC<{ comment: Comment, postId: string }> = ({ comment, postId }) => {
    const { user } = useAuth();
    const { saveComment } = useSaveComment();
    const [showReplyBox, setShowReplyBox] = useState(false);
    const [replyContent, setReplyContent] = useState('');

    const handleReply = async () => {
        if (replyContent.trim() === '' || !user) return;

        try {
            await saveComment({
                content: replyContent,
                postId,
                authorId: user.uid,
                authorName: user.displayName || 'Anonymous',
                parentCommentId: comment.id, 
            });
            setReplyContent('');
            setShowReplyBox(false); 
        } catch (error) {
            console.error('Error saving reply:', error);
        }
    };

    return (
        <div className="mb-4">
            <p className="text-sm text-light-secondaryText dark:text-dark-secondaryText">
                {comment.authorName} on {new Date(comment.createdAt).toLocaleDateString()}
            </p>
            <p className="text-light-text dark:text-dark-text">{comment.content}</p>

            <button
                onClick={() => setShowReplyBox(!showReplyBox)}
                className="text-light-accentMedium dark:text-dark-accentMedium text-sm"
            >
                Reply
            </button>

            {showReplyBox && (
                <div className="mt-2">
                    <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Write a reply..."
                        className="w-full p-2 border rounded mb-2 dark:bg-dark-secondaryBg dark:text-dark-text"
                    />
                    <button
                        onClick={handleReply}
                        className="px-4 py-2 bg-light-buttonDefault dark:bg-dark-buttonDefault text-white rounded"
                    >
                        Add Reply
                    </button>
                </div>
            )}

            {comment.replies && comment.replies.length > 0 && (
                <div className="ml-4 mt-4">
                    {comment.replies.map((reply) => (
                        <CommentItem key={reply.id} comment={reply} postId={postId} />
                    ))}
                </div>
            )}
        </div>
    );
};

const Comments: React.FC<CommentsProps> = ({ postId }) => {
    const { user } = useAuth();
    const { comments, loading, error } = useComments(postId);
    const { saveComment } = useSaveComment();
    const [newComment, setNewComment] = useState('');

    console.log('User:', user);
    console.log('Comments:', comments);
    console.log('Loading:', loading);
    console.log('Error:', error);

    const handleAddComment = async () => {
        if (newComment.trim() === '' || !user) return;

        try {
            await saveComment({
                content: newComment,
                postId,
                authorId: user.uid,
                authorName: user.displayName || 'Anonymous',
            });
            setNewComment(''); 
        } catch (error) {
            console.error('Error saving comment:', error);
        }
    };

    if (loading) return <p>Loading comments...</p>;
    if (error) return <p>Error loading comments: {error.message}</p>;

    return (
        <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Comments</h3>
            {comments.length === 0 ? (
                <p>No comments yet. Be the first to comment!</p>
            ) : (
                <ul className="space-y-4">
                    {comments.map((comment) => (
                        <CommentItem key={comment.id} comment={comment} postId={postId} />
                    ))}
                </ul>
            )}

            {user ? (
                <div className="mt-4">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                        className="w-full p-2 border rounded mb-2 dark:bg-dark-secondaryBg dark:text-dark-text"
                    />
                    <button
                        onClick={handleAddComment}
                        className="px-4 py-2 bg-light-buttonDefault dark:bg-dark-buttonDefault text-white rounded"
                    >
                        Add Comment
                    </button>
                </div>
            ) : (
                <p className="text-sm text-light-secondaryText dark:text-dark-secondaryText">
                    Please sign in to write a comment.
                </p>
            )}
        </div>
    );
};

export default Comments;