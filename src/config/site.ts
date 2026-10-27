export interface SiteConfig {
  PRODUCT_NAME: string;
  PRODUCT_SUBTITLE: string;
  PRODUCT_PRICE: string;
  CHECKOUT_URL: string;
  SUPPORT_EMAIL: string;
  PRODUCT_COVER_URL: string;
  SITE_URL: string;
  SOCIAL_IMAGE_URL: string;
  MEDIA: { heroVideo: string; heroPoster: string; tea: string; garden: string; master: string };
  INTERNAL_PREVIEWS: Array<{ src: string; alt: string; caption: string }>;
  DELIVERY_DESCRIPTION: string;
  LEGAL: { privacy: string; terms: string; refund: string; businessIdentity: string };
  TRACKING: { GA4_ID: string; TIKTOK_PIXEL_ID: string };
}

/** Edite este arquivo para conectar a página de destino e os dados comerciais reais. */
export const siteConfig: SiteConfig = {
  PRODUCT_NAME: "Os Saberes do Mestre da Montanha",
  PRODUCT_SUBTITLE: "Ervas, Chás e Tradições Ancestrais",
  PRODUCT_PRICE: "", // Ex.: "R$ 49,90". Vazio: nenhum preço é exibido.
  CHECKOUT_URL: "", // URL da página que será informada posteriormente (https://...).
  SUPPORT_EMAIL: "",
  PRODUCT_COVER_URL: "/media/livro-mockup.webp",
  SITE_URL: "", // URL pública final, para canonical e compartilhamento absoluto.
  SOCIAL_IMAGE_URL: "/media/mestre-na-montanha.webp",
  MEDIA: {
    heroVideo: "/media/mestre-jardim.mp4",
    heroPoster: "/media/jardim-poster.webp",
    tea: "/media/cha-na-montanha.webp",
    garden: "/media/jardim-da-montanha.webp",
    master: "/media/mestre-na-montanha.webp",
  },
  // Adicione somente capturas reais das páginas do livro. Nenhuma página foi inventada.
  INTERNAL_PREVIEWS: [],
  DELIVERY_DESCRIPTION: "", // Preencha após confirmar o processo real de entrega.
  LEGAL: { privacy: "", terms: "", refund: "", businessIdentity: "" },
  TRACKING: { GA4_ID: "", TIKTOK_PIXEL_ID: "" },
};
