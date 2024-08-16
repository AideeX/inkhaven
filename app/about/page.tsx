import { literata } from "@/app/ui/styles/fonts";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function About() {
  return (
    <div className="bg-gradient-to-r from-light-secondaryBg via-light-primary to-light-secondaryBg p-8 min-h-screen">
      <div className="w-6 mb-4">
        <Link href="/" className="hover:scale-105 transition-transform duration-300 ease-in-out">
          <FaArrowLeftLong color="#5A2EFF" size={36} />
        </Link>
      </div>
      <section className="bg-light-secondaryBg p-8 shadow-lg rounded-lg mt-8 max-w-4xl mx-auto">
        <h2 className={`text-3xl font-bold text-light-heading mb-6 text-center ${literata.className}`}>
          About InkHaven
        </h2>
        <p className="text-lg text-light-text mb-6">
          Welcome to InkHaven, a sanctuary for traditional bookworms in the digital age. Amidst the swirl of pictures, reels, TikToks, and the chase for likes and comments, InkHaven stands as a steadfast haven for text-based content. Here, the written word reigns supreme, offering a space where readers and authors alike can immerse themselves in the beauty of language and storytelling.
        </p>
        <p className="text-lg text-light-text mb-6">
                 <strong className="transition-colors duration-200 hover:text-light-accentMedium">For Readers:</strong> Discover a treasure trove of books, articles, and essays that cater to your literary tastes. Whether you&apos;re a fan of classic literature, contemporary fiction, or insightful non-fiction, InkHaven provides a diverse range of text-based content for your reading pleasure. Our intuitive platform makes it easy to find your next favorite read, connect with fellow book lovers, and share your thoughts on the works that move you.
        </p>
        <p className="text-lg text-light-text mb-6">
          <strong className="transition-colors duration-200 hover:text-light-accentMedium">For Authors:</strong> InkHaven is your creative playground. Write, publish, and share your stories with a community that values the art of writing. Our tools and resources support you at every stage of your creative journey, from drafting to publication. Engage with your readers, receive feedback, and grow your audience in a space dedicated to the written word.
        </p>
        <p className="text-lg text-light-text mb-6">
          <strong className="transition-colors duration-200 hover:text-light-accentMedium">Our Mission:</strong> At InkHaven, we believe in the enduring power of text. Our mission is to foster a community where the love of reading and writing thrives, unencumbered by the distractions of visual media. We are committed to providing a platform that honors and elevates the craft of writing, creating a space where the written word can be celebrated in all its forms.
        </p>
        <p className="text-lg text-light-text mb-6">
          Join us at InkHaven, where every word matters.
        </p>
      </section>
    </div>
  );
}
