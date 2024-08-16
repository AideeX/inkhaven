'use client';

import { useState } from 'react';
import MyPosts from '@/app/ui/components/user/myposts'; 
import Drafts from '@/app/ui/components/user/drafts'; 
import Bookmarks from '@/app/ui/components/user/bookmarks'; 

const Content = () => {
    const [activeTab, setActiveTab] = useState<'posts' | 'drafts' | 'bookmarks'>('posts');

    return (
        <div className="container mx-auto mt-8 p-4">
            <div className="flex justify-around border-b border-light-accentLight dark:border-dark-accentLight mb-4">
                <button 
                    className={`py-2 px-4 ${activeTab === 'posts' ? 'border-b-2 border-light-accentMedium dark:border-dark-accentMedium' : ''}`} 
                    onClick={() => setActiveTab('posts')}
                >
                    My Posts
                </button>
                <button 
                    className={`py-2 px-4 ${activeTab === 'drafts' ? 'border-b-2 border-light-accentMedium dark:border-dark-accentMedium' : ''}`} 
                    onClick={() => setActiveTab('drafts')}
                >
                    Drafts
                </button>
                <button 
                    className={`py-2 px-4 ${activeTab === 'bookmarks' ? 'border-b-2 border-light-accentMedium dark:border-dark-accentMedium' : ''}`} 
                    onClick={() => setActiveTab('bookmarks')}
                >
                    Saved Posts
                </button>
            </div>

            <div>
                {activeTab === 'posts' && <MyPosts />}
                {activeTab === 'drafts' && <Drafts />}
                {activeTab === 'bookmarks' && <Bookmarks />}
            </div>
        </div>
    );
};

export default Content;
