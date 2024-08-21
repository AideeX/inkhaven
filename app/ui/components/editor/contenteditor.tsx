'use client';

import { Editor } from "@toast-ui/react-editor";
import { useRef, useState, useEffect } from "react";
import { useAuth } from "@/app/lib/firebase/auth/authcontext";
import { useRouter, useParams } from "next/navigation";
import { useFirestoreSave, updateGlobalTagsCollection } from "@/app/lib/hooks/savepost"; 
import { doc, getDoc, updateDoc } from "firebase/firestore"; 
import { db } from "@/app/lib/firebase/config";
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
    const { id } = useParams(); 

    const [postTitle, setPostTitle] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isFeatured, setIsFeatured] = useState(false); 
    const [isEditing, setIsEditing] = useState(false); 

    useEffect(() => {
        const fetchPostData = async () => {
            if (id) { 
                setIsEditing(true);
                const postRef = doc(db, "posts", id.toString()); 
                const postDoc = await getDoc(postRef);
                if (postDoc.exists()) {
                    const postData = postDoc.data();
                    setPostTitle(postData.postTitle);
                    setTags(postData.tags || []);
                    setCoverImageUrl(postData.coverImageUrl || null);
                    setIsFeatured(postData.isFeatured || false);
                    editorRef.current?.getInstance().setMarkdown(postData.content || "");
                } else {
                    console.error("Post not found");
                }
            }
        };

        fetchPostData();
    }, [id]);

    const handleSave = async (status: "draft" | "published") => {
        if (editorRef.current && currentUser) {
            const editorInstance = editorRef.current.getInstance();
            const contentMarkdown = editorInstance.getMarkdown();
            const contentHTML = editorInstance.getHTML(); 

            try {
                setIsSaving(true);

                const postData = {
                    postTitle,
                    content: contentMarkdown, 
                    coverImageUrl,
                    contentHTML,
                    contentFormat: "markdown_html",
                    authorId: currentUser.uid,
                    updatedAt: new Date(),
                    status,
                    tags,
                    isFeatured: role === "admin" ? isFeatured : false, 
                };

                if (isEditing) {
                    const postRef = doc(db, "posts", id?.toString());
                    await updateDoc(postRef, postData);
                } else {
                    await saveToFirestore("posts", postData);
                }

                await updateGlobalTagsCollection(tags);

                router.push('/home'); 

            } catch (error) {
                console.error("Failed to save post:", error);
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
