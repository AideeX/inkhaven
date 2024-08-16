'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useAuth } from '@/app/lib/firebase/auth/authcontext';
import { savePostToBookmarks, removePostFromBookmarks, isPostBookmarked } from '@/app/lib/hooks/bookmarks';
import { PiBookmarkSimpleLight, PiBookmarkSimpleFill } from "react-icons/pi";
import { literata } from '../../styles/fonts';

type Post = {
    id: string;
    title: string;
    content: string;
    coverImageUrl?: string;
    createdAt: Date;
    tags?: string[];
    authorName?: string;
};

type PostCardProps = {
    post: Post;
};

const generateExcerpt = (content: string | undefined, length: number = 100) => {
    if (typeof content !== 'string') {
        return '';
    }
    return content.length > length ? content.substring(0, length) + '...' : content;
};

const PostCard: React.FC<PostCardProps> = ({ post }) => {
    const { user } = useAuth();
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        const checkIfBookmarked = async () => {
            if (user) {
                const bookmarked = await isPostBookmarked(user.uid, post.id);
                setIsBookmarked(bookmarked);
            }
        };
        checkIfBookmarked();
    }, [user, post.id]);

    const handleBookmarkClick = async () => {
        if (user) {
            if (isBookmarked) {
                await removePostFromBookmarks(user.uid, post.id);
                setIsBookmarked(false);
            } else {
                await savePostToBookmarks(user.uid, post.id);
                setIsBookmarked(true);
            }
        } else {
            console.log("User not authenticated");
        }
    };

    const excerpt = generateExcerpt(post.content);

    return (
        <div className="p-4 bg-light-primary dark:bg-dark-primary border border-light-accentLight dark:border-dark-accentLight rounded-lg shadow-md transition-shadow hover:shadow-lg h-40 w-full flex flex-row relative">
            {post.coverImageUrl && (
                <Image
                    src={post.coverImageUrl}
                    alt={post.title}
                    width={80}
                    height={20}
                    quality={100}
                    className="w-20 h-2o object-cover rounded-lg mb-4"
                />
            )}
            <div className='flex flex-col justify-start m-8 my-auto'>
            <h5 className={` sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8  ${literata.className} text-light-heading dark:text-dark-heading`}>
                {post.title}
            </h5>
            <p className="text-light-text dark:text-dark-text mb-4">
                {excerpt}
            </p>

            {post.authorName && (
                <p className="text-sm text-light-secondaryText dark:text-dark-secondaryText">
                    by {post.authorName}
                </p>
            )}
            </div>
            
            {post.tags && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {post.tags.map((tag) => (
                        <span key={tag} className="text-sm bg-light-accentLight dark:bg-dark-accentLight text-light-text dark:text-dark-text px-2 py-1 rounded">
                            {tag}
                        </span>
                    ))}
                </div>
            )}
            <Link href={`/home/${post.id}/post`} className="absolute bottom-4 right-4 text-light-accentMedium dark:text-dark-accentMedium hover:underline mt-auto inline-block">
                Read more
            </Link>

            <button
                onClick={handleBookmarkClick}
                className={`absolute top-4 right-4 p-2 rounded-full ${isBookmarked ? 'text-blue-500' : 'text-gray-400'}`}
            >
                {isBookmarked ? (
                    <PiBookmarkSimpleFill className="w-6 h-6" />
                ) : (
                    <PiBookmarkSimpleLight className="w-6 h-6" />
                )}
            </button>
        </div>
    );
};

export default PostCard;
