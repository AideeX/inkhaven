import { uploadImage } from "@/app/lib/cloudinary";
import Image from "next/image";

type CoverImageUploaderProps = {
    coverImageUrl: string | null;
    setCoverImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
    mode: "edit" | "publish";
};

const CoverImageUploader: React.FC<CoverImageUploaderProps> = ({ coverImageUrl, setCoverImageUrl, mode }) => {
    const handleCoverImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const imageUrl = await uploadImage(file);
                setCoverImageUrl(imageUrl);
                console.log("Cover image uploaded:", imageUrl);
            } catch (error) {
                console.error("Failed to upload cover image:", error);
            }
        }
    };

    const handleRemoveImage = () => {
        setCoverImageUrl(null);
    };

    const imageClass = mode === "edit" ? "max-w-[200px] h-auto" : "max-w-full h-auto"; // Reduced size for edit mode

    return (
        <div className="mb-6">
            {mode === "edit" && (
                <>
                    <input
                        type="file"
                        id="cover-image"
                        accept="image/*"
                        onChange={handleCoverImageUpload}
                        className="hidden"
                    />
                    <label
                        htmlFor="cover-image"
                        className="cursor-pointer text-sm font-medium text-light-text dark:text-dark-text border border-light-accentLight dark:border-dark-accentLight rounded-lg py-2 px-4 hover:border-light-accentMedium dark:hover:border-dark-accentMedium focus:border-light-accentMedium dark:focus:border-dark-accentMedium"
                        title="Recommended size: 1200x600px"
                    >
                        {coverImageUrl ? "Change Image" : "Add Cover Image"}
                    </label>
                    {coverImageUrl && (
                        <button onClick={handleRemoveImage} className="ml-4 text-red-500 text-sm">
                            Remove Image
                        </button>
                    )}
                </>
            )}
            {coverImageUrl && <Image width={200} height={200} src={coverImageUrl} alt="Cover" className={`mt-4 ${imageClass} rounded-lg shadow-lg`} />}
        </div>
    );
};

export default CoverImageUploader;
