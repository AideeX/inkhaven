import { doc, setDoc, deleteDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/app/lib/firebase/config";
import useSWR from "swr"; 

type Bookmark = {
    userId: string;
    postId: string;
    createdAt: Date;
};


export const savePostToBookmarks = async (userId: string, postId: string) => {
    try {
        const bookmarkRef = doc(collection(db, "bookmarks"), `${userId}_${postId}`);
        await setDoc(bookmarkRef, {
            userId,
            postId,
            createdAt: new Date(),
        });
        console.log("Post bookmarked successfully");
    } catch (error) {
        console.error("Error bookmarking post:", error);
        throw error;
    }
};


export const removePostFromBookmarks = async (userId: string, postId: string) => {
    try {
        const bookmarkRef = doc(db, "bookmarks", `${userId}_${postId}`);
        await deleteDoc(bookmarkRef);
        console.log("Post removed from bookmarks");
    } catch (error) {
        console.error("Error removing bookmark:", error);
        throw error;
    }
};


export const isPostBookmarked = async (userId: string, postId: string): Promise<boolean> => {
    const bookmarkRef = doc(db, "bookmarks", `${userId}_${postId}`);
    const bookmarkDoc = await getDocs(query(collection(db, 'bookmarks'), where('userId', '==', userId), where('postId', '==', postId)));
    return !bookmarkDoc.empty;
};


export const useBookmarks = (userId: string) => {
    const fetchBookmarks = async (): Promise<Bookmark[]> => {
        const bookmarksQuery = query(
            collection(db, 'bookmarks'),
            where('userId', '==', userId)
        );

        const querySnapshot = await getDocs(bookmarksQuery);
        return querySnapshot.docs.map(doc => ({
            userId: doc.data().userId,
            postId: doc.data().postId,
            createdAt: doc.data().createdAt.toDate(),
        } as Bookmark));
    };

    return useSWR(['bookmarks', userId], fetchBookmarks);
};
