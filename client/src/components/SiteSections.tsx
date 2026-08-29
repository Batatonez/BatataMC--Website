// Oficina Noturna: editorial sections preserve the V0 language while keeping the hero and status focused.
import { ArrowDownRight, ArrowRight, Check, Copy, Gamepad2, Layers3 } from "lucide-react";
import { useState } from "react";
import { galleryPlaceholders, heroImage, joinSteps, serverAddress, serverModes, serverName } from "@/data/siteData";
import { useServerStatus } from "@/hooks/useServerStatus";

export function Hero() {
  return <section id="inicio" className="hero-section">
    <div className="hero-backdrop" />
    <div className="hero-grid-lines" aria-hidden="true" />
    <div className="hero-orbit hero-orbit--one" aria-hidden="true" /><div className="hero-orbit hero-orbit--two" aria-hidden="true" />
    <div className="container hero-content">
      <div className="hero-copy reveal reveal--one">
        <p className="eyebrow"><span className="eyebrow-dot" /> Servidor privado · Minecraft Java</p>
        <h1>BATATA<span>MC</span></h1>
        <p className="hero-lede">Um servidor feito<br /><em>por amigos, para amigos.</em></p>
        <p className="hero-note">Sempre tem algo novo pra jogar.</p>
        <div className="hero-actions"><a className="button button--lime" href="#como-entrar">Jogar agora <ArrowRight size={17} /></a><a className="button button--ghost" href="#servidores">Conhecer servidores <ArrowDownRight size={17} /></a></div>
      </div>
      <div className="hero-visual reveal reveal--two" aria-label="Área reservada para a imagem real do BatataMC">
        <img src={heroImage} alt="Cenário Minecraft construído com arquitetura de pedra e madeira, iluminado por lanternas" />
        <div className="hero-visual-shade" aria-hidden="true" />
        <div className="hero-visual-corner hero-visual-corner--top" aria-hidden="true" /><div className="hero-visual-corner hero-visual-corner--bottom" aria-hidden="true" />
        <span className="hero-visual-note">imagem do mundo em preparo</span>
      </div>
    </div>
    <div className="hero-scroll"><span>Scroll para explorar</span><div /></div>
  </section>;
}

export function StatusPanel() {
  const { state, status } = useServerStatus();
  const isChecking = state === "checking";
  const isNotConfigured = state === "not-configured";
  const statusLabel = isChecking ? "Verificando servidor..." : isNotConfigured ? "Status não configurado" : state === "unavailable" ? "Status indisponível" : status?.isOnline ? "Online" : "Offline";
  return <section className="status-wrap"><div className="container"><div className="status-panel" aria-live="polite"><div className="status-intro"><span className={`status-pulse ${isChecking ? "status-pulse--checking" : ""}`} /><div><span className="tiny-label">STATUS DO SERVIDOR</span><strong className="status-label">{statusLabel}</strong></div></div><div className="status-divider" />{status ? <><div className="status-stat"><span>Jogadores</span><strong>{status.playersOnline ?? "—"} <small>/ {status.maxPlayers ?? "—"}</small></strong></div><div className="status-stat"><span>Ping</span><strong>{status.pingMs ?? "—"} <small>{status.pingMs != null ? "ms" : ""}</small></strong></div></> : <div className="status-neutral"><Gamepad2 size={15} /><span>{isChecking ? "Aguardando conexão" : isNotConfigured ? "Endpoint ainda não configurado" : "Nenhum dado disponível"}</span></div>}<div className="status-platform"><Gamepad2 size={15} /><span>{status?.platform ?? "Minecraft Java"}</span></div></div></div></section>;
}

export function ServersSection() {
  return <section id="servidores" className="servers-section section-pad"><div className="container"><div className="section-heading"><div><span className="section-index">02 / EXPERIÊNCIAS</span><h2>O que tem no<br /><em>BatataMC</em></h2></div><p>Formas diferentes de jogar. Escolha seu mundo, reúna os amigos e deixe sua marca.</p></div><div className="server-cards">{serverModes.map((mode, index) => <article key={mode.id} className={`server-card server-card--${mode.accent} server-card--${index + 1}`}><div className="server-card-image" style={{ backgroundImage: `url(${mode.image})` }}><span className="server-number">{mode.number}</span><span className="image-placeholder">território em preparo</span></div><div className="server-card-body"><div className="card-meta"><span className="mode-badge">{mode.badge}</span><span className="mode-type">{mode.type}</span></div><h3>{mode.name}</h3><p>{mode.description}</p><a href="#como-entrar" className="card-link">Explorar modo <ArrowRight size={16} /></a></div></article>)}</div></div></section>;
}

