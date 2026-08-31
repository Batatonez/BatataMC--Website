/**
 * Galeria da rede: duas colunas no desktop, uma no mobile, de modo que cada
 * par de capturas de um mesmo modo ocupe uma linha inteira.
 */
import { galleryItems } from "@/data/siteData";
import { useImageFallback } from "@/hooks/useImageFallback";

export function GallerySection() {
  const { failed, markFailed } = useImageFallback();
  const items = galleryItems.filter(item => !failed.has(item.src));

  if (items.length === 0) return null;

  return (
    <section id="galeria" className="section gallery">
      <div className="container">
        <div className="section-head" data-reveal="out">
          <div>
            <span className="tag">Galeria</span>
            <h2>
              Um pouco do <em>nosso mundo</em>
            </h2>
          </div>
          <p>
            Capturas feitas dentro da rede. Novas imagens entram aqui conforme
            os mundos crescem.
          </p>
        </div>

        <div className="gallery-grid">
          {items.map((item, index) => (
            <figure
              key={item.id}
              className="gallery-tile"
              data-reveal="out"
              style={{ transitionDelay: `${(index % 2) * 60}ms` }}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                onError={() => markFailed(item.src)}
              />
              <figcaption>{item.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
