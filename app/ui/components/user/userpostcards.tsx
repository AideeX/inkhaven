'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/app/lib/firebase/auth/authcontext';
import { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; 
import { literata } from '@/app/ui/styles/fonts';
import { useRouter } from 'next/navigation';
import { doc, deleteDoc } from "firebase/firestore"; 
import { db } from "@/app/lib/firebase/config";

type UserPost = {
    id: string;
    title: string;
    content: string;
    coverImageUrl?: string;
    createdAt: Date;
    tags?: string[];
    isDraft?: boolean;
    authorId?: string; 
};

const generateExcerpt = (content: string | undefined, length: number = 100) => {
    if (typeof content !== 'string') {
        return '';
    }
    return content.length > length ? content.substring(0, length) + '...' : content;
};

const UserPostCard: React.FC<{ post: UserPost }> = ({ post }) => {
    const { user } = useAuth();
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        const confirmDelete = confirm("Are you sure you want to delete this post?");
        if (confirmDelete && user) {
            setIsDeleting(true);
            try {
                await deleteDoc(doc(db, "posts", post.id));
                alert("Post deleted successfully");
                router.refresh(); 
            } catch (error) {
                console.error("Error deleting post:", error);
                alert("Failed to delete post");
            } finally {
                setIsDeleting(false);
            }
        }
    };

    const handleEdit = () => {
        router.push(`/home/${post.id}/edit`);
    };

    const excerpt = generateExcerpt(post.content);

    return (
        <div className="p-4 bg-light-secondaryBg dark:bg-dark-secondaryBg border border-light-accentLight dark:border-dark-accentLight rounded-lg shadow-md transition-shadow hover:shadow-lg w-full flex items-center relative mb-4">
            <div className="w-24 h-24 flex-shrink-0 flex items-center justify-center">
                {post.coverImageUrl ? (
                    <Image
                        src={post.coverImageUrl}
                        alt={post.title}
                        width={80}
                        height={80}
                        quality={100}
                        className="object-cover rounded-lg w-full h-full"
                    />
                ) : (
                    <div className="w-full h-full bg-light-primary dark:bg-dark-primary rounded-lg"></div>
                )}
            </div>
            <div className="flex flex-col justify-center flex-grow ml-4 min-w-0">
                <div>
                    <h5 className={`text-base md:text-lg font-bold mb-1 ${literata.className} text-light-heading dark:text-dark-heading truncate`}>
                        {post.title}
                    </h5>
                    <p className="text-xs md:text-sm text-light-text dark:text-dark-text mb-2 line-clamp-2">
                        {excerpt}
                    </p>
                </div>

                {post.tags && (
                    <div className="flex flex-wrap gap-1 md:gap-2 mb-2">
                        {post.tags.map((tag) => (
                            <span key={tag} className="text-xs md:text-sm bg-light-accentLight dark:bg-dark-accentLight text-light-text dark:text-dark-text px-2 py-1 rounded truncate">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                <div className="flex justify-end mt-auto space-x-2">
                    {user && user.uid === post.authorId && (
                        <>
                            <button
                                onClick={handleEdit}
                                className="text-xs md:text-sm text-light-accentMedium dark:text-dark-accentMedium hover:underline flex items-center"
                            >
                                <FaEdit className="mr-1" />
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                className="text-xs md:text-sm text-red-500 hover:underline flex items-center"
                                disabled={isDeleting}
                            >
                                <FaTrashAlt className="mr-1" />
                                {isDeleting ? 'Deleting...' : 'Delete'}
                            </button>
                        </>
                    )}
                    {!post.isDraft && (
                        <Link href={`/home/${post.id}/post`} className="text-xs md:text-sm text-light-accentMedium dark:text-dark-accentMedium hover:underline">
                            Read more
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserPostCard;
