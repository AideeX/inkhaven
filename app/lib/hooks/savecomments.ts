
import { doc, setDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/app/lib/firebase/config';
import { useAuth } from '@/app/lib/firebase/auth/authcontext';

type CommentData = {
    content: string;
    postId: string;
    authorId: string;
    authorName: string;
    parentCommentId?: string;
};

export const useSaveComment = () => {
    const { user } = useAuth();

    const saveComment = async (data: CommentData) => {
        if (!user) throw new Error("User not authenticated");

        const commentId = doc(collection(db, 'comments')).id; 
        const commentRef = doc(db, 'comments', commentId);

        await setDoc(commentRef, {
            ...data,
            createdAt: serverTimestamp(),
        });

        return commentId;
    };

    return { saveComment };
};