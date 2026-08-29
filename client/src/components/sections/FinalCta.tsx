/** Chamada final antes do rodapé. */
import { ArrowRight } from "lucide-react";

export function FinalCta() {
  return (
    <section className="final-cta">
      <div className="container final-cta-inner" data-reveal="out">
        <span className="tag">Seu próximo bloco</span>
        <h2>
          Pronto para <em>entrar?</em>
        </h2>
        <p>Seu lugar no BatataMC está a um clique de distância.</p>
        <a className="button button--primary" href="#como-entrar">
          Jogar no BatataMC
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
