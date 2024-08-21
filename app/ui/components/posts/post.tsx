'use client';

import { useParams, useRouter } from 'next/navigation'; 
import { useEffect, useState } from 'react';
import { usePosts } from '@/app/lib/hooks/posts';
import Image from 'next/image';
import { literata } from '../../styles/fonts';
import { marked } from 'marked';
import { SinglePostSkeleton } from '../../skeletons';
import { FaRegHeart } from 'react-icons/fa6';
import { HeartIcon } from '@heroicons/react/24/solid';
import { ShareIcon } from '@heroicons/react/24/outline';
import { db } from '@/app/lib/firebase/config'; 
import { doc, updateDoc, increment, arrayUnion, arrayRemove, deleteDoc } from 'firebase/firestore'; 
import { useAuth } from '@/app/lib/firebase/auth/authcontext';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

interface Post {
    id: string;
    title: string;
    coverImageUrl?: string; 
    content: string;
    likes?: number;
    likedBy?: string[];
    authorId?: string; 
}

const PostPage = () => {
    const { id } = useParams(); 
    const router = useRouter();
    const { posts, loading, error } = usePosts();
    const { user } = useAuth();
    
    const [post, setPost] = useState<Post | null>(null);
    const [likes, setLikes] = useState<number>(0);
    const [liked, setLiked] = useState<boolean>(false);

    useEffect(() => {
        if (id && posts.length > 0) {
            const foundPost = posts.find((p) => p.id === id);
            setPost(foundPost || null); 

            if (foundPost) {
                setLikes(foundPost.likes || 0);
                setLiked(foundPost.likedBy?.includes(user?.uid) || false);
            }
        }
    }, [id, posts, user]);

    const handleLikeToggle = async () => {
        if (!user || !post) return;

        const postRef = doc(db, 'posts', post.id);

        if (liked) {
            await updateDoc(postRef, {
                likes: increment(-1),
                likedBy: arrayRemove(user.uid),
            });
            setLikes((prevLikes) => prevLikes - 1);
        } else {
            await updateDoc(postRef, {
                likes: increment(1),
                likedBy: arrayUnion(user.uid),
            });
            setLikes((prevLikes) => prevLikes + 1);
        }

        setLiked(!liked);
    };

    const handleShare = async () => {
        const shareUrl = `${window.location.origin}/home/${post?.id}/post`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: post?.title,
                    url: shareUrl,
                });
                const analyticsDocRef = doc(db, "analytics", post?.id!);
                await updateDoc(analyticsDocRef, {
                    shares: increment(1), 
                });
            } catch (error) {
                console.error("Error sharing the post:", error);
            }
        } else {
            console.error("Web Share API is not supported in this browser.");
        }
    };

    const handleEdit = () => {
        router.push(`/home/${post?.id}/edit`);
    };

    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this post?")) {
            try {
                await deleteDoc(doc(db, "posts", post?.id!));
                alert("Post deleted successfully.");
                router.push('/home');
            } catch (error) {
                console.error("Error deleting post:", error);
                alert("Failed to delete post.");
            }
        }
    };

    if (loading) return <SinglePostSkeleton />;
    if (error) return <p>Error loading post: {error.message}</p>;
    if (!post) return <p>Post not found</p>;

    const contentHtml = marked(post.content);

    return (
        <div className="bg-light-secondaryBg dark:bg-dark-secondaryBg p-4 sm:p-6 md:p-8 min-h-screen w-full sm:w-11/12 md:w-2/3 lg:w-3/4 mx-auto rounded-xl shadow-md">
            {post.coverImageUrl && (
                <Image
                    src={post.coverImageUrl}
                    width={200}
                    height={200}
                    alt="Cover Image"
                    className="mx-auto mb-4 sm:mb-6 md:mb-8 rounded-lg shadow-lg"
                />
            )}
            <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-center ${literata.className} text-light-heading dark:text-dark-heading`}>
                {post.title}
            </h1>
            <div className="text-light-text dark:text-dark-text leading-relaxed text-justify text-sm sm:text-base md:text-lg">
                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </div>
            <div className="flex justify-between items-center mt-8">
                <button 
                    onClick={handleLikeToggle} 
                    className="flex items-center text-light-linkDefault dark:text-dark-linkDefault hover:text-light-linkHover dark:hover:text-dark-linkHover"
                >
                    {liked ? <HeartIcon className="h-6 w-6 text-red-500" /> : <FaRegHeart className="h-6 w-6 mr-2" />}
                    <span>{likes}</span>
                </button>
                <button 
                    onClick={handleShare} 
                    className="flex items-center text-light-linkDefault dark:text-dark-linkDefault hover:text-light-linkHover dark:hover:text-dark-linkHover"
                >
                    <ShareIcon className="h-6 w-6 mr-2" />
                    Share
                </button>
                {user?.uid === post.authorId && (
                    <div className="flex space-x-4">
                        <button 
                            onClick={handleEdit} 
                            className="flex items-center text-light-linkDefault dark:text-dark-linkDefault hover:text-light-linkHover dark:hover:text-dark-linkHover"
                        >
                            <FaEdit className="h-5 w-5 mr-2" />
                            Edit
                        </button>
                        <button 
                            onClick={handleDelete} 
                            className="flex items-center text-red-500 hover:text-red-700"
                        >
                            <FaTrashAlt className="h-5 w-5 mr-2" />
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostPage;
