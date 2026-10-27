import { useState } from "react";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  CheckIcon,
  Cross2Icon,
  HamburgerMenuIcon,
  PlusIcon,
  ReaderIcon,
} from "@radix-ui/react-icons";
import { siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { Arrow, Brand, EditorialImage, MountainMark, SectionLabel } from "./primitives";
import { DestinationLink } from "./destination-link";
import { HeroVideo } from "./hero-video";
import { TrackingConsent } from "./tracking-consent";

const questions = [
  "Você sabe qual é a diferença entre infusão e decocção?",
  "Por que um mesmo nome popular pode se referir a plantas diferentes?",
  "O que a luz, a água e o solo nos ensinam sobre o cultivo?",
  "Onde a tradição encontra as perguntas da ciência?",
];

const themes = [
  {
    number: "01",
    label: "PREPARAR",
    title: "O universo dos chás",
    text: "Aromas, gestos e diferentes formas de preparo. Um convite à curiosidade sobre as infusões e suas tradições.",
  },
  {
    number: "02",
    label: "OBSERVAR",
    title: "A linguagem das plantas",
    text: "Folhas, flores, raízes e texturas. A natureza oferece detalhes que merecem um olhar mais atento.",
  },
  {
    number: "03",
    label: "CULTIVAR",
    title: "O jardim do aprendiz",
    text: "Da semente ao primeiro broto, o cultivo nos aproxima dos ritmos e das necessidades de cada planta.",
  },
  {
    number: "04",
    label: "COMPREENDER",
    title: "Tradição e conhecimento",
    text: "A sabedoria tradicional como ponto de partida para boas perguntas, observação cuidadosa e respeito às evidências.",
  },
];

function Header() {
  const [open, setOpen] = useState(false);
  const items = [
    { href: "#livro", label: "O livro" },
    { href: "#universo", label: "O universo" },
    { href: "#mestre", label: "O mestre" },
  ];
  return (
    <header className="site-header">
      <div className="page-width flex items-center justify-between gap-5">
        <Brand light />
        <nav className="hidden items-center gap-9 md:flex" aria-label="Navegação principal">
          {items.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>
        <a href="#livro" className="header-cta hidden sm:inline-flex">
          Conhecer o livro <Arrow />
        </a>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={open ? "mobile-menu" : undefined}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="menu-toggle md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <Cross2Icon /> : <HamburgerMenuIcon />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Navegação móvel"
          className="mobile-menu md:hidden"
          onKeyDown={(event) => {
            if (event.key === "Escape") setOpen(false);
          }}
        >
          {items.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
              <Arrow />
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function BookCover({ location }: { location: string }) {
  return (
    <DestinationLink
      location={location}
      className="book-cover-link"
      label="Conhecer a página de Os Saberes do Mestre da Montanha"
    >
      <EditorialImage
        src={siteConfig.PRODUCT_COVER_URL}
        alt="Capa de Os Saberes do Mestre da Montanha — Ervas, Chás e Tradições Ancestrais"
        width={1440}
        height={1080}
        loading="lazy"
        className="book-cover"
      />
      <span className="book-cover-hint">
        Explore esta leitura <Arrow />
      </span>
    </DestinationLink>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-width">
        <div className="footer-top">
          <Brand />
          <p>
            Um olhar mais atento.
            <br />
            Um saber de cada vez.
          </p>
          <a href="#inicio" className="back-top">
            VOLTAR AO TOPO <Arrow />
          </a>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {siteConfig.PRODUCT_NAME}.
          </p>
          <nav aria-label="Informações e contato">
            {siteConfig.SUPPORT_EMAIL && (
              <a href={`mailto:${siteConfig.SUPPORT_EMAIL}`}>Contato e suporte</a>
            )}
            {siteConfig.LEGAL.privacy && <a href={siteConfig.LEGAL.privacy}>Privacidade</a>}
            {siteConfig.LEGAL.terms && <a href={siteConfig.LEGAL.terms}>Termos de uso</a>}
            {siteConfig.LEGAL.refund && <a href={siteConfig.LEGAL.refund}>Reembolso</a>}
          </nav>
          <span>LIVRO DIGITAL · CONTEÚDO EDUCATIVO</span>
        </div>
        <p className="educational-note">
          O Mestre da Montanha é um personagem virtual e ficcional. Este material tem finalidade
          educativa e não substitui orientação profissional. Tradições não constituem, por si só,
          comprovação científica de benefícios.
        </p>
        {siteConfig.LEGAL.businessIdentity && (
          <p className="educational-note">{siteConfig.LEGAL.businessIdentity}</p>
        )}
      </div>
    </footer>
  );
}

export function HomePage() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <main id="conteudo">
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <HeroVideo />
          <div className="hero-shade" />
          <Header />
          <div className="page-width hero-content">
            <SectionLabel light>OS SABERES DO MESTRE DA MONTANHA</SectionLabel>
            <h1 id="hero-title">
              Uma jornada pelo
              <br className="hidden lg:block" /> universo das ervas,
              <br className="hidden lg:block" /> dos chás e dos
              <br className="hidden lg:block" /> <em>saberes da natureza.</em>
            </h1>
            <p className="hero-description">
              Um livro digital para quem encontra na natureza
              <br className="hidden lg:block" /> a vontade de observar, aprender e descobrir.
            </p>
            <a
              href="#livro"
              className="button button-saffron"
              onClick={() =>
                trackEvent("cta_click", { location: "hero", destination: "book_section" })
              }
            >
              Quero conhecer o livro <Arrow />
            </a>
            <p className="hero-micro">
              <ReaderIcon aria-hidden="true" />
              Uma leitura para fazer no seu tempo.
            </p>
          </div>
          <div className="hero-bottom page-width">
            <a href="#descobrir" className="scroll-invitation">
              <span>HÁ UM MUNDO PARA DESCOBRIR</span>
              <ArrowDownIcon aria-hidden="true" />
            </a>
            <span className="hero-side-note">Natureza. Curiosidade. Conhecimento.</span>
          </div>
        </section>
        <div className="editorial-strip" aria-label="Temas do universo do livro">
          <span>ERVAS & AROMAS</span>
          <i />
          <span>O TEMPO DA NATUREZA</span>
          <i />
          <span>TRADIÇÕES ANCESTRAIS</span>
          <i className="hidden sm:block" />
          <span className="hidden sm:block">UM NOVO OLHAR</span>
        </div>

        <section
          id="descobrir"
          className="section-space page-width curiosity"
          aria-labelledby="curiosity-title"
        >
          <div className="curiosity-copy">
            <SectionLabel>O COMEÇO DE TODA DESCOBERTA</SectionLabel>
            <h2 id="curiosity-title">
              Há muito mais para
              <br /> descobrir em
              <br />
              <em>uma simples folha.</em>
            </h2>
            <p>
              Um aroma que desperta a memória. Uma folha que você nunca tinha notado. O cuidado de
              preparar uma xícara de chá.
            </p>
            <p>Quando diminuímos o passo, a natureza nos convida a fazer perguntas.</p>
            <div className="curiosity-questions">
              {questions.map((question, index) => (
                <div key={question}>
                  <span>0{index + 1}</span>
                  <p>{question}</p>
                  <ArrowRightIcon aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
          <figure className="tea-figure">
            <EditorialImage
              src={siteConfig.MEDIA.tea}
              alt="Vapor subindo de uma xícara de chá, ervas frescas e um caderno junto à janela"
              width={1376}
              height={768}
              loading="lazy"
            />
            <figcaption>
              <span>UM INSTANTE DE PRESENÇA</span>
              <span>O extraordinário mora nos detalhes.</span>
            </figcaption>
            <div className="photo-note">
              <span>Devagar.</span>
              <p>
                Há coisas que só se revelam
                <br />a quem aprende a observar.
              </p>
            </div>
          </figure>
        </section>

        <section id="universo" className="universe section-space" aria-labelledby="universe-title">
          <div className="page-width">
            <div className="section-heading grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
              <div>
                <SectionLabel>UM UNIVERSO, DIFERENTES OLHARES</SectionLabel>
                <h2 id="universe-title">
                  Conhecimento para observar,
                  <br />
                  <em>compreender e descobrir.</em>
                </h2>
              </div>
              <p className="section-intro">
                Ervas, chás e tradições ancestrais são o ponto de partida. A curiosidade é o fio que
                conecta esse universo — do primeiro aroma às perguntas que ficam.
              </p>
            </div>
            <div className="themes-grid">
              {themes.map((theme) => (
                <article className="theme" key={theme.number}>
                  <div className="theme-top">
                    <span className="theme-number">{theme.number}</span>
                    <span className="eyebrow">{theme.label}</span>
                  </div>
                  <h3>{theme.title}</h3>
                  <p>{theme.text}</p>
                </article>
              ))}
            </div>
            <figure className="garden-panorama">
              <EditorialImage
                src={siteConfig.MEDIA.garden}
                alt="Pequena muda em um vaso de terracota, em um jardim de ervas entre montanhas"
                width={1376}
                height={768}
                loading="lazy"
              />
              <figcaption>
                <span>UM CONVITE A CULTIVAR A CURIOSIDADE</span>
                <p>
                  Todo saber começa
                  <br />
                  <em>com um pequeno broto.</em>
                </p>
              </figcaption>
            </figure>
          </div>
        </section>

        <section
          id="livro"
          className="section-space page-width book-introduction"
          aria-labelledby="book-title"
        >
          <div className="book-display">
            <span className="book-display-label">UMA JORNADA EM FORMATO DIGITAL</span>
            <BookCover location="book_preview" />
            <span className="book-display-footer">
              <ReaderIcon aria-hidden="true" />
              LIVRO DIGITAL
              <span className="small-divider" />
              LEITURA CONTEMPLATIVA
            </span>
          </div>
          <div className="book-copy">
            <SectionLabel>CONHEÇA A OBRA</SectionLabel>
            <h2 id="book-title">
              Entre nas páginas
              <br />
              dos Saberes do
              <br />
              <em>Mestre da Montanha.</em>
            </h2>
            <p className="book-subtitle">{siteConfig.PRODUCT_SUBTITLE}</p>
            <p>
              Um convite para se aproximar do universo das plantas e das tradições, com o olhar
              curioso de quem sempre tem algo novo a aprender.
            </p>
            <p>
              Uma narrativa que valoriza o tempo, a observação e a relação entre o ser humano e a
              natureza.
            </p>
            <DestinationLink location="book_intro" className="text-link">
              Quero explorar esta leitura <Arrow />
            </DestinationLink>
            <p className="book-caption">Na imagem, a capa do livro digital.</p>
          </div>
          {siteConfig.INTERNAL_PREVIEWS.length > 0 && (
            <div className="internal-previews">
              {siteConfig.INTERNAL_PREVIEWS.map((preview) => (
                <figure key={preview.src}>
                  <EditorialImage src={preview.src} alt={preview.alt} loading="lazy" />
                  <figcaption>{preview.caption}</figcaption>
                </figure>
              ))}
            </div>
          )}
        </section>

        <section id="mestre" className="master-section" aria-labelledby="master-title">
          <div className="master-photo">
            <EditorialImage
              src={siteConfig.MEDIA.master}
              alt="Mestre da Montanha, personagem ficcional, em um terraço com ervas e montanhas cobertas de névoa"
              width={1376}
              height={768}
              loading="lazy"
            />
          </div>
          <div className="master-copy">
            <SectionLabel light>QUEM CONDUZ ESTA JORNADA</SectionLabel>
            <h2 id="master-title">
              Um convite para
              <br />
              aprender a olhar
              <br />
              <em>de outra maneira.</em>
            </h2>
            <p>
              O Mestre da Montanha conduz uma jornada narrativa pelo universo das plantas, dos chás
              e das tradições.
            </p>
            <p>
              Por aqui, a curiosidade caminha ao lado da prudência. O conhecimento tradicional
              inspira perguntas, sem deixar de reconhecer a importância das evidências.
            </p>
            <div className="fiction-note">
              <MountainMark />
              <p>
                O Mestre da Montanha é um personagem virtual e ficcional que dá vida ao universo
                narrativo do livro.
              </p>
            </div>
          </div>
        </section>

        <section className="section-space page-width audience" aria-labelledby="audience-title">
          <div>
            <SectionLabel>ESTA JORNADA É PARA VOCÊ?</SectionLabel>
            <h2 id="audience-title">
              Para quem cultiva
              <br />
              <em>a vontade de aprender.</em>
            </h2>
            <p>
              Você não precisa saber tudo sobre plantas.
              <br />A curiosidade já é um bom começo.
            </p>
          </div>
          <ul>
            {[
              "Tem interesse por plantas, ervas aromáticas e chás.",
              "Sente curiosidade pelos métodos tradicionais de preparo.",
              "Gosta de observar a natureza e acompanhar o cultivo.",
              "Quer refletir sobre tradição, conhecimento e ciência.",
              "Procura uma leitura temática em um ritmo mais contemplativo.",
            ].map((item) => (
              <li key={item}>
                <CheckIcon aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="edicao-digital"
          className="offer-section section-space"
          aria-labelledby="offer-title"
        >
          <div className="page-width offer-grid">
            <div className="offer-copy">
              <SectionLabel light>SEU PRÓXIMO PASSO</SectionLabel>
              <h2 id="offer-title">
                Continue sua jornada
                <br />
                pelos Saberes do
                <br />
                <em>Mestre da Montanha.</em>
              </h2>
              <p>
                Se este universo despertou sua curiosidade, conheça a edição digital e descubra uma
                nova companhia para os seus momentos de leitura.
              </p>
              <div className="offer-product">
                <span className="eyebrow">LIVRO DIGITAL</span>
                <h3>{siteConfig.PRODUCT_NAME}</h3>
                <p>{siteConfig.PRODUCT_SUBTITLE}</p>
              </div>
              {siteConfig.PRODUCT_PRICE && (
                <p className="product-price">{siteConfig.PRODUCT_PRICE}</p>
              )}
              <DestinationLink location="offer" className="button button-saffron">
                Quero acessar o livro <Arrow />
              </DestinationLink>
              <p className="offer-micro">Uma pausa na rotina. Um encontro com a curiosidade.</p>
            </div>
            <div className="offer-book">
              <div className="book-orbit" aria-hidden="true" />
              <BookCover location="offer_cover" />
              <span className="offer-edition">
                OS SABERES DO MESTRE DA MONTANHA<span>Ervas, Chás e Tradições Ancestrais</span>
              </span>
            </div>
          </div>
        </section>

        <section
          id="perguntas"
          className="section-space page-width faq-section"
          aria-labelledby="faq-title"
        >
          <div>
            <SectionLabel>ANTES DE SEGUIR</SectionLabel>
            <h2 id="faq-title">
              Talvez você
              <br />
              <em>esteja se perguntando.</em>
            </h2>
            <p>
              Algumas respostas para conhecer
              <br className="hidden md:block" /> melhor esta leitura.
            </p>
          </div>
          <div className="faq-list">
            {[
              {
                question: "O que é Os Saberes do Mestre da Montanha?",
                answer:
                  "É um livro digital intitulado Os Saberes do Mestre da Montanha — Ervas, Chás e Tradições Ancestrais. Seu universo narrativo é conduzido pelo Mestre da Montanha, um personagem virtual e ficcional.",
              },
              {
                question: "Quais assuntos inspiram o livro?",
                answer:
                  "A proposta temática reúne o universo das ervas, dos chás e das tradições ancestrais, com uma narrativa de curiosidade e observação da natureza. A capa apresentada é a do produto; amostras internas serão incluídas quando estiverem disponíveis.",
              },
              {
                question: "O produto é digital?",
                answer:
                  "Sim. Trata-se de um livro digital. A imagem de um livro físico é uma representação visual da capa; esta página não oferece uma edição impressa.",
              },
              {
                question: "Como recebo o material após a compra?",
                answer:
                  siteConfig.DELIVERY_DESCRIPTION ||
                  "As instruções de entrega e as condições de acesso serão apresentadas na página de compra, quando ela estiver disponível. Consulte essas informações antes de concluir seu pedido.",
              },
              {
                question: "O livro oferece orientações médicas?",
                answer:
                  "O material tem finalidade educativa e não promete prevenir ou tratar doenças, nem substitui orientação profissional. A identificação correta e a segurança das plantas precisam ser consideradas antes de qualquer utilização.",
              },
            ].map((item) => (
              <details key={item.question}>
                <summary>
                  {item.question}
                  <PlusIcon aria-hidden="true" />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="closing-section" aria-labelledby="closing-title">
          <EditorialImage
            src={siteConfig.MEDIA.garden}
            alt="Jardim de ervas à luz da manhã nas montanhas"
            width={1376}
            height={768}
            loading="lazy"
          />
          <div className="closing-shade" />
          <div className="closing-copy page-width">
            <SectionLabel light>DEIXE A CURIOSIDADE GUIAR</SectionLabel>
            <h2 id="closing-title">
              Toda jornada de conhecimento
              <br />
              começa com <em>uma pergunta.</em>
            </h2>
            <p>Dê o próximo passo. Conheça Os Saberes do Mestre da Montanha.</p>
            <DestinationLink location="final" className="button button-saffron">
              Conhecer o livro digital <Arrow />
            </DestinationLink>
          </div>
        </section>
      </main>
      <Footer />
      <div className="mobile-purchase">
        <span>
          Os Saberes do
          <br />
          <strong>Mestre da Montanha</strong>
        </span>
        <DestinationLink location="mobile_fixed" className="button button-dark">
          Conhecer o livro <Arrow />
        </DestinationLink>
      </div>
      <TrackingConsent />
    </>
  );
}
