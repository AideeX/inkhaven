'use client';

import Link from 'next/link';
import { useFeaturedPosts } from '@/app/lib/hooks/featured';
import { FeaturedPostsSkeleton } from '../../skeletons';
import { literata } from '../../styles/fonts';
import Image from 'next/image';

const generateExcerpt = (content: string | undefined, length: number = 100) => {
    if (typeof content !== 'string') {
        return '';
    }
    return content.length > length ? content.substring(0, length) + '...' : content;
};

const FeaturedPosts: React.FC = () => {
    const { posts, loading, error } = useFeaturedPosts();

    if (loading) return <FeaturedPostsSkeleton/>
    if (error) return <p>Error loading featured posts: {error.message}</p>;

    return (
        <div className="bg-light-secondaryBg dark:bg-dark-secondaryBg p-4 rounded-lg shadow-md mt-4 md:mt-0">
            <h2 className={`${literata.className} text-center mb-4 text-lg md:text-xl text-light-heading dark:text-dark-heading`}>Featured Posts</h2>
            <div className="space-y-4">
                {posts.map(post => {
                    const excerpt = generateExcerpt(post.content); 
                    return (
                        <Link key={post.id} href={`/home/${post.id}/post`}>
                            <div className="flex flex-col md:flex-row items-center md:items-start p-2 rounded-lg cursor-pointer transition-colors hover:bg-light-accentLight dark:hover:bg-dark-accentLight">
                                {post.coverImageUrl && (
                                    <Image 
                                        src={post.coverImageUrl} 
                                        alt={post.postTitle} 
                                        width={64}
                                        height={64}
                                        className="w-full h-40 md:w-16 md:h-16 object-cover rounded-lg mb-2 md:mb-0" 
                                    />
                                )}
                                <div className="md:ml-4 text-center md:text-left">
                                    <h3 className={`text-base md:text-lg text-light-text dark:text-dark-text ${literata.className}`}>
                                        {post.postTitle}
                                    </h3> 
                                    <p className="text-xs md:text-sm text-light-secondaryText dark:text-dark-secondaryText mt-1 md:mt-2">
                                        {excerpt}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default FeaturedPosts;
