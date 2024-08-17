'use client';

import PostCard from '@/app/ui/components/general/postcards';
import { useAllPosts } from '@/app/lib/hooks/allposts';
import { HomePageSkeleton } from '@/app/ui/skeletons';

const PostList: React.FC<{ tab: string }> = ({ tab }) => {
    const { posts, loading, error } = useAllPosts(tab) as {
        posts: { id: string; title: string; content: string; coverImageUrl: string; createdAt: string; }[];
        loading: boolean;
        error: any;
    };

    if (loading) return <HomePageSkeleton />; 
    if (error) return <p className="text-red-500">Error loading posts: {error.message}</p>;

    return (
        <div className="space-y-4">
            {posts.map(post => (
                <PostCard
                    key={post.id}
                    post={{
                        id: post.id,
                        title: post.title || 'Untitled',
                        content: post.content || 'No content available',
                        coverImageUrl: post.coverImageUrl || '', 
                        createdAt: new Date(post.createdAt)
                    }}
                />
            ))}
        </div>
    );
};

export default PostList;
