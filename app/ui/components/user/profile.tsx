'use client';

import { useAuth } from '@/app/lib/firebase/auth/authcontext';
import { usePosts } from '@/app/lib/hooks/posts';
import { useUserProfile } from '@/app/lib/hooks/userprofile';
import { useComments } from '@/app/lib/hooks/comments';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import md5 from 'md5';
import { useRouter, usePathname } from 'next/navigation';
import { Box } from '@chakra-ui/react';
import { UserRoundPlus, UserRoundCheck } from 'lucide-react';
import { doc, updateDoc, increment, getDoc } from 'firebase/firestore';
import { db } from '@/app/lib/firebase/config';

const Profile: React.FC = () => {
    const { user } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const userIdFromPath = pathname.split('/')[2];
    const { profile, loading: profileLoading } = useUserProfile(userIdFromPath || '');
    const { posts, loading: postsLoading } = usePosts(userIdFromPath || '');
    const { comments } = useComments(userIdFromPath || '');

    const [isFollowing, setIsFollowing] = useState(false);
    const [gravatarUrl, setGravatarUrl] = useState<string | null>(null);

    useEffect(() => {
        if (profile?.email) {
            const hash = md5(profile.email.trim().toLowerCase());
            setGravatarUrl(`https://www.gravatar.com/avatar/${hash}?d=identicon`);
        }
    }, [profile?.email]);

    useEffect(() => {
        if (user && profile) {
            const checkIfFollowing = async () => {
                const currentUserDoc = await getDoc(doc(db, 'users', user.uid));
                if (currentUserDoc.exists()) {
                    const data = currentUserDoc.data();
                    if (Array.isArray(data.follows)) {
                        setIsFollowing(data.follows.includes(profile.uid));
                    } else {
                        setIsFollowing(false);
                    }
                }
            };
            checkIfFollowing();
        }
    }, [user, profile]);

    const handleFollow = async () => {
        if (!user || !profile) return;

        const userDocRef = doc(db, 'users', profile.uid);
        const currentUserDocRef = doc(db, 'users', user.uid);

        try {
            if (isFollowing) {
                await updateDoc(userDocRef, {
                    followers: increment(-1),
                });
                await updateDoc(currentUserDocRef, {
                    follows: increment(-1),
                });
            } else {
                await updateDoc(userDocRef, {
                    followers: increment(1),
                });
                await updateDoc(currentUserDocRef, {
                    follows: increment(1),
                });
            }
            setIsFollowing(!isFollowing);
        } catch (error) {
            console.error('Error updating follow status:', error);
        }
    };

    const handleEditProfile = () => {
        router.push(`/home/${user?.uid}/user/profile/update`);
    };

    const displayName = (profile?.displayChoice?.useDisplayName && profile?.displayName) || '';
    const username = (profile?.displayChoice?.useUsername && profile?.username) || '';
    const fullName = [displayName, username].filter(Boolean).join(' ');

    const isVisitor = user?.uid !== profile?.uid;

    return (
        <Box
            className={`container mx-auto p-4 bg-light-secondaryBg dark:bg-dark-secondaryBg rounded-xl ${
                isVisitor ? 'mt-24' : 'mt-8'
            }`}
        >
            <div className="flex flex-col md:flex-row items-center md:space-x-4">
                <Image
                    src={profile?.photoURL || gravatarUrl || '/default-profile.png'}
                    alt="Profile Picture"
                    width={100}
                    height={100}
                    className="rounded-full"
                />
                <div className="mt-4 md:mt-0">
                    <h1 className="text-2xl font-bold text-light-heading dark:text-dark-heading">
                        {fullName || 'User'}
                    </h1>
                    <p className="text-light-text dark:text-dark-text">{profile?.bio || 'No bio available'}</p>
                    {profile?.createdAt && (
                        <p className="text-sm text-light-secondaryText dark:text-dark-secondaryText">
                            Member since: {new Date(profile.createdAt).toDateString()}
                        </p>
                    )}
                </div>
                {isVisitor && (
                    <button onClick={handleFollow} className="ml-auto mt-4 md:mt-0">
                        {isFollowing ? (
                            <UserRoundCheck className="text-green-500" size={24} />
                        ) : (
                            <UserRoundPlus className="text-blue-500" size={24} />
                        )}
                    </button>
                )}
            </div>

            <div className="mt-6 flex space-x-6 justify-center md:justify-start">
                <div>
                    <p className="text-xl font-semibold text-light-heading dark:text-dark-heading">
                        {profile?.follows || 0}
                    </p>
                    <p className="text-light-secondaryText dark:text-dark-secondaryText">Follows</p>
                </div>
                <div>
                    <p className="text-xl font-semibold text-light-heading dark:text-dark-heading">
                        {profile?.followers || 0}
                    </p>
                    <p className="text-light-secondaryText dark:text-dark-secondaryText">Followers</p>
                </div>
                <div>
                    <p className="text-xl font-semibold text-light-heading dark:text-dark-heading">
                        {posts.length}
                    </p>
                    <p className="text-light-secondaryText dark:text-dark-secondaryText">Published Posts</p>
                </div>
            </div>

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
                <div className="mt-8 flex justify-center md:justify-start">
                    <button
                        onClick={handleEditProfile}
                        className="px-4 py-2 bg-light-buttonDefault dark:bg-dark-buttonDefault text-white rounded hover:bg-light-buttonHover dark:hover:bg-dark-buttonHover"
                    >
                        Edit Profile
                    </button>
                </div>
            )}
        </Box>
    );
};

export default Profile;
