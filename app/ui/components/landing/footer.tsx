import Image from "next/image";
import Link from "next/link";
import { SocialIcons } from "@/app/ui/components/landing/socialicons";
import { FooterLinks } from "@/app/ui/components/landing/footerlinks";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-light-secondaryBg via-light-primary to-light-secondaryBg py-8 shadow-lg">
      <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="flex flex-col items-center gap-2 md:gap-4 md:flex-row">
          <Link href="/" className="pt-4 hover:scale-105 transition-transform duration-300">
            <Image 
              src="/lightmode.svg" 
              alt="InkHaven Logo" 
              width={200} 
              height={70} 
              priority={true} 
              className="w-40 h-30 md:w-52 md:h-40"
            />
          </Link>
          <SocialIcons />
        </div>
        <FooterLinks />
        <div className="text-light-text text-center lg:text-right">
          &copy; {new Date().getFullYear()} InkHaven. All rights reserved.
        </div>
      </div>
    </footer>
  );
}