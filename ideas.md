# BatataMC — Direção visual V0

## Três caminhos possíveis

### Theme Name: Oficina Noturna
**Very Brief Intro:** Um universo escuro, gráfico e premium, onde o verde-lima proprietário encontra marcas de batata tostada e texturas de bloco. A energia é de um servidor privado bem cuidado: técnico, acolhedor e com personalidade.
**Probability:** 0.07

### Theme Name: Jardim de Minério
**Very Brief Intro:** Uma leitura mais orgânica e exploratória, com verdes de floresta, argila quente e composição de atlas/cartografia. Minecraft aparece pela sensação de descoberta, não por elementos literais.
**Probability:** 0.03

### Theme Name: Arena de Bolso
**Very Brief Intro:** Uma direção mais editorial e esportiva, com contraste carvão, creme e laranja queimado, recortes diagonais e tipografia condensada. Divertida e competitiva, sem virar e-sports genérico.
**Probability:** 0.09

## Abordagem escolhida: Oficina Noturna

### Design Movement
Neo-brutalismo editorial suavizado por materialidade digital: blocos, cortes retos, linhas de grade e contrastes controlados, equilibrados por espaços generosos, transparências pontuais e microinterações físicas.

### Core Principles
1. **Bloco com refinamento:** referências de Minecraft aparecem em bordas, recortes, grids e profundidade, nunca como pixel art dominante.
2. **Assimetria com intenção:** a página usa composições deslocadas e ritmos editoriais para parecer criada, não montada a partir de um template.
3. **Energia contida:** verde-lima e batata tostada funcionam como sinais de ação e calor, com glow mínimo e sem gradientes neon.
4. **Feito por amigos:** a interface é confiante, mas não corporativa; direta, acolhedora e ligeiramente brincalhona.

### Color Philosophy
O carvão quase preto cria um mundo noturno e concentrado. O verde-lima `#B7F34A` é a assinatura viva do BatataMC: legível, energético e fácil de reconhecer. O amarelo tostado `#E0A44A` aparece em pequenas doses como referência material à batata, trazendo calor humano ao sistema. Off-white e cinzas minerais garantem leitura e deixam os acentos respirarem.

### Layout Paradigm
Uma narrativa vertical em camadas: hero com palco visual deslocado para a direita, painel de status como uma “placa técnica” encaixada na transição, servidores organizados em composição de alturas diferentes, galeria em mosaico editorial e CTA final como uma grande placa de entrada. Em vez de uma grade centralizada repetitiva, cada seção alterna eixo, escala e densidade.

### Signature Elements
- Recortes de canto e linhas finas que lembram quinas de blocos lapidados.
- “Migalhas” geométricas flutuantes em verde e dourado, como partículas minerais.
- Selo circular/hexagonal de marca com um ícone abstrato de batata, sem mascote e sem texto minúsculo.

### Interaction Philosophy
Toda interação deve dar sensação de encaixe: botões comprimem levemente, cards elevam um bloco e revelam uma borda de acento, links ganham uma linha de trilha. A interface responde rápido e com discrição, premiando exploração sem transformar a página em brinquedo.

### Animation
Entradas usam opacity + translateY curto, escalonadas entre 40 e 70 ms. Cards usam transições de até 240 ms com easing `cubic-bezier(0.23, 1, 0.32, 1)`. Partículas do hero flutuam em ciclos lentos e quase imperceptíveis. O menu mobile abre como uma placa que desliza do topo. Todas as animações decorativas ficam dentro de `prefers-reduced-motion: no-preference`.

### Typography System
Títulos em **Barlow Condensed**, com caixa alta, pesos 700–900 e tracking levemente negativo para presença de placa/sinalização. Corpo e interface em **DM Sans**, pesos 400–700 para leitura contemporânea. Labels técnicos podem usar Barlow Condensed com tracking positivo. Nenhuma fonte pixelada será usada no texto principal.

### Brand Essence
**Posicionamento:** O servidor privado de Minecraft para quem quer construir, sobreviver e competir no mesmo lugar — feito por amigos, com espaço para cada jeito de jogar. **Personalidade:** artesanal, vibrante, próxima.

### Brand Voice
Headlines são curtas, confiantes e visuais. CTAs usam verbos claros. Microcopy pode sorrir, mas nunca infantiliza.

- “Seu próximo bloco começa aqui.”
- “Escolha um mundo. Faça dele seu.”

### Wordmark & Logo
Wordmark em caixa alta com “BATATA” mais pesado e “MC” em um selo compacto, acompanhado por um símbolo sem texto: uma forma oval facetada, levemente irregular, com dois cortes diagonais sugerindo uma batata lapidada e um bloco de minério.

### Signature Brand Color
**Verde Batata — `#B7F34A`**, um lime luminoso, seco e proprietário que funciona como sinal de navegação, ação e vida dentro do carvão.

## Style Decisions
- Manter `Oficina Noturna` em todas as seções: fundo carvão, acentos controlados e composição editorial assimétrica.
- Usar placeholders abstratos próprios para hero e galeria; não inserir imagens externas ou screenshots de outros servidores.
- Reservar o verde-lima para ações, estado online, bordas de destaque e pequenos detalhes de marca.
- Centralizar endereço, status mockado e dados de modos em `client/src/data/siteData.ts`.
- Preservar acessibilidade, foco visível e redução de movimento.
