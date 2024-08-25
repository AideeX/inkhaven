import Header from '@/app/ui/components/landing/header';
import { HeroWrapper, AboutWrapper, FeaturesWrapper} from '@/app/ui/wrappers';
import Footer from '@/app/ui/components/landing/footer';
import BackToTopButton from '@/app/ui/components/general/backtotop';

export default function Home() {
  return (
    <div className="bg-light-primary h-full">
      <Header />
      <main className="flex flex-col h-screen px-2">
        <HeroWrapper data-testid="hero-wrapper" />
        <section className="mt-8">
          <AboutWrapper data-testid="about-wrapper" />
        </section>
        <section className="mt-8">
          <FeaturesWrapper data-testid="features-wrapper" />
        </section>
        <Footer />
      </main>
      <BackToTopButton />
    </div>
  );
}