'use client';

import { useEffect, useState } from 'react';
import { useAnalytics } from '@/app/lib/hooks/analytics';
import { DashboardSkeleton } from '../../skeletons';

const Dashboard: React.FC = () => {
    const { analytics, loading, error } = useAnalytics();
    const [views, setViews] = useState(0);
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState(0);
    const [bookmarks, setBookmarks] = useState(0);

    useEffect(() => {
        if (analytics.length > 0) {
            setViews(analytics.reduce((sum, data) => sum + data.views, 0));
            setLikes(analytics.reduce((sum, data) => sum + data.likes, 0));
            setComments(analytics.reduce((sum, data) => sum + data.comments, 0));
            setBookmarks(analytics.reduce((sum, data) => sum + data.bookmarks, 0));
        }
    }, [analytics]);

    if (loading) {
        return <DashboardSkeleton/>;
    }

    if (error) {
        return <div className="text-light-text dark:text-dark-text">Error loading analytics: {error.message}</div>;
    }

    return (
        <div className="p-6 bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="p-4 bg-light-secondaryBg dark:bg-dark-secondaryBg rounded-lg shadow-lg text-center">
                    <h3 className="text-lg font-medium text-light-heading dark:text-dark-heading">Total Views</h3>
                    <p className="text-2xl font-bold">{views}</p>
                </div>
                <div className="p-4 bg-light-secondaryBg dark:bg-dark-secondaryBg rounded-lg shadow-lg text-center">
                    <h3 className="text-lg font-medium text-light-heading dark:text-dark-heading">Total Likes</h3>
                    <p className="text-2xl font-bold">{likes}</p>
                </div>
                <div className="p-4 bg-light-secondaryBg dark:bg-dark-secondaryBg rounded-lg shadow-lg text-center">
                    <h3 className="text-lg font-medium text-light-heading dark:text-dark-heading">Total Comments</h3>
                    <p className="text-2xl font-bold">{comments}</p>
                </div>
                <div className="p-4 bg-light-secondaryBg dark:bg-dark-secondaryBg rounded-lg shadow-lg text-center">
                    <h3 className="text-lg font-medium text-light-heading dark:text-dark-heading">Total Bookmarks</h3>
                    <p className="text-2xl font-bold">{bookmarks}</p>
                </div>
            </div>

            <div className="p-6 bg-light-secondaryBg dark:bg-dark-secondaryBg rounded-lg shadow-lg">
                <h3 className="text-xl font-medium text-light-heading dark:text-dark-heading mb-4">Post Analytics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {analytics.map((data) => (
                        <div key={data.postId} className="flex flex-col items-center">
                            <div className="relative w-full h-48 bg-light-accentLight dark:bg-dark-accentLight rounded-lg mb-2">
                                <div className="absolute bottom-0 left-0 w-full h-full flex flex-col justify-end">
                                    <div className="w-full bg-blue-500" style={{ height: `${data.views}px` }}></div>
                                    <div className="w-full bg-gray-500" style={{ height: `${data.likes}px` }}></div>
                                    <div className="w-full bg-yellow-500" style={{ height: `${data.comments}px` }}></div>
                                    <div className="w-full bg-green-500" style={{ height: `${data.bookmarks}px` }}></div>
                                </div>
                            </div>
                            <p className="text-sm text-light-secondaryText dark:text-dark-secondaryText">Post {data.postId}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
