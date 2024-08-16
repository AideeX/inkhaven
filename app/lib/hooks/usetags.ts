'use client';

import { useMemo } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/app/lib/firebase/config";
import useSWR from "swr";


const capitalizeTag = (tag: string): string => {
    return tag
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

const fetchTags = async (): Promise<string[]> => {
    const tagsSnapshot = await getDocs(collection(db, "tags"));
    return tagsSnapshot.docs.map(doc => capitalizeTag(doc.id)); 
};

export const useTags = () => {
    const { data: fetchedTags = [], error } = useSWR<string[]>('tags', fetchTags);


    const fixedTags = useMemo(() => [
        "JavaScript", 
        "React", 
        "Next.js", 
        "Firebase", 
        "TailwindCSS", 
        "Health", 
        "Finance"
    ], []);

    const availableTags = useMemo(() => {
        const allTags = new Set([...fixedTags, ...fetchedTags]);
        return Array.from(allTags);
    }, [fixedTags, fetchedTags]);

    return { availableTags, error };
};
