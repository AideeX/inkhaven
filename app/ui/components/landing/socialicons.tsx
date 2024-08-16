import Link from 'next/link';
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

const socialLinks = [
    { name: "LinkedIn", href: "https://www.linkedin.com", icon: FaLinkedin },
    { name: "Twitter", href: "https://www.twitter.com", icon: FaTwitter },
    { name: "Facebook", href: "https://www.facebook.com", icon: FaFacebook },
    { name: "Instagram", href: "https://www.instagram.com", icon: FaInstagram },
];

export function SocialIcons() {
    return (
        <div className="flex justify-center space-x-6 mt-4 lg:mt-0">
            {socialLinks.map(({ name, href, icon: Icon }) => (
                <Link key={name} href={href} passHref target="_blank" rel="noopener noreferrer" aria-label={name} className="text-light-heading hover:text-light-accentMedium transition duration-300 ease-in-out transform hover:scale-105">
                    <Icon size={30} />
                </Link>
            ))}
        </div>
    );
};