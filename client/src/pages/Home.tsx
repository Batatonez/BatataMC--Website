// Oficina Noturna: page composition intentionally alternates dense and breathing editorial sections.
import { useEffect } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { AboutSection, FinalCta, Footer, GallerySection, Hero, JoinSection, ServersSection, StatusPanel } from "@/components/SiteSections";

export default function Home() {
  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>(".reveal, .server-card, .gallery-tile");
    if (!("IntersectionObserver" in window)) { revealItems.forEach((item) => item.classList.add("is-visible")); return; }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }), { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return <div className="site-shell"><SiteHeader /><main><Hero /><StatusPanel /><ServersSection /><AboutSection /><GallerySection /><JoinSection /><FinalCta /></main><Footer /></div>;
}
