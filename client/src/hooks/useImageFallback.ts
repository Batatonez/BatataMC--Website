/**
 * Guarda quais imagens falharam ao carregar para que a interface volte ao
 * placeholder desenhado em vez de exibir um ícone de imagem quebrada.
 */
import { useCallback, useState } from "react";

export function useImageFallback() {
  const [failed, setFailed] = useState<ReadonlySet<string>>(() => new Set());

  const markFailed = useCallback((src: string) => {
    setFailed(previous => {
      if (previous.has(src)) return previous;
      const next = new Set(previous);
      next.add(src);
      return next;
    });
  }, []);

  return { failed, markFailed };
}
