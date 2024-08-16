'use client';

import { useState } from 'react';
import Tabs from '@/app/ui/components/home/tabs'; 
import PostList from '@/app/ui/components/home/postlist';

const MainContent: React.FC = () => {
    const [activeTab, setActiveTab] = useState('relevant');

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <div className="container flex flex-col mx-auto mt-8 p-4 bg-light-primary dark:bg-dark-primary rounded-lg shadow-lg">
            <Tabs onTabChange={handleTabChange} />
            <PostList tab={activeTab} />
        </div>
    );
};

export default MainContent;
