import Header from '@/app/ui/components/home/header';
import MainContent from '@/app/ui/components/home/maincontent';
import FeaturedPosts from '@/app/ui/components/home/featured';
import CommunityMembers from '@/app/ui/components/home/members';

export default function Home() {
    return (
        <div className="bg-light-primary dark:bg-dark-primary h-full">
            <Header />
            <div className="container mx-auto flex flex-col md:flex-row mt-8 p-4 space-x-4">
                <div className="w-full md:w-2/3">
                    <MainContent />
                </div>
                <div className="w-full md:w-1/3 space-y-8">
                    <FeaturedPosts />
                    <CommunityMembers />
                </div>
            </div>
        </div>
    );
}