'use client';

import Link from 'next/link';
import { useUsers } from '@/app/lib/hooks/fetchusers';
import Image from 'next/image';
import md5 from 'md5';
import { CommunityMembersSkeleton } from '../../skeletons';

const getGravatarUrl = (email: string) => {
    const hash = md5(email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}`;
};

const CommunityMembers: React.FC = () => {
    const { users, loading, error } = useUsers();

    if (loading) return <CommunityMembersSkeleton/>
    if (error) return <p>Error loading community members: {error.message}</p>;

    const displayedUsers = users.slice(0, 6);

    return (
        <div className="bg-light-secondaryBg dark:bg-dark-secondaryBg p-4 rounded-lg shadow-md mt-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-light-heading dark:text-dark-heading text-center">Community Members</h2>
                <Link href="/home/members">
                    <span className="text-light-accentMedium dark:text-dark-accentMedium hover:underline text-sm">View All</span>
                </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {displayedUsers.map(user => {
                    const profilePicture = user.photoURL || getGravatarUrl((user as any).email) || '/default-profile.png';

                    return (
                        <Link key={user.id} href={`/home/${user.id}/user/profile`}>
                            <div className="flex items-center space-x-4 hover:bg-light-accentLight dark:hover:bg-dark-accentLight p-2 rounded cursor-pointer">
                                <Image
                                    src={profilePicture} 
                                    alt={user.displayName} 
                                    width={40}
                                    height={40}
                                    className="w-12 h-12 object-cover rounded-full"
                                />
                                <span className="text-light-text dark:text-dark-text font-medium">{user.displayName}</span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default CommunityMembers;
