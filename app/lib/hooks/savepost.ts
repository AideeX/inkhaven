'use client';

import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase/config";
import { useAuth } from '@/app/lib/firebase/auth/authcontext';

const generateKeywords = (title: string, tags: string[], content: string): string[] => {
    const titleKeywords = title.toLowerCase().split(' ');
    const tagKeywords = tags.map(tag => tag.toLowerCase());

    const contentKeywords = content
        .split(' ')
        .slice(0, 20)
        .map(word => word.toLowerCase());

    const allKeywords = [...titleKeywords, ...tagKeywords, ...contentKeywords];
    return Array.from(new Set(allKeywords));
};

export const useFirestoreSave = () => {
    const { user } = useAuth();

    const saveToFirestore = async (
        collection: string,
        data: { postId?: string, postTitle: string, content: string, tags: string[], [key: string]: any }
    ) => {
        try {
            const documentId = data.postId || new Date().getTime().toString(); 
            const docRef = doc(db, collection, documentId);

            const postTitleLowercase = data.postTitle.toLowerCase();
            const contentLowercase = data.content.toLowerCase();
            const tagsLowercase = data.tags.map(tag => tag.toLowerCase());

            const keywords = generateKeywords(data.postTitle, data.tags, data.content);

            const postData = {
                ...data,
                postTitle_lowercase: postTitleLowercase,
                content_lowercase: contentLowercase,
                tags_lowercase: tagsLowercase,
                keywords,
                authorId: user?.uid || 'Anonymous',
                authorName: user?.displayName || 'Anonymous',
                authorName_lowercase: user?.displayName?.toLowerCase() || 'anonymous',
                createdAt: data.postId ? data.createdAt : new Date(),
                updatedAt: new Date(),
            };

            if (data.postId) {
                await updateDoc(docRef, postData);

                const analyticsDocRef = doc(db, "analytics", documentId);
                await updateDoc(analyticsDocRef, {
                    postTitle: postData.postTitle,
                });
            } else {
                await setDoc(docRef, postData);

                if (collection === "posts") {
                    const analyticsDocRef = doc(db, "analytics", documentId);
                    await setDoc(analyticsDocRef, {
                        postId: documentId,
                        postTitle: postData.postTitle,
                        views: 0,
                        likes: 0,
                        comments: 0,
                        bookmarks: 0,
                        shares: 0,
                    });
                }
            }

            console.log("Data saved successfully to Firestore");
        } catch (error) {
            console.error("Error saving data to Firestore:", error);
            throw error;
        }
    };

    return { saveToFirestore };
};

export const updateGlobalTagsCollection = async (tags: string[]) => {
    try {
        await Promise.all(tags.map(async (tag) => {
            const tagDocRef = doc(db, "tags", tag.toLowerCase());
            await setDoc(tagDocRef, { name: tag }, { merge: true });
        }));
    } catch (error) {
        console.error("Error updating tags collection:", error);
        throw error;
    }
};
