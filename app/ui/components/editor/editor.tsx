import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import styles from "@/app/ui/styles/editor.module.css"; 
import { uploadImage } from "@/app/lib/cloudinary";

type EditorComponentProps = {
    editorRef: React.RefObject<Editor>;
    isDarkMode: boolean; 
};

const EditorComponent: React.FC<EditorComponentProps> = ({ editorRef, isDarkMode }) => {
    const onImageUpload = async (blob: Blob, callback: (url: string, altText?: string) => void) => {
        try {
            const fileExtension = blob.type.split("/")[1];
            const fileName = `image.${fileExtension}`;
            const file = new File([blob], fileName, { type: blob.type });
            const imageUrl = await uploadImage(file);

            const styledImageUrl = `${imageUrl}#style=width:500px;height:auto;`;
            callback(styledImageUrl, "Uploaded Image");
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    return (
        <div className={`editor-wrapper mt-6 p-4 ${isDarkMode ? 'dark-mode' : ''} bg-light-secondaryBg dark:bg-dark-secondaryBg text-light-text dark:text-dark-text rounded-lg shadow-lg`}>
            <Editor
                initialValue="Let your words come alive here..."
                theme="dark"
                previewStyle="vertical"
                height="400px"
                initialEditType="markdown"
                useCommandShortcut={true}
                ref={editorRef}
                hooks={{
                    addImageBlobHook: onImageUpload,
                }}
                className={`toast-editor ${styles.toastEditor} ${isDarkMode ? 'text-dark-text' : 'text-light-text'}`}
            />
        </div>
    );
};

export default EditorComponent;