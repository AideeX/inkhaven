'use client';

import { useState, useEffect } from 'react';
import Tabs from '@/app/ui/components/home/tabs'; 
import PostList from '@/app/ui/components/home/postlist';
import { MainContentSkeleton } from '../../skeletons';

const MainContent: React.FC = () => {
    const [activeTab, setActiveTab] = useState('relevant');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000); 
    }, []);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    if (loading) {
        return <MainContentSkeleton />;
    }

    return (
        <div className="container flex flex-col mx-auto mt-6 p-4 bg-light-primary dark:bg-dark-primary rounded-xl shadow-3xl">
            <Tabs onTabChange={handleTabChange} />
            <PostList tab={activeTab} />
        </div>
    );
};

export default MainContent;
