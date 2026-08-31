/** Apresentação compartilhada do status: rótulos honestos para cada estado. */
import type { ServerStatusView } from "@/hooks/useServerStatus";

export type StatusTone = "online" | "offline" | "idle" | "checking";

export type StatusDescription = {
  tone: StatusTone;
  label: string;
  detail: string;
  players: string | null;
};

export function describeStatus(view: ServerStatusView): StatusDescription {
  if (view.state === "unconfigured") {
    return {
      tone: "idle",
      label: "Em definição",
      detail: "Endereço ainda não publicado.",
      players: null,
    };
  }

  if (view.state === "loading") {
    return {
      tone: "checking",
      label: "Verificando",
      detail: "Consultando o servidor…",
      players: null,
    };
  }

  if (view.state === "error" || !view.snapshot) {
    return {
      tone: "idle",
      label: "Indisponível",
      detail: "Não foi possível consultar agora.",
      players: null,
    };
  }

  const { online, players, version } = view.snapshot;

  if (!online) {
    return {
      tone: "offline",
      label: "Offline",
      detail: view.error ? "Última consulta falhou." : "Servidor fora do ar.",
      players: null,
    };
  }

  return {
    tone: "online",
    label: "Online",
    detail: version ? `Versão ${version}` : "Servidor no ar.",
    players: players
      ? `${players.online}${players.max !== null ? ` / ${players.max}` : ""}`
      : null,
  };
}

export function StatusDot({ tone }: { tone: StatusTone }) {
  return (
    <span className={`status-dot status-dot--${tone}`} aria-hidden="true" />
  );
}
