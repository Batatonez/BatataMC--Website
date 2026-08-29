/** Navegação fixa: compacta, com seção ativa destacada e menu mobile acessível. */
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navigationItems, network } from "@/data/siteData";

const sectionIds = navigationItems.map(item => item.href.slice(1));

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const sections = sectionIds
      .map(id => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5] }
    );

    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("has-menu-open");
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("has-menu-open");
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header${scrolled ? " site-header--solid" : ""}`}>
      <div className="header-inner">
        <a
          className="brand"
          href="#inicio"
          aria-label={`${network.name}, voltar ao início`}
          onClick={closeMenu}
        >
          <span className="brand-word">
            Batata<em>MC</em>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigationItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              className={
                activeId === item.href.slice(1) ? "is-active" : undefined
              }
              aria-current={
                activeId === item.href.slice(1) ? "true" : undefined
              }
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          className="button button--primary button--sm header-cta"
          href="#como-entrar"
        >
          Jogar agora
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen(open => !open)}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`mobile-nav${menuOpen ? " mobile-nav--open" : ""}`}
        hidden={!menuOpen}
      >
        <nav aria-label="Navegação mobile">
          {navigationItems.map(item => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
        </nav>
        <a
          className="button button--primary"
          href="#como-entrar"
          onClick={closeMenu}
        >
          Jogar agora
        </a>
      </div>
    </header>
  );
}
