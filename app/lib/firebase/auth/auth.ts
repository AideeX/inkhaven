import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup, 
    FacebookAuthProvider, 
    TwitterAuthProvider, 
    UserCredential, 
    sendPasswordResetEmail as firebaseSendPasswordResetEmail, 
    fetchSignInMethodsForEmail as firebaseFetchSignInMethodsForEmail, 
    updateProfile
} from 'firebase/auth';
import { auth, db } from '@/app/lib/firebase/config';
import { doc, setDoc, getDoc } from "firebase/firestore";

export const signUpWithEmail = async (email: string, password: string, firstName: string, lastName: string, termsAccepted: boolean): Promise<UserCredential> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const fullName = `${firstName} ${lastName}`;

        await updateProfile(user, { displayName: fullName });

        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: user.email,
            displayName: fullName,
            termsAccepted,
            createdAt: new Date(),
            role: "user",
        });

        return userCredential;
    } catch (error) {
        console.error("Error signing up with email: ", error);
        throw error;
    }
};

export const signInWithEmail = async (email: string, password: string): Promise<UserCredential> => {
    try {
        return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error("Error signing in with email: ", error);
        throw error;
    }
};

export const signInWithGoogle = async (): Promise<UserCredential> => {
    const provider = new GoogleAuthProvider();
    try {
        const userCredential = await signInWithPopup(auth, provider);
        const user = userCredential.user;


        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            await setDoc(userDocRef, {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                createdAt: new Date(),
                role: "user",
            });
        }

        return userCredential;
    } catch (error) {
        console.error("Error signing in with Google: ", error);
        throw error;
    }
};



export const signInWithFacebook = async (): Promise<UserCredential> => {
    const provider = new FacebookAuthProvider();
    try {
        const userCredential = await signInWithPopup(auth, provider);
        const user = userCredential.user;

    
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            await setDoc(userDocRef, {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                createdAt: new Date(),
                role: "user",
            });
        }

        return userCredential;
    } catch (error) {
        console.error("Error signing in with Facebook: ", error);
        throw error;
    }
};



export const signInWithTwitter = async (): Promise<UserCredential> => {
    const provider = new TwitterAuthProvider();
    try {
        const userCredential = await signInWithPopup(auth, provider);
        const user = userCredential.user;

        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            await setDoc(userDocRef, {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                createdAt: new Date(),
                role: "user",
            });
        }

        return userCredential;
    } catch (error) {
        console.error("Error signing in with Twitter: ", error);
        throw error;
    }
};


export const fetchSignInMethodsForEmail = async (email: string): Promise<string[]> => {
    try {
        return await firebaseFetchSignInMethodsForEmail(auth, email);
    } catch (error) {
        console.error("Error fetching sign-in methods for email: ", error);
        throw error;
    }
};

export const sendPasswordResetEmail = async (email: string): Promise<void> => {
    try {
        const signInMethods = await fetchSignInMethodsForEmail(email);
        
        if (signInMethods.length === 0) {
            throw new Error("This email isn't registered on InkHaven");
        }

        await firebaseSendPasswordResetEmail(auth, email);
        console.log("Password reset email sent successfully");
    } catch (error) {
        console.error("Error sending password reset email: ", error);
        throw error;
    }
};
