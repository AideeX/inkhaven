'use client';

import { useAuth } from '@/app/lib/firebase/auth/authcontext';
import { usePosts } from '@/app/lib/hooks/posts';
import { useUserProfile } from '@/app/lib/hooks/userprofile';
import { useComments } from '@/app/lib/hooks/comments'; 
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Profile: React.FC = () => {
    const { user } = useAuth();
    const { posts, loading: postsLoading, error: postsError } = usePosts(user?.uid);
    const { profile, loading: profileLoading, error: profileError } = useUserProfile(user?.uid || '');
    const { comments, loading: commentsLoading, error: commentsError } = useComments(user?.uid || ''); 
    const [isVisitor, setIsVisitor] = useState(false);

    
    useEffect(() => {
        console.log('User data:', user);
    }, [user]);

    if (profileLoading || postsLoading || commentsLoading) return <p>Loading profile...</p>;
    if (profileError) return <p>Error loading profile: {profileError.message}</p>;
    if (postsError) return <p>Error loading posts: {postsError.message}</p>;
    if (commentsError) return <p>Error loading comments: {commentsError.message}</p>;

    return (
        <div className="container mx-auto mt-8 p-4">
            <div className="flex items-center space-x-4">
                <Image
                    src={user?.photoURL || '/default-profile.png'}
                    alt="Profile Picture"
                    width={80}
                    height={80}
                    className="rounded-full"
                />
                <div>
                    <h1 className="text-2xl font-bold">{user?.displayName || 'User'}</h1>
                    <p className="text-gray-600">{profile?.bio || 'No bio available'}</p>
                    {profile?.createdAt && (
                        <p className="text-sm text-gray-500">Member since: {profile.createdAt.toDateString()}</p>
                    )}
                </div>
            </div>

            {!isVisitor && (
                <div className="mt-4 flex space-x-6">
                    <div>
                        <p className="text-xl font-semibold">{profile?.follows || 0}</p>
                        <p className="text-gray-600">Follows</p>
                    </div>
                    <div>
                        <p className="text-xl font-semibold">{profile?.followers || 0}</p>
                        <p className="text-gray-600">Followers</p>
                    </div>
                    <div>
                        <p className="text-xl font-semibold">{posts.length}</p>
                        <p className="text-gray-600">Published Posts</p>
                    </div>
                </div>
            )}

            {isVisitor && (
                <div className="mt-4">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                        Follow
                    </button>
                </div>
            )}

            <div className="mt-8">
                <h2 className="text-xl font-semibold">Published Posts</h2>
                {posts.length === 0 ? (
                    <p>No posts yet.</p>
                ) : (
                    <ul className="list-disc ml-5 mt-2">
                        {posts.map((post) => (
                            <li key={post.id}>
                                <Link href={`/post/${post.id}`}>
                                    <span className="text-light-accentMedium dark:text-dark-accentMedium hover:underline">
                                        {post.title}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold">Comments</h2>
                {comments.length === 0 ? (
                    <p>No comments yet.</p>
                ) : (
                    <ul className="list-disc ml-5 mt-2">
                        {comments.map((comment) => (
                            <li key={comment.id}>
                                <p className="text-light-text dark:text-dark-text">{comment.content}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Profile;