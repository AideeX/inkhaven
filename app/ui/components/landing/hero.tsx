import { GetStartedButton } from "@/app/ui/components/general/buttons";
import { playfairDisplay, greatVibes } from "@/app/ui/styles/fonts";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative h-screen flex w-full mt-4">
      <section className="relative flex flex-col md:flex-row w-full h-full items-center justify-between px-4 md:px-8">
        <div className="z-10 flex flex-col justify-center h-full md:w-1/2 space-y-4 text-center md:text-left">
          <h1 className={`text-3xl md:text-5xl font-bold text-light-heading ${playfairDisplay.className} drop-shadow-xl`}>
            Welcome to InkHaven
          </h1>
          <h2 className={`text-3xl md:text-5xl text-light-heading ${greatVibes.className} drop-shadow-xl`}>
            Where words come alive...
          </h2>
          <p className="text-lg md:text-xl text-light-text drop-shadow-lg">
            Ink your imagination and discover your next great read.
          </p>
          <div className="pt-4 py-2 md:py-3 px-4 md:px-6 text-sm md:text-base">
            <GetStartedButton />
          </div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row h-full md:w-1/2 items-center justify-center space-x-0 md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex flex-col space-y-4">
            <Image
              src="/hero-image.svg"
              width={300}
              height={400}
              className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 hidden md:block"
              alt="A cozy reading nook with soft lights and lots of books."
              priority={true}
            />
            <Image
              src="/networking2-hero.svg"
              width={250}
              height={350}
              className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 hidden md:block"
              alt="A cozy networking event."
              loading="lazy"
            />
          </div>
          <div className="flex flex-col space-y-4">
            <Image
              src="/library-hero.svg"
              width={300}
              height={400}
              className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              alt="A cozy library full of books."
              loading="lazy"
            />
            <Image
              src="/networking1-hero.svg"
              width={300}
              height={500}
              className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 hidden md:block"
              alt="People networking at an event."
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}