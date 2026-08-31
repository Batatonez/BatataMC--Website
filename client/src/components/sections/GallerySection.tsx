/**
 * Mosaico institucional. Cada peça mostra a captura real quando ela existe e
 * mantém o espaço reservado quando o arquivo ainda não está disponível.
 */
import { galleryItems } from "@/data/siteData";
import { useImageFallback } from "@/hooks/useImageFallback";

export function GallerySection() {
  const { failed, markFailed } = useImageFallback();

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
          {galleryItems.map((item, index) => {
            const image =
              item.image && !failed.has(item.image) ? item.image : null;

            return (
              <figure
                key={item.id}
                className={`gallery-tile gallery-tile--${item.size}`}
                data-reveal="out"
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                {image ? (
                  <img
                    src={image}
                    alt={item.detail}
                    loading="lazy"
                    decoding="async"
                    onError={() => markFailed(image)}
                  />
                ) : (
                  <span className="gallery-pattern" aria-hidden="true" />
                )}
                <figcaption>
                  <strong>{item.label}</strong>
                  <span>{item.detail}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
