'use client';

import { Editor } from "@toast-ui/react-editor";
import { useRef, useState } from "react";
import { useAuth } from "@/app/lib/firebase/auth/authcontext";
import { useRouter } from "next/navigation";
import { useFirestoreSave, updateGlobalTagsCollection } from "@/app/lib/hooks/savepost"; 
import PostTitleInput from "@/app/ui/components/editor/posttitle";
import EditorComponent from "@/app/ui/components/editor/editor";
import TagsManager from "@/app/ui/components/editor/tagsmanager";
import CoverImageUploader from "@/app/ui/components/editor/coverimage";
import SaveButtons from "@/app/ui/components/editor/savebuttons";

const ContentEditor: React.FC = () => {
    const editorRef = useRef<Editor>(null);
    const { user: currentUser, role } = useAuth(); 
    const { saveToFirestore } = useFirestoreSave(); 
    const router = useRouter(); 

    const [postTitle, setPostTitle] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isFeatured, setIsFeatured] = useState(false); 

    const handleSave = async (status: "draft" | "published") => {
        if (editorRef.current && currentUser) {
            console.log("Post Title before save:", postTitle);
            const editorInstance = editorRef.current.getInstance();
            const contentMarkdown = editorInstance.getMarkdown();
            const contentHTML = editorInstance.getHTML(); 

            try {
                setIsSaving(true);

                await saveToFirestore("posts", {
                    postTitle,
                    content: contentMarkdown, 
                    coverImageUrl,
                    contentHTML,
                    contentFormat: "markdown_html",
                    authorId: currentUser.uid,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    status,
                    tags,
                    isFeatured: role === "admin" ? isFeatured : false, 
                });

                await updateGlobalTagsCollection(tags);

                if (status === "published") {
                    router.push('/home');
                } else if (status === "draft") {
                    router.push(`/home/${currentUser.uid}/user/content?tab=drafts`);
                }

                console.log("Post and tags saved successfully");
            } catch (error) {
                console.error("Failed to save post and tags:", error);
            } finally {
                setIsSaving(false);
            }
        } else {
            console.error("User not authenticated or editor not ready");
        }
    };

    return (
        <div className="container mx-auto mt-8 w-full md:w-2/3 bg-light-primary dark:bg-dark-primary p-4 md:p-8 rounded-lg shadow-lg text-light-text dark:text-dark-text">
            <CoverImageUploader coverImageUrl={coverImageUrl} setCoverImageUrl={setCoverImageUrl} mode="edit" />
            <PostTitleInput postTitle={postTitle} setPostTitle={setPostTitle} />
            <TagsManager tags={tags} setTags={setTags} />
            {role === "admin" && (
                <div className="mb-4">
                    <label className="inline-flex items-center">
                        <input 
                            type="checkbox" 
                            className="form-checkbox" 
                            checked={isFeatured} 
                            onChange={(e) => setIsFeatured(e.target.checked)} 
                        />
                        <span className="ml-2">Feature this post</span>
                    </label>
                </div>
            )}
            <EditorComponent editorRef={editorRef} isDarkMode={false} />
            <SaveButtons handleSave={handleSave} isSaving={isSaving} />
        </div>
    );
};

export default ContentEditor;