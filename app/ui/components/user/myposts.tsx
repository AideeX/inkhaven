'use client';

import { usePosts } from '@/app/lib/hooks/posts'; 
import { useAuth } from '@/app/lib/firebase/auth/authcontext';
import PostCard from '@/app/ui/components/general/postcards'; 

const MyPosts: React.FC = () => {
    const { user } = useAuth();
    const { posts, loading, error } = usePosts(user?.uid);

    if (loading) return <p>Loading your posts...</p>;
    if (error) return <p>Error loading posts: {error.message}</p>;

    if (posts.length === 0) return <p>No posts found.</p>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map(post => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
};

export default MyPosts;
