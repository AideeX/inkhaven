import Header from '@/app/ui/components/home/header';
import MainContent from '@/app/ui/components/home/maincontent';
import FeaturedPosts from '@/app/ui/components/home/featured';
import CommunityMembers from '@/app/ui/components/home/members';

export default function Home() {
    return (
        <div className="bg-light-primary dark:bg-dark-primary h-full">
            <Header />
            <div className="container mx-auto flex flex-col md:flex-row mt-8 gap-8 p-4">
                <div className="w-full md:w-2/3">
                    <MainContent />
                </div>

                <div className="hidden md:block md:w-1/3 space-y-8 mt-20">
                    <FeaturedPosts />
                    <CommunityMembers />
                </div>
            </div>
        </div>
    );
}
