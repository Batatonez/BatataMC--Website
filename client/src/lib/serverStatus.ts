// Oficina Noturna: this adapter is the only boundary for a future HTTP server-status integration.
import { serverConfig } from "@/data/siteData";

export type ServerStatus = {
  isOnline: boolean;
  playersOnline?: number;
  maxPlayers?: number;
  pingMs?: number;
  platform: string;
};

export type ServerStatusResponse = ServerStatus;

export async function fetchServerStatus(signal?: AbortSignal): Promise<ServerStatus> {
  if (!serverConfig.statusEndpoint) {
    throw new Error("STATUS_ENDPOINT_NOT_CONFIGURED");
  }

  const response = await fetch(serverConfig.statusEndpoint, { signal, headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`STATUS_REQUEST_FAILED_${response.status}`);
  const data = await response.json() as ServerStatusResponse;
  return { ...data, platform: data.platform || serverConfig.platform };
}
