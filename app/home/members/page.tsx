import AllMembers from "@/app/ui/components/home/allmembers";
import Link from 'next/link';
import { FaArrowLeftLong } from "react-icons/fa6";

export default function MembersPage() {
    return (
        <div className="bg-light-primary dark:bg-dark-primary min-h-screen">
            <div className=" mx-auto p-4">
                <div className="flex items-center mb-4 mr-20">
                    <Link href="/home" className="mr-8 hover:scale-105 transition-transform duration-300 ease-in-out">
                        <FaArrowLeftLong color="#5A2EFF" size={36} className="mr-8"/>
                    </Link>
                </div>
                <AllMembers />
            </div>
        </div>
    )
}
