'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useNotifications } from '@/app/lib/hooks/notifications';
import { BellIcon } from '@heroicons/react/24/outline';
import { NotificationSkeleton } from '@/app/ui/skeletons';

const Notifications = () => {
    const { notifications, loading, error } = useNotifications();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleBellClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="relative">
            <button onClick={handleBellClick}>
                <BellIcon className="h-8 w-8 text-light-text dark:text-dark-text cursor-pointer" />
            </button>
            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-light-secondaryBg dark:bg-dark-secondaryBg p-4 rounded-lg shadow-lg z-50">
                    {loading ? (
                        <NotificationSkeleton />
                    ) : error ? (
                        <p className="text-red-500">Error loading notifications.</p>
                    ) : notifications.length === 0 ? (
                        <p className="text-center text-light-text dark:text-dark-text">No notifications</p>
                    ) : (
                        <div>
                            {notifications.map((notification) => (
                                <Link
                                    key={notification.id}
                                    href={notification.type === 'follow' ? `/profile/${notification.sourceUserId}` : `/post/${notification.targetPostId}`}
                                    className="block px-4 py-2 text-light-text dark:text-dark-text hover:bg-light-accentLight dark:hover:bg-dark-accentLight rounded"
                                >
                                    {notification.message}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Notifications;
