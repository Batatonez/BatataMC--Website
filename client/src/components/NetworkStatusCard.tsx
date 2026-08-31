/**
 * Painel de status da rede: um resumo do host principal e uma linha por
 * servidor. Todo valor vem da consulta real; o que não estiver disponível
 * aparece como traço, nunca como número inventado.
 */
import { RefreshCw } from "lucide-react";
import { describeStatus, StatusDot } from "@/components/ServerStatus";
import {
  gameServers,
  networkStatusHost,
  type GameServer,
} from "@/data/siteData";
import { useServerStatus } from "@/hooks/useServerStatus";

const timeFormatter = new Intl.DateTimeFormat("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
});

function ServerStatusRow({ server }: { server: GameServer }) {
  const status = useServerStatus(server.host);
  const info = describeStatus(status);

  return (
    <li className="status-row">
      <StatusDot tone={info.tone} />
      <span className="status-row-name">{server.name}</span>
      <span className="status-row-value">
        {info.players ? `${info.players} online` : info.label}
      </span>
    </li>
  );
}

export function NetworkStatusCard() {
  const status = useServerStatus(networkStatusHost);
  const info = describeStatus(status);
  const checkedAt = status.snapshot?.fetchedAt ?? null;

  return (
    <aside className="status-card" aria-label="Status dos servidores">
      <header className="status-card-head">
        <span className="tag">Status da rede</span>
        <button
          type="button"
          className="status-refresh"
          onClick={status.refresh}
          disabled={status.state === "unconfigured" || status.isRefreshing}
          aria-label="Atualizar status agora"
        >
          <RefreshCw
            size={13}
            className={status.isRefreshing ? "is-spinning" : undefined}
          />
        </button>
      </header>

      <div className="status-card-main" aria-live="polite">
        <div className="status-headline">
          <StatusDot tone={info.tone} />
          <strong>{info.label}</strong>
        </div>
        <p className="status-detail">{info.detail}</p>
      </div>

      <dl className="status-metrics">
        <div>
          <dt>Jogadores</dt>
          <dd>{info.players ?? "—"}</dd>
        </div>
        <div>
          <dt>Plataforma</dt>
          <dd>Java Edition</dd>
        </div>
      </dl>

      <ul className="status-list">
        {gameServers.map(server => (
          <ServerStatusRow key={server.id} server={server} />
        ))}
      </ul>

      <footer className="status-card-foot">
        {checkedAt
          ? `Atualizado às ${timeFormatter.format(checkedAt)}`
          : "Aguardando o endereço definitivo da rede."}
      </footer>
    </aside>
  );
}
