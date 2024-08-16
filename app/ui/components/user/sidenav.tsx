import  NavLinks  from "@/app/ui/components/user/navlinks";
import Image from "next/image";
import Link from "next/link";
import { SignOutButton } from "../general/buttons";

export default function Sidebar() {
    return (
      <aside className="w-64 p-4 bg-light-primary dark:bg-dark-primary h-full">
        <div>
        <Link href="/home">
                <Image src="/lightmode.svg" alt="Inkhaven logo for light mode" width={150} height={75} priority={true} className="dark:hidden"/>
                <Image src="/darkmode.svg" alt="Inkhaven logo for dark mode" width={150} height={75} priority={true} className="hidden dark:block"/>
            </Link>
        </div>
        <NavLinks />
        <div>
            <SignOutButton />
        </div>
      </aside>
    );
  }
  