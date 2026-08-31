/**
 * Camada única de integração com o status real de servidores Minecraft.
 *
 * Hoje usa a API pública mcsrvstat.us (v3), que responde com CORS liberado e
 * mantém cache próprio de ~1 minuto. Para trocar por um backend próprio depois,
 * basta reescrever `buildStatusUrl` e `parseStatusPayload` — nada mais no site
 * conhece o formato da resposta.
 */

export type PlayerCount = {
  online: number;
  /** A API nem sempre informa o máximo. */
  max: number | null;
};

export type ServerSnapshot = {
  host: string;
  online: boolean;
  players: PlayerCount | null;
  version: string | null;
  /** Momento em que a resposta foi recebida (ms). */
  fetchedAt: number;
};

const STATUS_API_BASE = "https://api.mcsrvstat.us/3/";
const REQUEST_TIMEOUT_MS = 8_000;

export function buildStatusUrl(host: string): string {
  // O host pode vir como "ip:porta"; os dois-pontos são válidos no caminho da
  // URL e a API os espera literais, então não podem ir percent-encoded.
  const encoded = encodeURIComponent(host.trim()).replace(/%3A/gi, ":");
  return STATUS_API_BASE + encoded;
}

function toCount(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) && value >= 0
    ? Math.trunc(value)
    : null;
}

function parsePlayers(value: unknown): PlayerCount | null {
  if (typeof value !== "object" || value === null) return null;
  const raw = value as { online?: unknown; max?: unknown };
  const online = toCount(raw.online);
  if (online === null) return null;
  return { online, max: toCount(raw.max) };
}

function parseVersion(value: unknown): string | null {
  return typeof value === "string" && value.trim() !== "" ? value.trim() : null;
}

function parseStatusPayload(host: string, payload: unknown): ServerSnapshot {
  if (typeof payload !== "object" || payload === null) {
    throw new Error("Resposta de status inválida.");
  }
  const raw = payload as {
    online?: unknown;
    players?: unknown;
    version?: unknown;
  };
  const online = raw.online === true;

  return {
    host,
    online,
    // Offline não tem contagem confiável: melhor nada do que um número errado.
    players: online ? parsePlayers(raw.players) : null,
    version: online ? parseVersion(raw.version) : null,
    fetchedAt: Date.now(),
  };
}

/**
 * Combina um sinal externo com um timeout próprio, sem depender de
 * `AbortSignal.any`/`AbortSignal.timeout` (suporte ainda irregular).
 */
function withTimeout(external: AbortSignal | undefined, ms: number) {
  const controller = new AbortController();
  const abortFromExternal = () => controller.abort(external?.reason);
  const timer = setTimeout(
    () => controller.abort(new DOMException("Tempo esgotado.", "TimeoutError")),
    ms
  );

  if (external) {
    if (external.aborted) abortFromExternal();
    else external.addEventListener("abort", abortFromExternal, { once: true });
  }

  return {
    signal: controller.signal,
    dispose() {
      clearTimeout(timer);
      external?.removeEventListener("abort", abortFromExternal);
    },
  };
}

/**
 * Consulta o status de um host. Lança em erro de rede, timeout ou resposta
 * inesperada; um servidor simplesmente offline resolve com `online: false`.
 */
export async function fetchServerStatus(
  host: string,
  signal?: AbortSignal
): Promise<ServerSnapshot> {
  const request = withTimeout(signal, REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(buildStatusUrl(host), {
      signal: request.signal,
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Status indisponível (HTTP ${response.status}).`);
    }

    return parseStatusPayload(host, await response.json());
  } finally {
    request.dispose();
  }
}
