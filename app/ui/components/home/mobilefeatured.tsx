'use client';

import Link from 'next/link';
import { useFeaturedPosts } from '@/app/lib/hooks/featured';
import { MobileFeaturedSkeleton } from '../../skeletons';
import { literata } from '../../styles/fonts';
import Image from 'next/image';

const generateExcerpt = (content: string | undefined, length: number = 100) => {
    if (typeof content !== 'string') {
        return '';
    }
    return content.length > length ? content.substring(0, length) + '...' : content;
};

const MobileFeatured: React.FC = () => {
    const { posts, loading, error } = useFeaturedPosts();

    if (loading) return <MobileFeaturedSkeleton />;
    if (error) return <p>Error loading featured posts: {error.message}</p>;

    return (
        <div className="bg-light-secondaryBg dark:bg-dark-secondaryBg p-4 rounded-lg shadow-md mt-4 md:mt-0">
            <h2 className={`${literata.className} text-center mb-4 text-lg text-light-heading dark:text-dark-heading`}>
                Featured
            </h2>
            <div className="space-y-3">
                {posts.map(post => {
                    const excerpt = generateExcerpt(post.content, 50); 
                    return (
                        <Link key={post.id} href={`/home/${post.id}/post`}>
                            <div className="flex items-center p-2 rounded-lg cursor-pointer transition-colors hover:bg-light-accentLight dark:hover:bg-dark-accentLight">
                                {post.coverImageUrl && (
                                    <Image 
                                        src={post.coverImageUrl} 
                                        alt={post.postTitle} 
                                        className="w-16 h-16 object-cover rounded-lg" 
                                        width={64}
                                        height={64}
                                    />
                                )}
                                <div className="ml-4 text-left">
                                    <h3 className={`text-sm text-light-heading dark:text-dark-heading font-semibold ${literata.className}`}>
                                        {post.postTitle}
                                    </h3> 
                                    <p className="text-xs text-light-secondaryText dark:text-dark-secondaryText mt-1">
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

export default MobileFeatured;
