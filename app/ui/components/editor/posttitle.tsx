type PostTitleInputProps = {
    postTitle: string;
    setPostTitle: React.Dispatch<React.SetStateAction<string>>;
};

const PostTitleInput: React.FC<PostTitleInputProps> = ({ postTitle, setPostTitle }) => (
    <input
        type="text"
        placeholder="Post title..."
        value={postTitle}
        onChange={(e) => setPostTitle(e.target.value)}
        className="w-full text-3xl font-bold text-light-heading dark:text-dark-heading bg-transparent border-b-2 border-light-accentLight dark:border-dark-accentLight mb-4 outline-none focus:border-light-accentMedium dark:focus:border-dark-accentMedium"
    />
);

export default PostTitleInput;
