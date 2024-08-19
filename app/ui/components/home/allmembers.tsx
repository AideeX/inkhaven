'use client';

import { useRouter } from 'next/navigation';
import { useUsers } from '@/app/lib/hooks/fetchusers';
import Image from 'next/image';
import md5 from 'md5';
import { useState } from 'react';
import { AllMembersSkeleton } from '../../skeletons';
import { literata } from '../../styles/fonts';

const getGravatarUrl = (email: string) => {
    const hash = md5(email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
};

const AllMembers: React.FC = () => {
    const { users, lastVisible, loading, error, loadMore } = useUsers();
    const router = useRouter();
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    if (loading) return <AllMembersSkeleton />;
    if (error) return <p>Error loading community members: {error.message}</p>;

    const handleNavigation = (url: string) => {
        router.push(url);
    };

    const handleLoadMore = async () => {
        setIsLoadingMore(true);
        if (lastVisible) {
            await loadMore(lastVisible);
        }
        setIsLoadingMore(false);
    };

    return (
        <div className="bg-light-primary dark:bg-dark-primary p-4 rounded-lg shadow-md mt-8 w-3/4 mx-auto">
            <div className="flex justify-center items-center mb-4">
                <h2 className={`${literata.className} text-center text-xl font-semibold text-light-heading dark:text-dark-heading`}>Community Members</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {users.map(user => {
                    const profilePicture = user.photoURL || (user.email ? getGravatarUrl(user.email) : '/default-profile.png');

                    return (
                        <div
                            key={user.id}
                            className="bg-light-secondaryBg dark:bg-dark-secondaryBg p-6 rounded-lg shadow hover:bg-light-accentLight dark:hover:bg-dark-accentLight transition cursor-pointer w-full max-w-sm mx-auto min-h-[160px] flex flex-col items-center justify-center"
                            onClick={() => handleNavigation(`/home/${user.id}/user/profile`)}
                        >
                            <div className="flex items-center space-x-4">
                                <Image
                                    src={profilePicture}
                                    alt={user.displayName}
                                    width={50}
                                    height={50}
                                    className="w-14 h-14 object-cover rounded-full"
                                />
                                <span className="text-light-text dark:text-dark-text font-medium">{user.displayName}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
            {lastVisible && (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={handleLoadMore}
                        disabled={isLoadingMore}
                        className="px-4 py-2 mt-6 bg-light-buttonDefault dark:bg-dark-buttonDefault text-white rounded hover:bg-light-buttonHover dark:hover:bg-dark-buttonHover"
                    >
                        {isLoadingMore ? 'Loading...' : 'Load More'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default AllMembers;
