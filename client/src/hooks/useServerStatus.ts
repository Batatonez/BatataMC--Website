/**
 * Estado compartilhado do status dos servidores.
 *
 * Um host consultado por vários componentes gera uma única requisição e um
 * único intervalo. Dados já carregados permanecem visíveis durante o refresh,
 * então a interface nunca "pisca" entre atualizações.
 */
import { useCallback, useSyncExternalStore } from "react";
import { network } from "@/data/siteData";
import { fetchServerStatus, type ServerSnapshot } from "@/lib/serverStatus";

export type ServerStatusState = "unconfigured" | "loading" | "ready" | "error";

type StoreView = {
  snapshot: ServerSnapshot | null;
  error: string | null;
  isRefreshing: boolean;
};

export type ServerStatusView = StoreView & {
  state: ServerStatusState;
  refresh: () => void;
};

type Entry = {
  view: StoreView;
  listeners: Set<() => void>;
  loading: boolean;
  timer: number | null;
};

const INITIAL_VIEW: StoreView = {
  snapshot: null,
  error: null,
  isRefreshing: false,
};

const UNCONFIGURED_VIEW: StoreView = INITIAL_VIEW;

/** Evita rajadas de requisições quando vários cards montam ao mesmo tempo. */
const MIN_INTERVAL_MS = 15_000;

const entries = new Map<string, Entry>();
let visibilityBound = false;

function getEntry(host: string): Entry {
  let entry = entries.get(host);
  if (!entry) {
    entry = {
      view: INITIAL_VIEW,
      listeners: new Set(),
      loading: false,
      timer: null,
    };
    entries.set(host, entry);
  }
  return entry;
}

function publish(entry: Entry, patch: Partial<StoreView>): void {
  entry.view = { ...entry.view, ...patch };
  entry.listeners.forEach(listener => listener());
}

function isStale(entry: Entry): boolean {
  const last = entry.view.snapshot?.fetchedAt ?? 0;
  return Date.now() - last >= MIN_INTERVAL_MS;
}

async function load(host: string, force: boolean): Promise<void> {
  const entry = getEntry(host);
  if (entry.loading) return;
  if (!force && entry.view.snapshot && !isStale(entry)) return;

  entry.loading = true;
  publish(entry, { isRefreshing: true });

  try {
    const snapshot = await fetchServerStatus(host);
    publish(entry, { snapshot, error: null, isRefreshing: false });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Não foi possível consultar o status.";
    // O snapshot anterior continua exposto: melhor um dado com aviso do que um vazio.
    publish(entry, { error: message, isRefreshing: false });
  } finally {
    entry.loading = false;
  }
}

function refreshVisibleHosts(): void {
  if (document.visibilityState !== "visible") return;
  entries.forEach((entry, host) => {
    if (entry.listeners.size > 0 && isStale(entry)) void load(host, false);
  });
}

function bindVisibility(): void {
  if (visibilityBound || typeof document === "undefined") return;
  visibilityBound = true;
  document.addEventListener("visibilitychange", refreshVisibleHosts);
}

function subscribe(host: string, listener: () => void): () => void {
  const entry = getEntry(host);
  entry.listeners.add(listener);

  if (entry.listeners.size === 1) {
    bindVisibility();
    void load(host, false);
    entry.timer = window.setInterval(() => {
      // Aba oculta não gasta requisição; o retorno ao foco revalida.
      if (document.visibilityState === "visible") void load(host, true);
    }, network.statusRefreshMs);
  }

  return () => {
    entry.listeners.delete(listener);
    if (entry.listeners.size === 0 && entry.timer !== null) {
      window.clearInterval(entry.timer);
      entry.timer = null;
    }
  };
}

export function useServerStatus(host: string | null): ServerStatusView {
  const view = useSyncExternalStore(
    useCallback(
      (listener: () => void) => (host ? subscribe(host, listener) : () => {}),
      [host]
    ),
    useCallback(() => (host ? getEntry(host).view : UNCONFIGURED_VIEW), [host]),
    useCallback(() => UNCONFIGURED_VIEW, [])
  );

  const refresh = useCallback(() => {
    if (host) void load(host, true);
  }, [host]);

  const state: ServerStatusState = !host
    ? "unconfigured"
    : view.snapshot
      ? "ready"
      : view.error
        ? "error"
        : "loading";

  return { ...view, state, refresh };
}
