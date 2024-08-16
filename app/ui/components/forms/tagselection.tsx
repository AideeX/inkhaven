'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase/config";
import { useAuth } from "@/app/lib/firebase/auth/authcontext";
import Link from "next/link";
import { useTags } from "@/app/lib/hooks/usetags";
import TagList from "@/app/ui/components/forms/tagslist";
import { TagSelectionSkeleton } from "@/app/ui/skeletons";
import { literata } from "@/app/ui/styles/fonts";

const TagSelectionForm: React.FC = () => {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const { user: currentUser } = useAuth();
    const router = useRouter();

    const { availableTags, error } = useTags();

    const handleTagClick = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser) {
            console.error("User not authenticated");
            return;
        }

        setLoading(true);

        try {
            const userDocRef = doc(db, "users", currentUser.uid);
            await setDoc(userDocRef, { tags: selectedTags }, { merge: true });

            setLoading(false);
            router.push("/home");
        } catch (error) {
            console.error("Error saving tags:", error);
            setLoading(false);
        }
    };

    if (error) {
        return <div>Error loading tags</div>;
    }

    if (!availableTags.length) {
        return <TagSelectionSkeleton />;
    }

    return (
      <form onSubmit={handleSubmit} className="p-6 bg-light-secondaryBg rounded-xl shadow-3xl max-w-lg w-full mx-auto mt-10 sm:mt-20">
      <h4 className={`text-2xl font-bold mb-6 text-light-heading text-center ${literata.className}`}>
              Tell Us What You&apos;ll Like To See
      </h4>
      <div className="flex justify-end mb-4">
        <Link href='/home' className="text-light-linkDefault hover:text-light-linkHover">
          Skip
        </Link>
      </div>
      <TagList
        tags={availableTags}
        selectedTags={selectedTags}
        onTagClick={handleTagClick}
      />
      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="p-2 bg-light-buttonDefault text-light-primary rounded hover:bg-light-buttonHover disabled:bg-light-buttonDisabled"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Preferences"}
        </button>
      </div>
    </form>
    

    );
};

export default TagSelectionForm;
