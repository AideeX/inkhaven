import PostCard from '@/app/ui/components/general/postcards';
import { useAllPosts } from '@/app/lib/hooks/allposts';

const PostList: React.FC<{ tab: string }> = ({ tab }) => {
    const { posts, loading, error } = useAllPosts(tab) as {
        posts: { id: string; postTitle: string; content: string; coverImageUrl: string; createdAt: string; }[];
        loading: boolean;
        error: any;
    };

    if (loading) return null;
    if (error) return <p className="text-red-500">Error loading posts: {error.message}</p>;

    return (
        <div className="space-y-4 px-4 sm:px-6 lg:px-8 max-w-full overflow-hidden">
            {posts.map(post => (
                <PostCard
                    key={post.id}
                    post={{
                        id: post.id,
                        title: post.postTitle || 'Untitled',
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
