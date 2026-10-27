import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../montanha.css?url";
import { siteConfig } from "../config/site";
import { absoluteAsset } from "../lib/destination";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Este caminho não está disponível. Volte para conhecer o livro.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          A página não carregou
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Tente carregar novamente ou volte ao início para continuar sua jornada.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Voltar ao início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${siteConfig.PRODUCT_NAME} — ${siteConfig.PRODUCT_SUBTITLE}` },
      {
        name: "description",
        content:
          "Uma jornada pelo universo das ervas, dos chás e dos saberes da natureza. Conheça Os Saberes do Mestre da Montanha, um livro digital para cultivar a curiosidade.",
      },
      { name: "theme-color", content: "#26372e" },
      { property: "og:title", content: siteConfig.PRODUCT_NAME },
      {
        property: "og:description",
        content:
          "Ervas, chás e tradições ancestrais. Um livro digital para observar, compreender e descobrir.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      {
        property: "og:image",
        content: absoluteAsset(siteConfig.SOCIAL_IMAGE_URL, siteConfig.SITE_URL),
      },
      { property: "og:image:alt", content: "Mestre da Montanha em um jardim entre montanhas" },
      ...(siteConfig.SITE_URL ? [{ property: "og:url", content: siteConfig.SITE_URL }] : []),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: siteConfig.PRODUCT_NAME },
      { name: "twitter:description", content: siteConfig.PRODUCT_SUBTITLE },
      {
        name: "twitter:image",
        content: absoluteAsset(siteConfig.SOCIAL_IMAGE_URL, siteConfig.SITE_URL),
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "preload", as: "image", href: siteConfig.MEDIA.heroPoster },
      ...(siteConfig.SITE_URL ? [{ rel: "canonical", href: siteConfig.SITE_URL }] : []),
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
