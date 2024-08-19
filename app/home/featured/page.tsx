
import MobileFeatured from "@/app/ui/components/home/mobilefeatured";
import Link from 'next/link';
import { FaArrowLeftLong } from "react-icons/fa6";

export default function Featured(){
    return (
        <div>
            <div className="flex items-center mb-4 ml-8">
                    <Link href="/home" className="mr-8 hover:scale-105 transition-transform duration-300 ease-in-out">
                        <FaArrowLeftLong color="#5A2EFF" size={36} className="mr-8"/>
                    </Link>
                </div>
            <MobileFeatured />
        </div>
    )
}