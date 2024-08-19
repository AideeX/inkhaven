import { getAuth, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/app/lib/firebase/config';

export async function updateProfileData(uid: string, profileData: { displayName: string, photoURL: string, bio: string }) {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user && uid) {
        await updateProfile(user, {
            displayName: profileData.displayName,
            photoURL: profileData.photoURL,
        });

        const userDocRef = doc(db, 'users', uid);
        await setDoc(userDocRef, {
            bio: profileData.bio,
            displayName: profileData.displayName,
            photoURL: profileData.photoURL,
        }, { merge: true });
    }
}
