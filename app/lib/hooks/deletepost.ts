import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase/config";
import { mutate } from "swr";



const handleDeletePost = async (postId: string, userId: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
        try {
            await deleteDoc(doc(db, "posts", postId));
            alert("Post deleted successfully");
            
            
            mutate(`/posts/${userId}`);
        } catch (error) {
            console.error("Error deleting post:", error);
            alert("Failed to delete post");
        }
    }
};

export default handleDeletePost;
