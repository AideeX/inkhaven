'use client';

import { useDrafts } from '@/app/lib/hooks/drafts';
import { useAuth } from '@/app/lib/firebase/auth/authcontext';
import PostCard from '@/app/ui/components/general/postcards';

const Drafts: React.FC = () => {
    const { user } = useAuth();
    const { drafts, loading, error } = useDrafts(user?.uid || '');

    if (loading) return <p>Loading your drafts...</p>;
    if (error) return <p>Error loading drafts: {error.message}</p>;

    if (drafts.length === 0) return <p>No drafts found.</p>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {drafts.map(draft => (
                <PostCard key={draft.id} post={draft} />
            ))}
        </div>
    );
};

export default Drafts;
