

import { lazy, Suspense } from 'react';
import {  HeroSkeleton, AboutSkeleton, FeaturesSkeleton} from '@/app/ui/skeletons';


const Hero = lazy(() => import('@/app/ui/components/landing/hero'));
const About = lazy(() => import('@/app/ui/components/landing/aboutsnippet'));
const Features = lazy(() => import('@/app/ui/components/landing/benefits'));



export function HeroWrapper() {
  return (
    <Suspense fallback={<HeroSkeleton />}>
      <Hero />
    </Suspense>
  );
}

export function AboutWrapper() {
  return (
    <Suspense fallback={<AboutSkeleton />}>
      <About />
    </Suspense>
  );
}

export function FeaturesWrapper() {
  return (
    <Suspense fallback={<FeaturesSkeleton />}>
      <Features />
    </Suspense>
  );
}
