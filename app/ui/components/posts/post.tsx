'use client';

import { useParams } from 'next/navigation'; 
import { useEffect, useState } from 'react';
import { usePosts } from '@/app/lib/hooks/posts';
import Image from 'next/image';
import { literata } from '../../styles/fonts';
import { marked } from 'marked';
import { SinglePostSkeleton } from '../../skeletons';
import { ShareIcon } from '@heroicons/react/24/outline';
import { db } from '@/app/lib/firebase/config'; 
import { doc, updateDoc, increment } from 'firebase/firestore'; 

interface Post {
    id: string;
    title: string;
    coverImageUrl?: string; 
    content: string;
}

const PostPage = () => {
    const { id } = useParams(); 
    const { posts, loading, error } = usePosts();
    
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        if (id && posts.length > 0) {
            const foundPost = posts.find((p) => p.id === id);
            setPost(foundPost || null); 
        }
    }, [id, posts]);

    if (loading) return <SinglePostSkeleton/>;
    if (error) return <p>Error loading post: {error.message}</p>;
    if (!post) return <p>Post not found</p>;

    const contentHtml = marked(post.content);

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

    return (
        <div className="shadow bg-light-secondaryBg dark:bg-dark-secondaryBg p-4 sm:p-6 md:p-8 min-h-screen w-full sm:w-11/12 md:w-2/3 lg:w-3/4 mx-auto rounded-xl">
            <button onClick={handleShare} className=" flex items-center mt-4 text-light-linkDefault dark:text-dark-linkDefault hover:text-light-linkHover dark:hover:text-dark-linkHover">
                <ShareIcon className="h-6 w-6 mr-2" />
                Share
            </button>
            {post.coverImageUrl && (
                <Image
                    src={post.coverImageUrl}
                    width={200}
                    height={200}
                    alt="Cover Image"
                    className='mx-auto mb-4 sm:mb-6 md:mb-8 rounded-lg shadow-lg'
                />
            )}
            <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-center ${literata.className} text-light-heading dark:text-dark-heading`}>
                {post.title}
            </h1>
            <div className="text-light-text dark:text-dark-text leading-relaxed text-justify text-sm sm:text-base md:text-lg">
                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </div>

        </div>
    );
};

export default PostPage;
