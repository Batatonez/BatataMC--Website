/**
 * Vitrine dos servidores. A lista vem inteira de `gameServers`, então novos
 * mundos entram só adicionando um item — nenhum texto cita quantidade.
 */
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { describeStatus, StatusDot } from "@/components/ServerStatus";
import { gameServers, type GameServer } from "@/data/siteData";
import { useImageFallback } from "@/hooks/useImageFallback";
import { useServerStatus } from "@/hooks/useServerStatus";

function ServerCard({ server, index }: { server: GameServer; index: number }) {
  const status = useServerStatus(server.host);
  const info = describeStatus(status);
  const { failed, markFailed } = useImageFallback();
  const [selected, setSelected] = useState(0);

  const shots = server.images.filter(shot => !failed.has(shot.src));
  const active = Math.min(selected, Math.max(shots.length - 1, 0));

  return (
    <article
      className={`server-card server-card--${server.accent}`}
      data-reveal="out"
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <div className="server-media">
        {shots.length > 0 ? (
          shots.map((shot, shotIndex) => (
            <img
              key={shot.src}
              src={shot.src}
              alt={shot.alt}
              loading="lazy"
              decoding="async"
              className={shotIndex === active ? "is-active" : undefined}
              onError={() => markFailed(shot.src)}
            />
          ))
        ) : (
          <div className="server-media-placeholder" aria-hidden="true">
            <span className="server-media-grid" />
            <span className="server-media-note">imagem em breve</span>
          </div>
        )}

        <span className="server-media-scrim" aria-hidden="true" />
        <span className="server-badge">{server.badge}</span>

        {shots.length > 1 && (
          <div
            className="server-shots"
            role="group"
            aria-label={`Capturas do ${server.name}`}
          >
            {shots.map((shot, shotIndex) => (
              <button
                key={shot.src}
                type="button"
                aria-label={`Ver captura ${shotIndex + 1} do ${server.name}`}
                aria-pressed={shotIndex === active}
                onClick={() => setSelected(shotIndex)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="server-body">
        <div className="server-head">
          <h3>{server.name}</h3>
          <span className="server-kind">{server.kind}</span>
        </div>

        <p className="server-description">{server.description}</p>

        <p className="server-status">
          <StatusDot tone={info.tone} />
          <span className="server-status-label">{info.label}</span>
          {info.players && (
            <span className="server-status-players">{info.players} online</span>
          )}
        </p>

        <a className="link-arrow" href="#como-entrar">
          Como entrar
          <ArrowRight size={15} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export function ServersSection() {
  return (
    <section id="servidores" className="section servers">
      <div className="container">
        <div className="section-head" data-reveal="out">
          <div>
            <span className="tag">Servidores</span>
            <h2>
              Escolha sua próxima <em>aventura</em>
            </h2>
          </div>
          <p>
            Cada mundo do BatataMC tem um jeito próprio de jogar. A rede
            continua crescendo, e cada novo servidor aparece aqui.
          </p>
        </div>

        <div className="server-grid">
          {gameServers.map((server, index) => (
            <ServerCard key={server.id} server={server} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
