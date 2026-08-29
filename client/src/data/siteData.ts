/**
 * Fonte única de conteúdo e configuração do site do BatataMC.
 *
 * Tudo que muda com frequência (endereço, servidores, imagens, links) vive aqui.
 * Nenhum componente deve inventar dados: o que não existe ainda fica como `null`
 * e a interface trata esse estado explicitamente.
 */

export type ServerAccent = "lime" | "gold" | "violet" | "ember" | "azure";

export type GameServer = {
  /** Identificador estável, usado como key e âncora. */
  id: string;
  name: string;
  /** Rótulo curto exibido no card. */
  badge: string;
  /** Categoria do modo de jogo. */
  kind: string;
  description: string;
  accent: ServerAccent;
  /**
   * Host consultado no status em tempo real (ex.: "smp.batatamc.com").
   * `null` enquanto o endereço definitivo não existir — o card mostra
   * "endereço em definição" em vez de qualquer valor inventado.
   */
  host: string | null;
  /**
   * Screenshot ou arte do modo. `null` renderiza o placeholder desenhado em CSS.
   * Para trocar depois, basta colocar o arquivo em `client/public/images/`
   * e apontar o caminho aqui.
   */
  image: string | null;
};

export type NetworkConfig = {
  name: string;
  platform: string;
  /** Endereço principal divulgado no site. `null` = ainda não definido. */
  address: string | null;
  /** Host consultado no status geral. Cai para `address` quando ausente. */
  statusHost: string | null;
  /** Intervalo de atualização automática do status, em ms. */
  statusRefreshMs: number;
};

export const network: NetworkConfig = {
  name: "BatataMC",
  platform: "Minecraft: Java Edition",
  address: null,
  statusHost: null,
  statusRefreshMs: 60_000,
};

/** Host efetivo da rede para consulta de status. */
export const networkStatusHost = network.statusHost ?? network.address;

/**
 * Imagem de fundo do hero. `null` mantém apenas o cenário gerado em canvas/CSS.
 * Aceita qualquer arquivo em `client/public/images/`.
 */
export const heroImage: string | null = null;

export const navigationItems = [
  { label: "Início", href: "#inicio" },
  { label: "Servidores", href: "#servidores" },
  { label: "Sobre", href: "#sobre" },
  { label: "Galeria", href: "#galeria" },
  { label: "Como entrar", href: "#como-entrar" },
] as const;

/**
 * Lista aberta de servidores da rede.
 * Para adicionar um novo modo, basta acrescentar um item aqui — layout,
 * status e navegação se adaptam sozinhos, sem número fixo em nenhum texto.
 */
export const gameServers: GameServer[] = [
  {
    id: "smp",
    name: "BatataSMP",
    badge: "SURVIVAL",
    kind: "Survival",
    description:
      "O survival principal do BatataMC. Explore, construa e progrida junto com os outros jogadores.",
    accent: "lime",
    host: null,
    image: null,
  },
  {
    id: "pvp",
    name: "BatataPvP",
    badge: "PVP",
    kind: "PvP",
    description: "Entre na arena e enfrente outros jogadores em combates PvP.",
    accent: "ember",
    host: null,
    image: null,
  },
  {
    id: "rp",
    name: "BatataRP",
    badge: "CRIATIVO",
    kind: "Criativo / RP",
    description:
      "Um espaço para construir livremente, experimentar ideias e criar projetos sem as limitações do survival.",
    accent: "violet",
    host: null,
    image: null,
  },
];

export type GalleryItem = {
  id: string;
  label: string;
  detail: string;
  /** Tamanho no mosaico. */
  size: "feature" | "tall" | "wide" | "square";
  /** Screenshot real. `null` mantém o espaço reservado. */
  image: string | null;
};

export const galleryItems: GalleryItem[] = [
  {
    id: "lobby",
    label: "Lobby",
    detail: "A entrada da rede ganha forma aqui.",
    size: "feature",
    image: null,
  },
  {
    id: "construcoes",
    label: "Construções",
    detail: "Projetos feitos entre amigos.",
    size: "tall",
    image: null,
  },
  {
    id: "exploracao",
    label: "Exploração",
    detail: "Bases novas e caminhos ainda sem nome.",
    size: "wide",
    image: null,
  },
  {
    id: "arena",
    label: "Arena",
    detail: "Timing, reflexo e rivalidade saudável.",
    size: "square",
    image: null,
  },
];

export const joinSteps = [
  { title: "Abra o Minecraft Java.", note: "Disponível na edição Java." },
  { title: "Clique em Multijogador.", note: null },
  { title: "Adicione um novo servidor.", note: null },
  { title: "Cole o endereço do BatataMC.", note: null },
  { title: "Entre e jogue.", note: null },
] as const;
