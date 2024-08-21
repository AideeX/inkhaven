'use client';

import { useAuth } from '@/app/lib/firebase/auth/authcontext';
import { uploadImage } from '@/app/lib/cloudinary';
import { useUserProfile } from '@/app/lib/hooks/userprofile';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import md5 from 'md5';
import { Box } from '@chakra-ui/react';
import { ProfileSkeleton } from '@/app/ui/skeletons';
import { useRouter } from 'next/navigation';
import { getAuth, updateProfile as updateFirebaseProfile } from 'firebase/auth';

const EditProfile: React.FC = () => {
    const { user, setUser } = useAuth();  
    const router = useRouter();
    const { profile, loading: profileLoading, updateProfile } = useUserProfile(user?.uid || '');
    const [gravatarUrl, setGravatarUrl] = useState<string | null>(null);
    const [useGravatar, setUseGravatar] = useState(false); 
    const [profileData, setProfileData] = useState({
        displayName: '',
        username: '',
        bio: '',
        photoURL: '',
    });
    const [displayChoice, setDisplayChoice] = useState({
        useDisplayName: false,
        useUsername: false,
    });
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if (profile) {
            setProfileData({
                displayName: profile.displayName,
                username: profile.username || '',
                bio: profile.bio,
                photoURL: profile.photoURL || '',
            });
            setDisplayChoice({
                useDisplayName: profile.displayChoice?.useDisplayName || false,
                useUsername: profile.displayChoice?.useUsername || false,
            });
        }
    }, [profile]);

    useEffect(() => {
        if (user?.email && useGravatar) {
            const hash = md5(user.email.trim().toLowerCase());
            setGravatarUrl(`https://www.gravatar.com/avatar/${hash}?d=identicon`);
        }
    }, [user?.email, useGravatar]);

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        let photoURL = profileData.photoURL;

        if (file) {
            photoURL = await uploadImage(file);
        }

        if (!useGravatar) {
            setGravatarUrl(null);
        }

        try {
            await updateProfile({
                displayName: profileData.displayName,
                username: profileData.username,
                bio: profileData.bio,
                photoURL: useGravatar && gravatarUrl ? gravatarUrl : photoURL,
                displayChoice,
            });

            const auth = getAuth();
            await updateFirebaseProfile(auth.currentUser!, {
                displayName: profileData.displayName,
                photoURL: useGravatar && gravatarUrl ? gravatarUrl : photoURL,
            });

            setUser(auth.currentUser);

           
            setProfileData({ displayName: '', username: '', bio: '', photoURL: '' });
            setDisplayChoice({ useDisplayName: false, useUsername: false });
            setFile(null);
            setUseGravatar(false);

            alert('Profile updated successfully');
            router.push(`/home/${user?.uid}/user/profile`);
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        }
    };

    if (profileLoading) {
        return <ProfileSkeleton />;
    }

    return (
        <Box className="container mx-auto mt-8 p-4 bg-light-secondaryBg dark:bg-dark-secondaryBg rounded-xl shadow-3xl">
            <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <Image
                        src={file ? URL.createObjectURL(file) : profileData.photoURL || gravatarUrl || '/default-profile.png'}
                        alt="Profile Picture"
                        width={80}
                        height={80}
                        className="rounded-full"
                    />
                    <div>
                        <label className="block text-sm font-medium text-light-text dark:text-dark-text">Upload New Profile Picture</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                            className="mt-1 block w-full text-sm text-light-text dark:text-dark-text  file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-light-buttonDefault dark:file:bg-dark-buttonDefault hover:file:bg-light-buttonHover dark:hover:file:bg-dark-buttonHover" disabled={useGravatar}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-text">Display Name</label>
                    <input
                        type="text"
                        value={profileData.displayName}
                        onChange={(e) => setProfileData({ ...profileData, displayName: e.target.value })}
                        className="mt-1 p-2 border border-light-accentLight dark:border-dark-accentLight rounded-md w-full"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-text">Username</label>
                    <input
                        type="text"
                        value={profileData.username}
                        onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                        className="mt-1 p-2 border border-light-accentLight dark:border-dark-accentLight rounded-md w-full"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-text">Bio</label>
                    <textarea
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        className="mt-1 p-2 border border-light-accentLight dark:border-dark-accentLight rounded-md w-full"
                    />
                </div>

                <div className="mt-4 space-y-2">
                    <label className="block text-sm font-medium text-light-text dark:text-dark-text">Display Options</label>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            checked={displayChoice.useDisplayName}
                            onChange={(e) => setDisplayChoice({ ...displayChoice, useDisplayName: e.target.checked })}
                            className="form-checkbox"
                        />
                        <span className="ml-2 text-light-text dark:text-dark-text">Use Display Name</span>
                    </label>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            checked={displayChoice.useUsername}
                            onChange={(e) => setDisplayChoice({ ...displayChoice, useUsername: e.target.checked })}
                            className="form-checkbox"
                        />
                        <span className="ml-2 text-light-text dark:text-dark-text">Use Username</span>
                    </label>
                </div>

                <div>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            checked={useGravatar}
                            onChange={(e) => setUseGravatar(e.target.checked)}
                            className="form-checkbox"
                        />
                        <span className="ml-2 text-light-text dark:text-dark-text">Use Gravatar</span>
                    </label>
                </div>

                <button
                    type="submit"
                    className="px-4 py-2 bg-light-buttonDefault dark:bg-dark-buttonDefault text-white rounded hover:bg-light-buttonHover dark:hover:bg-dark-buttonHover w-full sm:w-auto"
                >
                    Update Profile
                </button>
            </form>
        </Box>
    );
};

export default EditProfile;
