import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { AlgorithmCategoriesSection } from '@/components/sections/AlgorithmCategoriesSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { useEffect } from 'react';

const Index = () => {
  // Initialize theme on mount
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = stored || (prefersDark ? 'dark' : 'light');
    document.documentElement.classList.add(theme);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <AlgorithmCategoriesSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
