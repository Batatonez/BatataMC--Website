/** Abertura do site: título limpo, cenário em blocos e status real ao lado. */
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { BlockField } from "@/components/BlockField";
import { NetworkStatusCard } from "@/components/NetworkStatusCard";
import { heroImage, network } from "@/data/siteData";

export function HeroSection() {
  return (
    <section id="inicio" className="hero">
      <div className="hero-scene" aria-hidden="true">
        {heroImage && (
          <div
            className="hero-photo"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
        )}
        <div className="hero-glow hero-glow--lime" />
        <div className="hero-glow hero-glow--gold" />
        <div className="hero-floor" />
        <BlockField />
        <div className="hero-grain" />
        <div className="hero-fade" />
      </div>

      <div className="container hero-inner">
        <div className="hero-copy" data-reveal="out">
          <p className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            Rede de Minecraft · {network.platform}
          </p>

          <h1 className="hero-title">
            Batata<span>MC</span>
          </h1>

          <p className="hero-lede">
            Uma rede feita <em>por amigos, para amigos.</em>
          </p>
          <p className="hero-note">Sempre tem algo novo pra jogar.</p>

          <div className="hero-actions">
            <a className="button button--primary" href="#como-entrar">
              Jogar agora
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a className="button button--ghost" href="#servidores">
              Ver servidores
              <ArrowDownRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="hero-side" data-reveal="out">
          <NetworkStatusCard />
        </div>
      </div>

      <a
        className="hero-scroll"
        href="#servidores"
        aria-label="Ir para os servidores"
      >
        <span>Explorar</span>
        <span className="hero-scroll-line" aria-hidden="true" />
      </a>
    </section>
  );
}
