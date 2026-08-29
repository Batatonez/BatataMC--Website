// Oficina Noturna: editable BatataMC content and integration configuration stay centralized here.

export const serverConfig = {
  serverName: "BatataMC",
  serverAddress: "ENDERECO-A_DEFINIR",
  statusEndpoint: "",
  platform: "Minecraft Java",
  statusRefreshMs: 90_000,
} as const;

export const heroImage = "/images/hero.svg";

export const navigationItems = [
  { label: "Início", href: "#inicio" },
  { label: "Servidores", href: "#servidores" },
  { label: "Sobre", href: "#sobre" },
  { label: "Galeria", href: "#galeria" },
  { label: "Como entrar", href: "#como-entrar" },
];

// Add future modes here. The page layout intentionally maps over this list.
export const serverModes = [
  {
    id: "rp",
    name: "BatataRP",
    badge: "CRIATIVO",
    type: "Criativo",
    description: "Um espaço para construir livremente, experimentar ideias e criar projetos sem as limitações do survival.",
    image: "/images/batata-rp.svg",
    accent: "violet",
    number: "01",
  },
  {
    id: "smp",
    name: "BatataSMP",
    badge: "SURVIVAL",
    type: "Survival",
    description: "O survival principal do BatataMC. Explore, construa e progrida junto com os outros jogadores.",
    image: "/images/batata-smp.svg",
    accent: "green",
    number: "02",
  },
  {
    id: "pvp",
    name: "BatataPvP",
    badge: "PVP",
    type: "PvP",
    description: "Entre na arena e enfrente outros jogadores em combates PvP.",
    image: "/images/batata-pvp.svg",
    accent: "ember",
    number: "03",
  },
] as const;

export const galleryPlaceholders = [
  { label: "Lobby", ratio: "gallery-feature", detail: "A entrada do nosso mundo ganha forma aqui." },
  { label: "BatataRP", ratio: "gallery-tall", detail: "Construções e projetos feitos entre amigos." },
  { label: "BatataSMP", ratio: "gallery-wide", detail: "Exploração, base e novas histórias." },
  { label: "BatataPvP", ratio: "gallery-square", detail: "Arena, timing e rivalidade saudável." },
];

export const joinSteps = [
  "Abra o Minecraft Java.",
  "Clique em Multiplayer.",
  "Adicione um novo servidor.",
  "Cole o endereço do BatataMC.",
  "Entre e jogue.",
];

export const serverName = serverConfig.serverName;
export const serverAddress = serverConfig.serverAddress;
