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
        <div className="p-4 bg-light-secondaryBg dark:bg-dark-secondaryBg border border-light-accentLight dark:border-dark-accentLight rounded-lg shadow-md transition-shadow hover:shadow-lg h-52 md:h-48 w-full flex items-center relative mb-4 sm:w-full sm:h-64">
        <div className="w-24 h-24 flex-shrink-0 flex items-center justify-center">
            {post.coverImageUrl ? (
                <Image
                    src={post.coverImageUrl}
                    alt={post.title}
                    width={80}
                    height={80}
                    quality={100}
                    className="object-cover rounded-lg w-full h-full"
                />
            ) : (
                <div className="w-full h-full bg-light-primary dark:bg-dark-primary rounded-lg"></div>
            )}
        </div>
        <div className="flex flex-col justify-center flex-grow ml-4 min-w-0">
            <div>
                <h5 className={`text-base md:text-base font-bold mb-1 ${literata.className} text-light-heading dark:text-dark-heading mt-5 sm:text-sm truncate`}>
                    {post.title}
                </h5>
                <p className="text-xs md:text-sm text-light-text dark:text-dark-text mb-1 line-clamp-2 mt-1 sm:overflow-clip truncate">
                    {excerpt}
                </p>
            </div>
    
            {post.authorName && (
                <p className="text-xs md:text-sm text-light-secondaryText dark:text-dark-secondaryText mb-1 truncate">
                    by {post.authorName}
                </p>
            )}
    
            {post.tags && (
                <div className="flex flex-wrap gap-1 md:gap-2 mb-2">
                    {post.tags.map((tag) => (
                        <span key={tag} className="text-xs md:text-sm bg-light-accentLight dark:bg-dark-accentLight text-light-text dark:text-dark-text px-2 py-1 rounded truncate">
                            {tag}
                        </span>
                    ))}
                </div>
            )}
    
            <div className="flex justify-end mt-auto">
                <Link href={`/home/${post.id}/post`} className="text-xs md:text-sm text-light-accentMedium dark:text-dark-accentMedium hover:underline">
                    Read more
                </Link>
            </div>
        </div>
    
        <button
            onClick={handleBookmarkClick}
            className={`absolute top-1 left-4 p-2 rounded-full ${isBookmarked ? 'text-blue-500' : 'text-gray-400'}`}
        >
            {isBookmarked ? (
                <PiBookmarkSimpleFill className="w-5 h-5 md:w-6 md:h-6" />
            ) : (
                <PiBookmarkSimpleLight className="w-5 h-5 md:w-6 md:h-6" />
            )}
        </button>
    </div>
    
    );
};

export default PostCard;
