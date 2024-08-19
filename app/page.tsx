import Header from '@/app/ui/components/landing/header';
import { HeroWrapper, AboutWrapper, FeaturesWrapper} from '@/app/ui/wrappers';
import Footer from '@/app/ui/components/landing/footer';
import BackToTopButton from '@/app/ui/components/general/backtotop';

export default function Home() {
  return (
    <div className="bg-light-primary h-full">
      <Header />
      <main className="flex flex-col h-screen px-2">
        <HeroWrapper />
        <section className="mt-8">
        <AboutWrapper />
        </section>
        <section className="mt-8">
          <FeaturesWrapper />
        </section>
        <Footer />
      </main>
      <BackToTopButton />
    </div>
  
  );
}