export function AboutSection() {
  return <section id="sobre" className="about-section section-pad"><div className="container about-layout"><div className="about-stamp"><span>feito</span><strong>por<br />amigos</strong><small>feito para jogar junto</small></div><div className="about-copy"><span className="section-index">03 / A IDEIA</span><h2>Feito para jogar,<br /><em>construir e se divertir</em><br />com amigos.</h2><p>O BatataMC é um servidor privado de Minecraft criado para jogar com amigos. Um espaço simples para criar projetos, explorar novos lugares e compartilhar partidas que ficam na memória.</p><a href="#como-entrar" className="text-link">Conheça o caminho <ArrowRight size={16} /></a></div></div></section>;
}

export function GallerySection() {
  return <section id="galeria" className="gallery-section section-pad"><div className="container"><div className="section-heading gallery-heading"><div><span className="section-index">04 / EM CONSTRUÇÃO</span><h2>Um pouco do<br /><em>nosso mundo</em></h2></div><p>As próximas memórias entram aqui. Por enquanto, deixamos o espaço pronto para elas.</p></div><div className="gallery-mosaic">{galleryPlaceholders.map((item, index) => <div className={`gallery-tile ${item.ratio}`} key={item.label} style={{ animationDelay: `${index * 70}ms` }}><div className="tile-grid" /><span className="tile-index">0{index + 1}</span><div className="tile-content"><Layers3 size={19} /><strong>{item.label}</strong><span>{item.detail}</span></div><span className="tile-status">EM BREVE NO MUNDO</span></div>)}</div></div></section>;
}

export function JoinSection() {
  const [copied, setCopied] = useState(false);
  const copyAddress = async () => { try { await navigator.clipboard.writeText(serverAddress); setCopied(true); window.setTimeout(() => setCopied(false), 1800); } catch { setCopied(false); } };
  return <section id="como-entrar" className="join-section section-pad"><div className="container join-layout"><div className="join-copy"><span className="section-index">05 / PRIMEIRO PASSO</span><h2>Entre no<br /><em>BatataMC</em></h2><p>É rápido. Em poucos cliques você já está dentro do mundo.</p><div className="address-box"><div><span>ENDEREÇO DO SERVIDOR</span><strong>{serverAddress}</strong></div><button type="button" onClick={copyAddress} aria-label="Copiar endereço do servidor">{copied ? <Check size={17} /> : <Copy size={17} />}<span>{copied ? "Copiado" : "Copiar endereço"}</span></button></div><p className="placeholder-warning">O endereço está em preparação e será atualizado quando o destino real for informado.</p></div><ol className="steps-list">{joinSteps.map((step, index) => <li key={step}><span>0{index + 1}</span><div><strong>{step}</strong>{index === 0 && <small>Disponível na edição Java.</small>}</div></li>)}</ol></div></section>;
}

export function FinalCta() {
  return <section className="final-cta"><div className="container"><div className="cta-block"><div className="cta-potato" aria-hidden="true"><span /><span /><span /></div><span className="section-index">06 / SEU PRÓXIMO BLOCO</span><h2>Pronto para<br /><em>entrar?</em></h2><p>Seu lugar no BatataMC está a um clique de distância.</p><a className="button button--dark" href="#como-entrar">Jogar no BatataMC <ArrowRight size={17} /></a></div></div></section>;
}

export function Footer() {
  return <footer className="site-footer"><div className="container footer-inner"><a className="brand-lockup" href="#inicio"><span className="brand-wordmark"><strong>BATATA</strong><em>MC</em></span></a><p>Feito com <span aria-label="batata">🥔</span></p><nav aria-label="Links do rodapé">{["Início", "Servidores", "Sobre", "Galeria", "Como entrar"].map((label) => <a key={label} href={`#${label === "Início" ? "inicio" : label === "Como entrar" ? "como-entrar" : label.toLowerCase()}`}>{label}</a>)}</nav><span className="footer-copy">© {new Date().getFullYear()} {serverName} · servidor privado</span></div></footer>;
}
