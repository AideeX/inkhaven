import Image from "next/image";
import Link from "next/link";
import { SocialIcons } from "@/app/ui/components/landing/socialicons";
import { FooterLinks } from "@/app/ui/components/landing/footerlinks";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-light-secondaryBg via-light-primary to-light-secondaryBg py-8 shadow-lg">
      <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="hover:scale-105 transition-transform duration-300">
            <Image
              src="/lightmode.svg"
              alt="InkHaven"
              width={200}
              height={70}
              className="mb-4 lg:mb-0"
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
