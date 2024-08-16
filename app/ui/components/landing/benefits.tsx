import { literata } from "@/app/ui/styles/fonts";
import Image from "next/image";

export default function Features() {
  return (
    <section className="bg-light-primary py-12 md:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className={`text-2xl md:text-3xl font-bold text-light-heading mb-8 text-center ${literata.className}`}>
          Features
        </h2>
        <div className="flex flex-col gap-8">
          {/* Feature 1 */}
          <div className="flex flex-col md:flex-row items-center bg-light-secondaryBg p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="md:w-1/2 transition-transform duration-300 hover:scale-110 mb-4 md:mb-0">
              <Image src='/content-creation-benefits.svg' alt="Content creation illustration" width={200} height={200} className="mx-auto md:mx-0" />
            </div>
            <div className="md:w-1/2 md:ml-8 text-center md:text-left">
              <h3 className="text-lg md:text-xl font-bold text-light-heading mt-4 md:mt-0">Content Creation</h3>
              <p className="text-light-text mt-2 text-sm md:text-base">
                Empower your creativity with an easy-to-use editor that lets you focus on crafting compelling stories without technical distractions, ensuring your voice shines through.
              </p>
            </div>
          </div>
          
          {/* Feature 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center bg-light-secondaryBg p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="md:w-1/2 transition-transform duration-300 hover:scale-110 mb-4 md:mb-0 md:ml-8"> 
              <Image src='/content-discovery-benefits.svg' alt="Content discovery illustration" width={200} height={200} className="mx-auto md:mx-0" />
            </div>
            <div className="md:w-1/2 text-center md:text-left">
              <h3 className="text-lg md:text-xl font-bold text-light-heading mt-4 md:mt-0">Content Discovery</h3>
              <p className="text-light-text mt-2 text-sm md:text-base md:mr-8">
                Enhance your reading experience by finding content that resonates with your interests quickly and effortlessly, keeping you engaged and informed.
              </p>
            </div>
          </div>
          
          {/* Feature 3 */}
          <div className="flex flex-col md:flex-row items-center bg-light-secondaryBg p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="md:w-1/2 transition-transform duration-300 hover:scale-110 mb-4 md:mb-0">
              <Image src='/community-benefits.svg' alt="Community illustration" width={200} height={200} className="mx-auto md:mx-0" />
            </div>
            <div className="md:w-1/2 md:ml-8 text-center md:text-left">
              <h3 className="text-lg md:text-xl font-bold text-light-heading mt-4 md:mt-0">Social Features</h3>
              <p className="text-light-text mt-2 text-sm md:text-base">
                Engage with a vibrant community of readers and writers through comments, likes, shares, and user profiles, fostering meaningful interactions and discussions.
              </p>
            </div>
          </div>
          
          {/* Feature 4 */}
          <div className="flex flex-col md:flex-row-reverse items-center bg-light-secondaryBg p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="md:w-1/2 transition-transform duration-300 hover:scale-110 mb-4 md:mb-0 md:ml-8"> 
              <Image src='/dashboard-benefits.svg' alt="Dashboard illustration" width={200} height={200} className="mx-auto md:mx-0" />
            </div>
            <div className="md:w-1/2 text-center md:text-left">
              <h3 className="text-lg md:text-xl font-bold text-light-heading mt-4 md:mt-0">Analytics</h3>
              <p className="text-light-text mt-2 text-sm md:text-base md:mr-8"> 
                Optimize your content strategy with actionable insights, helping you understand your audience better and tailor your posts to maximize engagement and reach.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
