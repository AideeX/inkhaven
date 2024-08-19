'use client';

import { useAuth } from '@/app/lib/firebase/auth/authcontext';
import { usePosts } from '@/app/lib/hooks/posts';
import { useUserProfile } from '@/app/lib/hooks/userprofile';
import { useComments } from '@/app/lib/hooks/comments'; 
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import md5 from 'md5';
import { updateProfileData } from '@/app/lib/hooks/updateprofile';
import { Box } from '@chakra-ui/react';
import { ProfileSkeleton } from '@/app/ui/skeletons';

const Profile: React.FC = () => {
    const { user } = useAuth();
    const { posts, loading: postsLoading, error: postsError } = usePosts(user?.uid);
    const { profile, loading: profileLoading, error: profileError } = useUserProfile(user?.uid || '');
    const { comments,  error: commentsError } = useComments(user?.uid || ''); 
    const [isVisitor, setIsVisitor] = useState(false);
    const [gravatarUrl, setGravatarUrl] = useState<string | null>(null);
    const [useGravatar, setUseGravatar] = useState(true);
    const [profileData, setProfileData] = useState({
        displayName: '',
        bio: '',
        photoURL: '',
    });

    useEffect(() => {
        if (profile) {
            setProfileData({
                displayName: profile.displayName,
                bio: profile.bio,
                photoURL: profile.photoURL || '',
            });
        }
    }, [profile]);

    useEffect(() => {
        if (user?.email && useGravatar && !profileData.photoURL) {
            const hash = md5(user.email.trim().toLowerCase());
            const url = `https://www.gravatar.com/avatar/${hash}?d=identicon`;
            setGravatarUrl(url);
        }
    }, [user?.email, useGravatar, profileData.photoURL]);

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateProfileData(user?.uid || '', {
                displayName: profileData.displayName,
                bio: profileData.bio,
                photoURL: useGravatar ? gravatarUrl || '' : profileData.photoURL,
            });
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        }
    };

    if (profileLoading || postsLoading ) {
        return <ProfileSkeleton />;
    }

    return (
        <Box className="container mx-auto mt-8 p-4 bg-light-secondaryBg dark:bg-dark-secondaryBg rounded-xl shadow-3xl">
            <div className="flex items-center space-x-4">
                <Image
                    src={useGravatar ? gravatarUrl || '/default-profile.png' : profileData.photoURL || '/default-profile.png'}
                    alt="Profile Picture"
                    width={80}
                    height={80}
                    className="rounded-full"
                />
                <div>
                    <h1 className="text-2xl font-bold text-light-heading dark:text-dark-heading">
                        {profileData.displayName}
                    </h1>
                    <p className="text-light-text dark:text-dark-text">{profile?.bio || 'No bio available'}</p>
                    {profile?.createdAt && (
                        <p className="text-sm text-light-secondaryText dark:text-dark-secondaryText">
                            Member since: {profile.createdAt.toDateString()}
                        </p>
                    )}
                </div>
            </div>

            {!isVisitor && (
                <div className="mt-4 flex space-x-6">
                    <div>
                        <p className="text-xl font-semibold text-light-heading dark:text-dark-heading">{profile?.follows || 0}</p>
                        <p className="text-light-secondaryText dark:text-dark-secondaryText">Follows</p>
                    </div>
                    <div>
                        <p className="text-xl font-semibold text-light-heading dark:text-dark-heading">{profile?.followers || 0}</p>
                        <p className="text-light-secondaryText dark:text-dark-secondaryText">Followers</p>
                    </div>
                    <div>
                        <p className="text-xl font-semibold text-light-heading dark:text-dark-heading">{posts.length}</p>
                        <p className="text-light-secondaryText dark:text-dark-secondaryText">Published Posts</p>
                    </div>
                </div>
            )}

            {isVisitor && (
                <div className="mt-4">
                    <button className="px-4 py-2 bg-light-buttonDefault dark:bg-dark-buttonDefault text-white rounded hover:bg-light-buttonHover dark:hover:bg-dark-buttonHover">
                        Follow
                    </button>
                </div>
            )}

            <div className="mt-8">
                <h2 className="text-xl font-semibold text-light-heading dark:text-dark-heading">Published Posts</h2>
                {posts.length === 0 ? (
                    <p className="text-light-text dark:text-dark-text">No posts yet.</p>
                ) : (
                    <ul className="list-disc ml-5 mt-2">
                        {posts.map((post) => (
                            <li key={post.id}>
                                <Link href={`/post/${post.id}`}>
                                    <span className="text-light-linkDefault dark:text-dark-linkDefault hover:text-light-linkHover dark:hover:text-dark-linkHover">
                                        {post.title}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold text-light-heading dark:text-dark-heading">Comments</h2>
                {comments.length === 0 ? (
                    <p className="text-light-text dark:text-dark-text">No comments yet.</p>
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

            {!isVisitor && (
                <form onSubmit={handleProfileUpdate} className="mt-8 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-light-text dark:text-dark-text">Display Name</label>
                        <input
                            type="text"
                            value={profileData.displayName}
                            onChange={(e) => setProfileData({ ...profileData, displayName: e.target.value })}
                            className="mt-1 p-2 border border-light-accentLight dark:border-dark-accentLight rounded-md w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-light-text dark:text-dark-text">Bio</label>
                        <textarea
                            value={profileData.bio}
                            onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                            className="mt-1 p-2 border border-light-accentLight dark:border-dark-accentLight rounded-md w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-light-text dark:text-dark-text">Profile Picture</label>
                        <input
                            type="url"
                            value={profileData.photoURL}
                            onChange={(e) => setProfileData({ ...profileData, photoURL: e.target.value || '' })}
                            className="mt-1 p-2 border border-light-accentLight dark:border-dark-accentLight rounded-md w-full"
                            disabled={useGravatar}
                        />
                        <div className="mt-2">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    checked={useGravatar}
                                    onChange={(e) => setUseGravatar(e.target.checked)}
                                    className="form-checkbox"
                                />
                                <span className="ml-2 text-light-text dark:text-dark-text">Use Gravatar</span>
                            </label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-light-buttonDefault dark:bg-dark-buttonDefault text-white rounded hover:bg-light-buttonHover dark:hover:bg-dark-buttonHover"
                    >
                        Update Profile
                    </button>
                </form>
            )}
        </Box>
    );
};

export default Profile;
