// Oficina Noturna: compact block-like navigation, lime action cue, and mobile-first behavior.
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navigationItems, serverName } from "@/data/siteData";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
      <div className="header-inner">
        <a className="brand-lockup" href="#inicio" aria-label="BatataMC, voltar ao início" onClick={closeMenu}>
          
          <span className="brand-wordmark"><strong>BATATA</strong><em>MC</em></span>
        </a>
        <nav className={`desktop-nav ${menuOpen ? "is-hidden" : ""}`} aria-label="Navegação principal">
          {navigationItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <a className="header-cta" href="#como-entrar" onClick={closeMenu}>Jogar agora <span aria-hidden="true">↗</span></a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <div className={`mobile-nav ${menuOpen ? "mobile-nav--open" : ""}`}>
        {navigationItems.map((item) => <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}<span aria-hidden="true">↗</span></a>)}
        <a className="mobile-nav-cta" href="#como-entrar" onClick={closeMenu}>Jogar agora <span aria-hidden="true">↗</span></a>
      </div>
    </header>
  );
}

export { serverName };
