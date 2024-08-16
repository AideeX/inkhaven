'use client';

import { useParams } from 'next/navigation'; 
import { useEffect, useState } from 'react';
import { usePosts } from '@/app/lib/hooks/posts';
import Image from 'next/image';
import { literata } from '../../styles/fonts';
import {marked } from 'marked';

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading post: {error.message}</p>;
    if (!post) return <p>Post not found</p>;


    const contentHtml = marked(post.content);

    return (
        <div className="shadow bg-gradient-to-r from-light-secondaryBg to-light-primary dark:from-dark-secondaryBg dark:to-dark-primary p-4 sm:p-6 md:p-8 min-h-screen w-full sm:w-11/12 md:w-2/3 lg:w-3/4 mx-auto rounded-xl">
            {post.coverImageUrl && (
                <Image
                    src={post.coverImageUrl}
                    width={200}
                    height={200}
                    alt="Cover Image"
                    className='mx-auto mb-4 sm:mb-6 md:mb-8'
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