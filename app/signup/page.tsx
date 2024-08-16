import SignUpForm from "../ui/components/forms/signup";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";


export default function SignUpPage() {
  return (
    <div className="max-h-screen overflow-auto p-4">
        <Link href="/" className="ml-4 hover:scale-105 transition-transform duration-300 ease-in-out">
          <FaArrowLeftLong color="#5A2EFF" size={36} />
        </Link>
      <SignUpForm />
    </div>
  );
}
