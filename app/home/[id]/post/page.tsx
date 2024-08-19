'use client';

import PostPage from "@/app/ui/components/posts/post";
import Link from 'next/link';
import { FaArrowLeftLong } from 'react-icons/fa6';
import CommentList from "@/app/ui/components/posts/commentlist"; 
import { useParams } from 'next/navigation';

export default function Post() {
    const { id } = useParams();
    

    const postId = Array.isArray(id) ? id[0] : id;

    return (
        <div className="bg-light-primary dark:bg-dark-primary">
            <div className="w-6 mb-4 ml-7 mt-4">
                <Link href="/home" className="hover:scale-105 transition-transform duration-300 ease-in-out">
                    <FaArrowLeftLong color="#5A2EFF" size={36} />
                </Link>
            </div>
            <PostPage /> 
            <CommentList postId={postId} />
        </div>
    );
}
