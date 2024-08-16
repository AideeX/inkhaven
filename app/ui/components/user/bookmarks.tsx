'use client';

import { useBookmarks } from '@/app/lib/hooks/bookmarks';
import { useAuth } from '@/app/lib/firebase/auth/authcontext';
import PostCard from '@/app/ui/components/general/postcards';

const Bookmarks: React.FC = () => {
    const { user } = useAuth();
    const { data: bookmarks = [], isValidating: loading, error } = useBookmarks(user?.uid || '');

    if (!user) return <p>Please sign in to view your bookmarks.</p>;
    if (loading) return <p>Loading your bookmarks...</p>;
    if (error) return <p>Error loading bookmarks: {error.message}</p>;
    if (bookmarks.length === 0) return <p>No bookmarks found.</p>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookmarks.map((bookmark: any) => (
                <PostCard 
                    key={bookmark.postId} 
                    post={{ 
                        id: bookmark.postId, 
                        title: bookmark.title, 
                        content: bookmark.content, 
                        coverImageUrl: bookmark.coverImageUrl, 
                        createdAt: bookmark.createdAt, 
                        tags: bookmark.tags, 
                        authorName: bookmark.authorName 
                    }} 
                />
            ))}
        </div>
    );
};

export default Bookmarks;