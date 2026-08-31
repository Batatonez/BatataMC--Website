/** Revela elementos marcados com `data-reveal` conforme entram na viewport. */
import { useEffect } from "react";

export function useScrollReveal(): void {
  useEffect(() => {
    const items = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    if (items.length === 0) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced || !("IntersectionObserver" in window)) {
      items.forEach(item => item.setAttribute("data-reveal", "in"));
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-reveal", "in");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}
