import { SiteHeader } from "@/components/SiteHeader";
import { AboutSection } from "@/components/sections/AboutSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { GallerySection } from "@/components/sections/GallerySection";
import { HeroSection } from "@/components/sections/HeroSection";
import { JoinSection } from "@/components/sections/JoinSection";
import { ServersSection } from "@/components/sections/ServersSection";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Home() {
  useScrollReveal();

  return (
    <>
      <a className="skip-link" href="#servidores">
        Pular para o conteúdo
      </a>
      <SiteHeader />
      <main>
        <HeroSection />
        <ServersSection />
        <AboutSection />
        <GallerySection />
        <JoinSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
