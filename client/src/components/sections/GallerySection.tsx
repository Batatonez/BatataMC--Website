/**
 * Mosaico preparado para receber screenshots reais. Enquanto `image` for `null`,
 * cada peça mantém o espaço reservado sem fingir conteúdo.
 */
import { galleryItems } from "@/data/siteData";

export function GallerySection() {
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
            As próximas memórias entram aqui. Por enquanto, o espaço fica pronto
            para elas.
          </p>
        </div>

        <div className="gallery-grid">
          {galleryItems.map((item, index) => (
            <figure
              key={item.id}
              className={`gallery-tile gallery-tile--${item.size}`}
              data-reveal="out"
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              {item.image ? (
                <img src={item.image} alt={item.detail} loading="lazy" />
              ) : (
                <span className="gallery-pattern" aria-hidden="true" />
              )}
              <figcaption>
                <strong>{item.label}</strong>
                <span>{item.detail}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
