"use client";

import { useEffect, useRef, useState } from "react";

const WHATSAPP =
  "https://wa.me/5531999424285?text=Ol%C3%A1%21%20Vim%20pelo%20site%20da%20Aocubo%20Fitness%20e%20gostaria%20de%20conhecer%20os%20modelos%20dispon%C3%ADveis.";

const looks = [
  {
    image: "/images/sabrina-front.jpg",
    eyebrow: "LOOK 01 — CONJUNTO SABRINA",
    color: "Preto essencial",
    price: "R$ 139,90",
    position: "64% 28%",
  },
  {
    image: "/images/hero-yellow.jpg",
    eyebrow: "LOOK 02 — MOVIMENTO",
    color: "Amarelo solar",
    price: "R$ 139,90",
    position: "50% 26%",
  },
  {
    image: "/images/sara-front.jpg",
    eyebrow: "LOOK 03 — SARA",
    color: "Pink statement",
    price: "R$ 139,90",
    position: "50% 26%",
  },
];

const products = [
  {
    name: "Conjunto Sara",
    category: "Conjuntos",
    price: "R$ 139,90",
    installment: "4x de R$ 38,00",
    badge: "NOVO",
    image: "/images/sara-front.jpg",
    hover: "/images/sara-back.jpg",
    colors: ["#ef2c96", "#111111", "#b58b75"],
  },
  {
    name: "Conjunto Flare Duda",
    category: "Conjuntos",
    price: "R$ 169,90",
    installment: "4x de R$ 46,00",
    badge: "DESTAQUE",
    image: "/images/hero-flare.jpg",
    hover: "/images/flare-group.jpg",
    colors: ["#111111", "#ece5dc", "#754134"],
  },
  {
    name: "Macaquinho Valéria",
    category: "Macaquinhos",
    price: "R$ 139,90",
    installment: "4x de R$ 38,00",
    badge: "BEST SELLER",
    image: "/images/valeria-front.jpg",
    hover: "/images/valeria-back.jpg",
    colors: ["#a45d4d", "#111111"],
  },
  {
    name: "Jaqueta Babylook",
    category: "Lifestyle",
    price: "R$ 129,90",
    installment: "4x de R$ 34,00",
    badge: "NOVO",
    image: "/images/jaqueta-front.jpg",
    hover: "/images/jaqueta-detail.jpg",
    colors: ["#f4f1eb", "#111111", "#caaea3"],
  },
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M6 8h12l1 12H5L6 8Z" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </svg>
  );
}

