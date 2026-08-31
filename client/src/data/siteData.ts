/**
 * Fonte única de conteúdo e configuração do site do BatataMC.
 *
 * Tudo que muda com frequência (endereço, servidores, imagens, links) vive aqui.
 * Nenhum componente deve inventar dados: o que não existe ainda fica como `null`
 * e a interface trata esse estado explicitamente.
 */

export type ServerAccent = "lime" | "gold" | "violet" | "ember" | "azure";

/** Uma captura de tela do servidor. */
export type Screenshot = {
  /** Caminho dentro de `client/public/`. */
  src: string;
  /** Descrição do que aparece na imagem, usada como `alt`. */
  alt: string;
};

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
   * Capturas do modo, na ordem de exibição: a primeira é a principal do card
   * e as seguintes entram na navegação por pontinhos. Lista vazia mantém o
   * placeholder desenhado em CSS; um arquivo ausente também cai nele.
   */
  images: Screenshot[];
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
 * Imagem de fundo do hero, aplicada como camada atmosférica atrás do cenário
 * de blocos. `null` mantém apenas o cenário gerado em canvas/CSS.
 */
export const heroImage: string | null = "/images/lobby-01.jpg";

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
    images: [
      {
        src: "/images/batatasmp-01.jpg",
        alt: "Paisagem do BatataSMP com bioma de cerejeiras, construções ao longe e o mar à esquerda.",
      },
      {
        src: "/images/batatasmp-02.jpg",
        alt: "Colinas de cerejeira do BatataSMP vistas do nível do chão.",
      },
    ],
  },
  {
    id: "pvp",
    name: "BatataPvP",
    badge: "PVP",
    kind: "PvP",
    description: "Entre na arena e enfrente outros jogadores em combates PvP.",
    accent: "ember",
    host: null,
    images: [
      {
        src: "/images/batatapvp-01.jpg",
        alt: "Ilha flutuante do BatataPvP com a construção principal e a torre de antena.",
      },
      {
        src: "/images/batatapvp-02.jpg",
        alt: "Outro ângulo da ilha do BatataPvP, mostrando a área verde e as passarelas.",
      },
    ],
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
    images: [
      {
        src: "/images/batatarp-01.jpg",
        alt: "Pagode e construções do BatataRP, com uma grande escultura de asas ao fundo.",
      },
      {
        src: "/images/batatarp-02.jpg",
        alt: "Salão interno do BatataRP, com tapete vermelho, armaduras expostas e estantes de livros.",
      },
    ],
  },
];

export type GalleryItem = {
  id: string;
  label: string;
  detail: string;
  /**
   * Espaço no grid: "wide" ocupa meia largura, "feature" ocupa a largura toda
   * como banner. Ambos preservam a proporção da captura sem corte agressivo.
   */
  size: "feature" | "wide";
  /** Captura real. `null` mantém o espaço reservado. */
  image: string | null;
};

/**
 * Mosaico institucional. Novas capturas entram só acrescentando itens —
 * o grid se reorganiza sozinho.
 */
export const galleryItems: GalleryItem[] = [
  {
    id: "lobby-praca",
    label: "Lobby",
    detail: "A praça central do spawn, cercada pelo castelo.",
    size: "wide",
    image: "/images/lobby-01.jpg",
  },
  {
    id: "lobby-castelo",
    label: "Castelo",
    detail: "As torres e bandeiras que fecham o lobby.",
    size: "wide",
    image: "/images/lobby-02.jpg",
  },
];

export const joinSteps = [
  { title: "Abra o Minecraft Java.", note: "Disponível na edição Java." },
  { title: "Clique em Multijogador.", note: null },
  { title: "Adicione um novo servidor.", note: null },
  { title: "Cole o endereço do BatataMC.", note: null },
  { title: "Entre e jogue.", note: null },
] as const;
