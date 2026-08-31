/**
 * Cenário do hero: blocos isométricos flutuando devagar sobre o fundo escuro.
 * Desenhado em canvas (sem dependência externa), com contagem proporcional à
 * largura, pausa quando a aba está oculta e quadro estático quando o usuário
 * pede menos movimento.
 */
import { useEffect, useRef } from "react";

type Block = {
  x: number;
  y: number;
  size: number;
  /** 0 = distante e apagado, 1 = próximo e nítido. */
  depth: number;
  speed: number;
  drift: number;
  phase: number;
  tone: number;
};

const TONES = [
  { r: 183, g: 243, b: 74 }, // verde BatataMC
  { r: 224, g: 164, b: 74 }, // dourado tostado
  { r: 156, g: 176, b: 152 }, // mineral neutro
];

function createBlocks(width: number, height: number): Block[] {
  const count = Math.min(22, Math.max(9, Math.round(width / 110)));

  return Array.from({ length: count }, () => {
    const depth = Math.random();
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      size: 10 + depth * 26,
      depth,
      speed: 4 + depth * 9,
      drift: (Math.random() - 0.5) * 6,
      phase: Math.random() * Math.PI * 2,
      // O neutro domina; os acentos aparecem em minoria.
      tone: Math.random() < 0.26 ? (Math.random() < 0.6 ? 0 : 1) : 2,
    };
  });
}

function drawBlock(ctx: CanvasRenderingContext2D, block: Block, time: number) {
  const tone = TONES[block.tone];
  const w = block.size;
  const h = block.size * 0.52;
  const body = block.size * 0.86;
  const x = block.x + Math.sin(time * 0.00016 + block.phase) * 14;
  const y = block.y;
  const alpha = 0.05 + block.depth * 0.16;

  const face = (points: Array<[number, number]>, shade: number) => {
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i += 1)
      ctx.lineTo(points[i][0], points[i][1]);
    ctx.closePath();
    ctx.fillStyle = `rgba(${tone.r}, ${tone.g}, ${tone.b}, ${alpha * shade})`;
    ctx.fill();
  };

  face(
    [
      [x, y - h],
      [x + w, y],
      [x, y + h],
      [x - w, y],
    ],
    1.6
  );
  face(
    [
      [x - w, y],
      [x, y + h],
      [x, y + h + body],
      [x - w, y + body],
    ],
    0.55
  );
  face(
    [
      [x + w, y],
      [x, y + h],
      [x, y + h + body],
      [x + w, y + body],
    ],
    0.95
  );

  ctx.strokeStyle = `rgba(${tone.r}, ${tone.g}, ${tone.b}, ${alpha * 1.1})`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x, y - h);
  ctx.lineTo(x + w, y);
  ctx.lineTo(x, y + h);
  ctx.lineTo(x - w, y);
  ctx.closePath();
  ctx.stroke();
}

export function BlockField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let blocks: Block[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let last = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      blocks = createBlocks(width, height);
    };

    const paint = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      blocks.forEach(block => drawBlock(ctx, block, time));
    };

    const step = (time: number) => {
      const delta = last === 0 ? 0 : Math.min((time - last) / 1000, 0.05);
      last = time;

      blocks.forEach(block => {
        block.y -= block.speed * delta;
        block.x += block.drift * delta;
        if (block.y < -block.size * 2.4) {
          block.y = height + block.size * 2.4;
          block.x = Math.random() * width;
        }
        if (block.x < -block.size * 2) block.x = width + block.size * 2;
        if (block.x > width + block.size * 2) block.x = -block.size * 2;
      });

      paint(time);
      frame = window.requestAnimationFrame(step);
    };

    const start = () => {
      if (frame !== 0 || motionQuery.matches) return;
      last = 0;
      frame = window.requestAnimationFrame(step);
    };

    const stop = () => {
      if (frame === 0) return;
      window.cancelAnimationFrame(frame);
      frame = 0;
    };

    const onVisibility = () =>
      document.visibilityState === "visible" ? start() : stop();
    const onMotionChange = () => {
      stop();
      if (motionQuery.matches) paint(0);
      else start();
    };
    const onResize = () => {
      resize();
      paint(0);
    };

    resize();
    paint(0);
    if (!motionQuery.matches) start();

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    motionQuery.addEventListener("change", onMotionChange);

    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      motionQuery.removeEventListener("change", onMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="block-field" aria-hidden="true" />;
}
