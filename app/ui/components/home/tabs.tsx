'use client';

import { useState } from 'react';

const tabStyles = (isActive: boolean) =>
    `px-3 py-1 rounded-md font-semibold transition-colors duration-200 ${
        isActive
            ? 'bg-light-accentMedium text-white dark:bg-dark-accentMedium'
            : 'bg-light-secondaryBg text-light-text dark:bg-dark-secondaryBg dark:text-dark-text'
    } hover:bg-light-accentLight dark:hover:bg-dark-accentLight`;

export const RelevantTab: React.FC<{ isActive: boolean; onClick: () => void }> = ({ isActive, onClick }) => {
    return (
        <button onClick={onClick} className={tabStyles(isActive)}>
            Relevant
        </button>
    );
};

export const LatestTab: React.FC<{ isActive: boolean; onClick: () => void }> = ({ isActive, onClick }) => {
    return (
        <button onClick={onClick} className={tabStyles(isActive)}>
            Latest
        </button>
    );
};

export const TrendingTab: React.FC<{ isActive: boolean; onClick: () => void }> = ({ isActive, onClick }) => {
    return (
        <button onClick={onClick} className={tabStyles(isActive)}>
            Trending
        </button>
    );
};

const Tabs: React.FC<{ onTabChange: (tab: string) => void }> = ({ onTabChange }) => {
    const [activeTab, setActiveTab] = useState('relevant');

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        onTabChange(tab);
    };

    return (
        <div className="flex space-x-2 mb-2">
            <RelevantTab isActive={activeTab === 'relevant'} onClick={() => handleTabChange('relevant')} />
            <LatestTab isActive={activeTab === 'latest'} onClick={() => handleTabChange('latest')} />
            <TrendingTab isActive={activeTab === 'trending'} onClick={() => handleTabChange('trending')} />
        </div>
    );
};

export default Tabs;