export default function Home() {
  const [activeLook, setActiveLook] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("pink");
  const cursorGlow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.14 },
    );
    document.querySelectorAll("[data-reveal]").forEach((node) => observer.observe(node));

    let frame = 0;
    const onPointerMove = (event: PointerEvent) => {
      if (!cursorGlow.current || event.pointerType === "touch") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        cursorGlow.current?.style.setProperty("--x", `${event.clientX}px`);
        cursorGlow.current?.style.setProperty("--y", `${event.clientY}px`);
      });
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <main>
      <div className="announcement">
        <span>Envios para todo o Brasil</span>
        <span className="announcement-dot" />
        <span>Compre pelo WhatsApp</span>
      </div>

      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a className="wordmark" href="#inicio" aria-label="Aocubo Fitness — início">
          AO<span>CUBO</span>
          <small>FITNESS</small>
        </a>

        <nav className={menuOpen ? "is-open" : ""} aria-label="Navegação principal">
          {[
            ["Início", "#inicio"],
            ["Novidades", "#novidades"],
            ["Conjuntos", "#novidades"],
            ["Macaquinhos", "#novidades"],
            ["Coleções", "#colecoes"],
            ["Contato", "#contato"],
          ].map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a href="#novidades" className="icon-button" aria-label="Buscar produtos">
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="6" />
              <path d="m16 16 4 4" />
            </svg>
          </a>
          <a href={WHATSAPP} className="bag-button" aria-label="Falar com a loja sobre sua sacola">
            <BagIcon />
            <span>0</span>
          </a>
          <button
            className="menu-button"
            type="button"
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-image-stage" aria-live="polite">
          {looks.map((look, index) => (
            <div
              className={`hero-image ${activeLook === index ? "is-active" : ""}`}
              key={look.image}
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(12,12,11,.78) 0%, rgba(12,12,11,.22) 48%, rgba(12,12,11,.08) 100%), url(${look.image})`,
                backgroundPosition: look.position,
              }}
            />
          ))}
        </div>
        <div className="hero-grain" />

        <div className="hero-content">
          <p className="kicker hero-enter delay-1">Fitness · Lifestyle · Performance</p>
          <h1 className="hero-enter delay-2">
            Seu movimento.
            <br />
            <em>Seu estilo.</em>
          </h1>
          <p className="hero-copy hero-enter delay-3">
            Roupas que acompanham seu treino, sua rotina e a mulher que você escolhe ser.
          </p>
          <div className="hero-ctas hero-enter delay-4">
            <a className="button button-light" href="#novidades">
              Ver coleção <ArrowIcon />
            </a>
            <a className="text-link" href="#manifesto">
              Conhecer a Aocubo
            </a>
          </div>
        </div>

        <div className="look-hotspot" style={{ top: "46%", right: "17%" }}>
          <span className="hotspot-pulse" />
          <div className="hotspot-card">
            <small>{looks[activeLook].color}</small>
            <strong>{looks[activeLook].eyebrow.replace(/LOOK \d+ — /, "")}</strong>
            <span>{looks[activeLook].price}</span>
            <a href={WHATSAPP}>Ver peça</a>
          </div>
        </div>

        <div className="look-switcher" aria-label="Selecionar look em destaque">
          {looks.map((look, index) => (
            <button
              type="button"
              key={look.eyebrow}
              className={activeLook === index ? "is-active" : ""}
              onClick={() => setActiveLook(index)}
              aria-label={`Mostrar ${look.eyebrow}`}
            >
              <span>0{index + 1}</span>
              <i />
            </button>
          ))}
        </div>

        <div className="hero-scroll">Role para descobrir <span /></div>
      </section>

      <section className="manifesto" id="manifesto">
        <div className="manifesto-index">01 / AOCUBO</div>
        <div data-reveal>
          <p className="kicker dark">Vista-se com propósito</p>
          <h2>
            Performance no corpo.
            <br />
            <em>Confiança no movimento.</em>
          </h2>
        </div>
        <p className="manifesto-copy" data-reveal>
          Modelagens que valorizam, cores que expressam e versatilidade para você ir do treino ao resto do dia sem trocar quem você é.
        </p>
      </section>

      <section className="shop-look" id="colecoes">
        <div className="shop-look-visual" data-reveal>
          <img src="/images/sara-front.jpg" alt="Modelo usando o Conjunto Sara pink da Aocubo Fitness" />
          <div className="visual-tag">LOOK 03</div>
        </div>

        <div className="shop-look-panel" data-reveal>
          <p className="section-number">02</p>
          <p className="kicker dark">Shop the look</p>
          <h2>Sara, para quem chega sem passar despercebida.</h2>
          <p className="shop-description">
            Conjunto completo em pink intenso. Um look de presença, com top e short coordenados.
          </p>

          <div className="look-product-row">
            <div>
              <small>LOOK COMPLETO</small>
              <strong>Conjunto Sara</strong>
            </div>
            <strong>R$ 139,90</strong>
          </div>
          <div className="choice-row">
            <div>
              <span>Cor</span>
              <button
                className={`color-chip pink ${selectedColor === "pink" ? "is-selected" : ""}`}
                type="button"
                aria-label="Pink"
                aria-pressed={selectedColor === "pink"}
                onClick={() => setSelectedColor("pink")}
              />
              <button
                className={`color-chip black ${selectedColor === "black" ? "is-selected" : ""}`}
                type="button"
                aria-label="Preto"
                aria-pressed={selectedColor === "black"}
                onClick={() => setSelectedColor("black")}
              />
            </div>
            <div className="sizes">
              <span>Tamanhos</span>
              {['M', 'G'].map((size) => (
                <button
                  type="button"
                  key={size}
                  className={selectedSize === size ? "is-selected" : ""}
                  aria-pressed={selectedSize === size}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <a className="button button-dark full" href={WHATSAPP}>
            Comprar look <ArrowIcon />
          </a>
          <small className="payment-note">Ou 4x de R$ 38,00</small>
        </div>
      </section>

      <section className="products-section" id="novidades">
        <div className="section-heading" data-reveal>
          <div>
            <p className="kicker dark">Drop atual</p>
            <h2>Novos looks</h2>
          </div>
          <p>Peças feitas para acompanhar o seu ritmo.</p>
          <a href={WHATSAPP} className="line-link">
            Ver todos <ArrowIcon />
          </a>
        </div>

        <div className="product-grid">
          {products.map((product, index) => (
            <article className="product-card" key={product.name} data-reveal style={{ transitionDelay: `${index * 70}ms` }}>
              <a className="product-image" href={WHATSAPP} aria-label={`Comprar ${product.name}`}>
                <img src={product.image} alt={`${product.name} da Aocubo Fitness`} loading={index > 1 ? "lazy" : "eager"} />
                <img className="hover-image" src={product.hover} alt="" loading="lazy" />
                <span className="product-badge">{product.badge}</span>
                <span className="quick-action">Quero este look <ArrowIcon /></span>
              </a>
              <div className="product-info">
                <div>
                  <small>{product.category}</small>
                  <h3>{product.name}</h3>
                  <div className="color-list" aria-label="Cores disponíveis">
                    {product.colors.map((color) => (
                      <span key={color} style={{ background: color }} />
                    ))}
                  </div>
                </div>
                <div className="price-block">
                  <strong>{product.price}</strong>
                  <small>{product.installment}</small>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="categories-section" aria-labelledby="categories-title">
        <div className="categories-intro" data-reveal>
          <p className="section-number">03 / CATEGORIAS</p>
          <h2 id="categories-title">
            Vista do seu jeito.
            <br />
            <em>Todos os dias.</em>
          </h2>
        </div>
        <div className="category-mosaic">
          <a className="category-tile tile-large" href={WHATSAPP} data-reveal>
            <img src="/images/flare-group.jpg" alt="Modelos usando conjuntos flare da Aocubo Fitness" loading="lazy" />
            <span>01</span>
            <div><strong>Conjuntos</strong><small>Ver seleção</small></div>
          </a>
          <a className="category-tile tile-tall" href={WHATSAPP} data-reveal>
            <img src="/images/valeria-front.jpg" alt="Macaquinho Valéria da Aocubo Fitness" loading="lazy" />
            <span>02</span>
            <div><strong>Macaquinhos</strong><small>Ver seleção</small></div>
          </a>
          <a className="category-tile tile-small" href={WHATSAPP} data-reveal>
            <img src="/images/brenda-front.jpg" alt="Top e short da Aocubo Fitness" loading="lazy" />
            <span>03</span>
            <div><strong>Tops & shorts</strong><small>Ver seleção</small></div>
          </a>
          <a className="category-tile tile-wide" href={WHATSAPP} data-reveal>
            <img src="/images/jaqueta-front.jpg" alt="Jaqueta Babylook branca da Aocubo Fitness" loading="lazy" />
            <span>04</span>
            <div><strong>Lifestyle</strong><small>Ver seleção</small></div>
          </a>
        </div>
      </section>

      <section className="movement-banner">
        <img src="/images/leandra-studio.jpg" alt="Campanha Aocubo Fitness em estúdio de movimento" loading="lazy" />
        <div className="movement-overlay" />
        <div className="movement-copy" data-reveal>
          <p className="kicker">Aocubo em movimento</p>
          <h2>Feito para se mover<br />com você.</h2>
          <p>Conforto, estilo e confiança dentro e fora da academia.</p>
          <a className="button button-light" href={WHATSAPP}>Descubra a coleção <ArrowIcon /></a>
        </div>
      </section>

      <section className="benefits-section">
        <div className="benefits-head" data-reveal>
          <p className="section-number">04 / O QUE VESTE VOCÊ</p>
          <h2>Intenção em cada detalhe.</h2>
          <p>Características informadas no catálogo para os conjuntos selecionados.</p>
        </div>
        <div className="benefits-grid">
          {[
            ["01", "Alta compressão", "Estrutura que acompanha o corpo durante o movimento."],
            ["02", "Zero transparência", "Mais segurança para treinar com confiança."],
            ["03", "Proteção UV 50+", "Proteção indicada no catálogo dos conjuntos."],
            ["04", "Bojo removível", "Versatilidade para vestir do seu jeito."],
          ].map(([number, title, copy], index) => (
            <article key={title} data-reveal style={{ transitionDelay: `${index * 60}ms` }}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="favorites-section">
        <div className="favorite-editorial" data-reveal>
          <div className="favorite-image-stack">
            <img src="/images/aline-front.jpg" alt="Macacão Aline marrom visto de frente" loading="lazy" />
            <img src="/images/aline-back.jpg" alt="Macacão Aline marrom visto de costas" loading="lazy" />
          </div>
          <div className="favorite-copy">
            <p className="kicker dark">Os favoritos da Aocubo</p>
            <h2>Macacão Aline</h2>
            <p>Uma peça, presença completa. Marrom profundo e silhueta que acompanha o corpo.</p>
            <div className="favorite-price"><strong>R$ 149,90</strong><span>4x de R$ 42,00</span></div>
            <a className="button button-dark" href={WHATSAPP}>Quero este look <ArrowIcon /></a>
          </div>
        </div>
      </section>

      <section className="instagram-section">
        <div className="instagram-head" data-reveal>
          <div>
            <p className="kicker dark">Inspire-se. Vista-se. Movimente-se.</p>
            <h2>#AOCUBOFITNESS</h2>
          </div>
          <a className="line-link" href="https://www.instagram.com/aocubofitness/" target="_blank" rel="noreferrer">
            Siga @aocubofitness <ArrowIcon />
          </a>
        </div>
        <div className="instagram-grid">
          {[
            ["/images/sabrina-group.jpg", "Modelos usando looks Aocubo Fitness"],
            ["/images/short-back.jpg", "Macaquinho amarelo da Aocubo Fitness"],
            ["/images/leandra-flat.jpg", "Peças Aocubo Fitness em cores neutras"],
            ["/images/valeria-back.jpg", "Macaquinho Valéria visto de costas"],
          ].map(([src, alt], index) => (
            <a href="https://www.instagram.com/aocubofitness/" target="_blank" rel="noreferrer" key={src} data-reveal style={{ transitionDelay: `${index * 55}ms` }}>
              <img src={src} alt={alt} loading="lazy" />
              <span>@aocubofitness</span>
            </a>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <img src="/images/sabrina-group.jpg" alt="Duas modelos usando looks pretos da Aocubo Fitness" loading="lazy" />
        <div className="final-cta-overlay" />
        <div data-reveal>
          <p className="kicker">Seu próximo look começa aqui</p>
          <h2>Encontre o look<br />que combina com você.</h2>
          <a className="button button-light" href={WHATSAPP}>Ver todos os looks <ArrowIcon /></a>
        </div>
      </section>

      <footer className="site-footer" id="contato">
        <div className="footer-top">
          <a className="footer-wordmark" href="#inicio">AO<strong>CUBO</strong><small>FITNESS</small></a>
          <p>Moda fitness feminina feita para acompanhar sua rotina, seu treino e sua personalidade.</p>
          <a className="footer-whatsapp" href={WHATSAPP}>Fale com a loja <ArrowIcon /></a>
        </div>
        <div className="footer-grid">
          <div>
            <small>COLEÇÕES</small>
            <a href="#novidades">Novidades</a><a href="#novidades">Conjuntos</a><a href="#colecoes">Macaquinhos</a><a href="#colecoes">Lifestyle</a>
          </div>
          <div>
            <small>ATENDIMENTO</small>
            <a href={WHATSAPP}>WhatsApp</a><a href="https://www.instagram.com/aocubofitness/" target="_blank" rel="noreferrer">Instagram</a><a href={WHATSAPP}>Trocas e dúvidas</a>
          </div>
          <div>
            <small>LOJA FÍSICA</small>
            <p>Av. Brasília, 2342 — Loja 5<br />Amaro Lanari · MG</p>
          </div>
          <div>
            <small>FACILIDADES</small>
            <p>Envios para todo o Brasil<br />Pagamento em até 4x</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 AOCUBO FITNESS</span>
          <span>VISTA-SE COM PROPÓSITO</span>
        </div>
      </footer>

      <div className="cursor-glow" ref={cursorGlow} aria-hidden="true" />

      <a className="whatsapp-float" href={WHATSAPP} aria-label="Falar com a Aocubo Fitness no WhatsApp">
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M20 11.7a8 8 0 0 1-11.8 7L4 20l1.3-4A8 8 0 1 1 20 11.7Z" />
          <path d="M9 8.2c.3 2.8 2 4.5 4.8 4.8l1.1-1.1 2 .8-.3 2.1c-4.4 1.2-8.6-3-7.4-7.4l2.1-.3.8 2L11 10.2" />
        </svg>
      </a>
    </main>
  );
}
