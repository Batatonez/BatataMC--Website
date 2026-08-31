/** Apresentação compartilhada do status: rótulos honestos para cada estado. */
import type { ServerStatusView } from "@/hooks/useServerStatus";

export type StatusTone = "online" | "offline" | "idle" | "checking";

export type StatusDescription = {
  tone: StatusTone;
  label: string;
  detail: string;
  /** Jogadores online informados pela API; `null` quando ela não informa. */
  playersOnline: number | null;
};

/** "1 jogador online" / "3 jogadores online". */
export function formatPlayers(count: number): string {
  return `${count} ${count === 1 ? "jogador" : "jogadores"} online`;
}

export function describeStatus(view: ServerStatusView): StatusDescription {
  if (view.state === "unconfigured") {
    return {
      tone: "idle",
      label: "Em definição",
      detail: "Endereço ainda não publicado.",
      playersOnline: null,
    };
  }

  if (view.state === "loading") {
    return {
      tone: "checking",
      label: "Verificando",
      detail: "Consultando o servidor…",
      playersOnline: null,
    };
  }

  if (view.state === "error" || !view.snapshot) {
    return {
      tone: "idle",
      label: "Indisponível",
      detail: "Não foi possível consultar agora.",
      playersOnline: null,
    };
  }

  const { online, players, version } = view.snapshot;

  if (!online) {
    return {
      tone: "offline",
      label: "Offline",
      detail: view.error ? "Última consulta falhou." : "Servidor fora do ar.",
      playersOnline: null,
    };
  }

  return {
    tone: "online",
    label: "Online",
    detail: version ? `Versão ${version}` : "Servidor no ar.",
    // `max` é ignorado na interface: só a contagem real é exibida.
    playersOnline: players ? players.online : null,
  };
}

export function StatusDot({ tone }: { tone: StatusTone }) {
  return (
    <span className={`status-dot status-dot--${tone}`} aria-hidden="true" />
  );
}
