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
   * Host consultado no status em tempo real, no formato "ip:porta" quando a
   * porta não for a padrão. `null` mantém o card em "endereço em definição"
   * em vez de exibir qualquer valor inventado.
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
  address: "179.213.113.129",
  statusHost: "179.213.113.129",
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
    host: "179.213.113.129:25575",
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
    host: "179.213.113.129:25567",
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
    host: "179.213.113.129:6767",
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
  /** Modo ou área a que a captura pertence. */
  label: string;
  /** Descrição da imagem para leitores de tela. */
  alt: string;
  src: string;
};

/**
 * Capturas da rede, agrupadas por modo na ordem de exibição.
 * O grid é de duas colunas, então cada par ocupa uma linha inteira.
 * Para acrescentar capturas depois, basta adicionar itens aqui.
 */
export const galleryItems: GalleryItem[] = [
  {
    id: "lobby-01",
    label: "Lobby",
    alt: "Vista aérea da praça central do lobby, com o castelo e as bandeiras ao fundo.",
    src: "/images/lobby-01.jpg",
  },
  {
    id: "lobby-02",
    label: "Lobby",
    alt: "Outro ângulo do lobby, mostrando as torres do castelo e os telhados ao redor.",
    src: "/images/lobby-02.jpg",
  },
  {
    id: "pvp-01",
    label: "BatataPvP",
    alt: "Ilha flutuante do BatataPvP com a construção principal e a torre de antena.",
    src: "/images/batatapvp-01.jpg",
  },
  {
    id: "pvp-02",
    label: "BatataPvP",
    alt: "Ilha do BatataPvP vista de outro ângulo, com a área verde e as passarelas.",
    src: "/images/batatapvp-02.jpg",
  },
  {
    id: "rp-01",
    label: "BatataRP",
    alt: "Construções do BatataRP, com um pagode à esquerda e uma grande escultura de asas à direita.",
    src: "/images/batatarp-01.jpg",
  },
  {
    id: "rp-02",
    label: "BatataRP",
    alt: "Salão interno do BatataRP, com tapete vermelho, armaduras expostas e estantes de livros.",
    src: "/images/batatarp-02.jpg",
  },
  {
    id: "smp-01",
    label: "BatataSMP",
    alt: "Paisagem do BatataSMP com bioma de cerejeiras, construções ao longe e o mar à esquerda.",
    src: "/images/batatasmp-01.jpg",
  },
  {
    id: "smp-02",
    label: "BatataSMP",
    alt: "Colinas de cerejeira do BatataSMP vistas do nível do chão.",
    src: "/images/batatasmp-02.jpg",
  },
];

export const joinSteps = [
  { title: "Abra o Minecraft Java.", note: "Disponível na edição Java." },
  { title: "Clique em Multijogador.", note: null },
  { title: "Adicione um novo servidor.", note: null },
  { title: "Cole o endereço do BatataMC.", note: null },
  { title: "Entre e jogue.", note: null },
] as const;
