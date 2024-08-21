'use client';

import SideBar from '@/app/ui/components/user/sidenav';
import Header from '@/app/ui/components/general/genheader';
import { useAuth } from '@/app/lib/firebase/auth/authcontext';
import { useUserProfile } from '@/app/lib/hooks/userprofile';
import { usePathname } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const pathname = usePathname();
  const { profile } = useUserProfile(user?.uid || '');

  const userIdFromPath = pathname.split('/')[2];
  const isVisitor = user?.uid !== userIdFromPath;

  return (
    <div className="flex min-h-screen">
      {isVisitor && <Header />} 
      {!isVisitor && <SideBar />} 
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        {children}
      </div>
    </div>
  );
}
