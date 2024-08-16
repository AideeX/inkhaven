'use client';

import { useState } from "react";

type TagsManagerProps = {
    tags: string[];
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
};

const TagsManager: React.FC<TagsManagerProps> = ({ tags, setTags }) => {
    const [tagInput, setTagInput] = useState("");

    const handleTagInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTagInput(event.target.value);
    };

    const handleAddTag = () => {
        const trimmedTag = tagInput.trim();
        if (trimmedTag && !tags.includes(trimmedTag)) {
            const capitalizedTag = trimmedTag.charAt(0).toUpperCase() + trimmedTag.slice(1);
            setTags([...tags, capitalizedTag]);
            setTagInput(""); 
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" || event.key === ",") {
            event.preventDefault();
            handleAddTag();
        }
    };

    return (
        <div className="mb-6">
            <input
                type="text"
                id="tags"
                value={tagInput}
                onChange={handleTagInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Add your tags..."
                className="w-full p-2 text-sm border-b-2 border-light-accentLight dark:border-dark-accentLight bg-transparent outline-none focus:border-light-accentMedium dark:focus:border-dark-accentMedium"
            />
            <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <span
                        key={tag}
                        className="inline-block bg-light-secondaryBg dark:bg-dark-secondaryBg text-light-text dark:text-dark-text text-sm font-medium py-1 px-2 rounded-lg"
                    >
                        {tag}
                        <button onClick={() => handleRemoveTag(tag)} className="ml-2 text-red-500">
                            x
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default TagsManager;
