import { literata } from '@/app/ui/styles/fonts';
import Link from 'next/link';

export default function AboutSnippet() {
  return (
    <section id="about" className="bg-light-secondaryBg p-6 md:p-8 shadow-lg mt-8 rounded-lg">
      <h2 className={`text-2xl md:text-3xl font-bold text-light-heading mb-4 text-center ${literata.className}`}>
        About InkHaven
      </h2>
      <p className="text-base md:text-lg text-light-text mb-4">
        InkHaven is a sanctuary for book lovers in the digital age. Amidst the whirlwind of visual media, InkHaven celebrates the timeless power of the written word. Dive into a world where readers and writers connect, create, and cherish text-based content.
      </p>
      <div className="text-center md:text-right">
        <Link href="/about" className="text-light-linkDefault hover:text-light-linkHover transition duration-200">
          Read More...
        </Link>
      </div>
    </section>
  );
}
