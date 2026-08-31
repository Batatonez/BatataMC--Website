/** Rodapé enxuto com navegação secundária. */
import { navigationItems, network } from "@/data/siteData";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <a className="brand" href="#inicio">
          <span className="brand-word">
            Batata<em>MC</em>
          </span>
        </a>

        <nav aria-label="Links do rodapé">
          {navigationItems.map(item => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <span className="footer-note">
          © {new Date().getFullYear()} {network.name} · rede privada de
          Minecraft
        </span>
      </div>
    </footer>
  );
}
