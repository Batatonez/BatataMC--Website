// Oficina Noturna: status UI states stay explicit so no fabricated values can appear.
import { useCallback, useEffect, useState } from "react";
import { serverConfig } from "@/data/siteData";
import { fetchServerStatus, type ServerStatus } from "@/lib/serverStatus";

type StatusState = "checking" | "ready" | "unavailable" | "not-configured";

export function useServerStatus() {
  const [state, setState] = useState<StatusState>(serverConfig.statusEndpoint ? "checking" : "not-configured");
  const [status, setStatus] = useState<ServerStatus | null>(null);

  const refresh = useCallback(async (signal?: AbortSignal) => {
    if (!serverConfig.statusEndpoint) {
      setState("not-configured");
      setStatus(null);
      return;
    }
    setState("checking");
    try {
      const nextStatus = await fetchServerStatus(signal);
      if (!signal?.aborted) { setStatus(nextStatus); setState("ready"); }
    } catch {
      if (!signal?.aborted) { setStatus(null); setState("unavailable"); }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void refresh(controller.signal);
    if (!serverConfig.statusEndpoint) return () => controller.abort();
    const interval = window.setInterval(() => void refresh(), serverConfig.statusRefreshMs);
    return () => { controller.abort(); window.clearInterval(interval); };
  }, [refresh]);

  return { state, status, refresh };
}
