/** Passo a passo de entrada e endereço da rede (com estado real de "em definição"). */
import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { joinSteps, network } from "@/data/siteData";

export function JoinSection() {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const address = network.address;

  useEffect(
    () => () => {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    },
    []
  );

  const copyAddress = async () => {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="como-entrar" className="section join">
      <div className="container join-inner">
        <div className="join-copy" data-reveal="out">
          <span className="tag">Primeiro passo</span>
          <h2>
            Entre no <em>BatataMC</em>
          </h2>
          <p>É rápido. Em poucos cliques você já está dentro do mundo.</p>

          <div className="address-box">
            <div>
              <span>Endereço do servidor</span>
              <strong>{address ?? "Em definição"}</strong>
            </div>
            <button
              type="button"
              onClick={copyAddress}
              disabled={!address}
              aria-label={
                address
                  ? "Copiar endereço do servidor"
                  : "Endereço ainda não disponível"
              }
            >
              {copied ? (
                <Check size={16} aria-hidden="true" />
              ) : (
                <Copy size={16} aria-hidden="true" />
              )}
              <span>{copied ? "Copiado" : "Copiar"}</span>
            </button>
          </div>

          {!address && (
            <p className="join-warning">
              O endereço será publicado aqui assim que o destino definitivo
              estiver pronto.
            </p>
          )}
        </div>

        <ol className="steps" data-reveal="out">
          {joinSteps.map((step, index) => (
            <li key={step.title}>
              <span className="step-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <strong>{step.title}</strong>
                {step.note && <small>{step.note}</small>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
