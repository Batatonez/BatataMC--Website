/** Bloco editorial sobre a proposta da rede. */
import { ArrowRight } from "lucide-react";

export function AboutSection() {
  return (
    <section id="sobre" className="section about">
      <div className="container about-inner">
        <div className="about-mark" aria-hidden="true">
          <span>feito</span>
          <strong>
            por
            <br />
            amigos
          </strong>
          <small>para jogar junto</small>
        </div>

        <div className="about-copy" data-reveal="out">
          <span className="tag">A ideia</span>
          <h2>
            Jogar, construir e se divertir <em>com amigos</em>.
          </h2>
          <p>
            O BatataMC é uma rede privada de Minecraft criada para jogar com
            amigos. Um espaço simples para tocar projetos, explorar novos
            lugares e compartilhar partidas que ficam na memória.
          </p>
          <a className="link-arrow" href="#como-entrar">
            Conheça o caminho
            <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
