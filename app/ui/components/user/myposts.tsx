'use client';

import { usePosts } from '@/app/lib/hooks/posts'; 
import { useAuth } from '@/app/lib/firebase/auth/authcontext';
import UserPostCard from '@/app/ui/components/user/userpostcards'; 
import { UserPostCardSkeleton } from '../../skeletons';

const MyPosts: React.FC = () => {
    const { user } = useAuth();
    const { posts, loading, error } = usePosts(user?.uid);


    if (loading) return <UserPostCardSkeleton />
    if (error) return <p>Error loading posts: {error.message}</p>;
    if (posts.length === 0) return <p>No posts found.</p>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map(post => (
                <UserPostCard key={post.id} post={post} />
            ))}
        </div>
    );
};

export default MyPosts;
