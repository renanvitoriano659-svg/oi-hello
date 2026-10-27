# Os Saberes do Mestre da Montanha

Página de pré-venda em português, construída com React 19, TanStack Start e Tailwind 4. Usa as fotografias, o vídeo e o mockup fornecidos para o projeto, fontes locais Cormorant Garamond e Source Sans 3, conteúdo renderizado no servidor e layout adaptável a celulares e desktop.

## Configurar a página do ebook

Todos os dados editáveis estão em `src/config/site.ts`.

```ts
CHECKOUT_URL: "https://sua-pagina.com/livro",
PRODUCT_PRICE: "", // Só informe o preço real quando confirmado.
SUPPORT_EMAIL: "",
SITE_URL: "https://seu-site.com",
```

`CHECKOUT_URL` pode apontar para qualquer página de destino oficial do ebook, inclusive uma página do mesmo site. A capa, a oferta, o CTA final e o botão fixo de celular usam a mesma configuração. Os parâmetros `utm_*`, `gclid`, `fbclid` e `ttclid` da visita são preservados no destino, sem sobrescrever parâmetros já definidos nele. Outros parâmetros da visita não são repassados.

Enquanto o destino estiver vazio, clicar na capa ou em um CTA de acesso abre um aviso acessível de que a página será disponibilizada em breve. O primeiro botão da abertura leva à apresentação do livro. Nenhum pagamento ou acesso é simulado.

## Conteúdo e informações pendentes

- `PRODUCT_COVER_URL`: mockup original enviado, convertido para WebP com transparência.
- `MEDIA`: caminhos do vídeo silencioso, seu poster e das três fotografias otimizadas em `public/media`.
- `INTERNAL_PREVIEWS`: lista vazia preparada para receber somente capturas autênticas do livro. Adicione objetos `{ src, alt, caption }` depois de fornecer as páginas reais.
- `DELIVERY_DESCRIPTION`: informe o processo real de entrega. Enquanto vazio, o FAQ orienta a consultar as condições na página de compra.
- `LEGAL`: preencha as URLs reais de privacidade, termos e reembolso, além da identificação comercial aplicável. Links sem endereço não são exibidos.
- `SUPPORT_EMAIL` e `PRODUCT_PRICE`: só aparecem após preenchidos.
- `SITE_URL`: domínio público final; habilita canonical, `og:url` e imagens sociais absolutas.

Os textos apresentam o universo temático indicado no briefing. O PDF não foi disponibilizado: não foram inventados capítulos, páginas internas, quantidade de páginas, receitas, credenciais, depoimentos, garantias ou condições de compra. Confronte a descrição com a versão final do livro antes de ativar uma venda.

## Rastreamento

`TRACKING.GA4_ID` e `TRACKING.TIKTOK_PIXEL_ID` começam vazios. Sem IDs não são carregados scripts externos de análise. Quando houver IDs válidos, o visitante poderá aceitar a análise ou manter somente os recursos essenciais. Os scripts são carregados apenas após aceitar.

A página emite `CustomEvent("montanha:analytics")` com `detail.event`: `page_view`, `cta_click`, `checkout_exit` ou `destination_pending`. A saída só é registrada quando existe um destino real. Com consentimento, os eventos também são encaminhados ao GA4; o TikTok recebe a visualização e o clique de saída. Nenhum ID real foi fornecido, portanto a recepção dos eventos pelos painéis GA4/TikTok precisa ser validada depois de configurar as contas.

## Executar e verificar

```sh
npm install
npm run dev
npm run build
npm test
npx tsc --noEmit
```

O projeto mantém a integração original do Lovable e o destino de build Cloudflare configurado por ele. A publicação continua pelo fluxo existente do projeto.

`scripts/verify-browser.mjs` verifica 375, 430, 768 e 1440 px, ausência de rolagem horizontal, imagens, menu, FAQ, foco do diálogo, cliques na capa, eventos locais e movimento reduzido. Também verifica a reprodução silenciosa e o botão de pausa do vídeo. Para executar, tenha `playwright` e Chrome disponíveis e um servidor local ativo. As variáveis opcionais são `TEST_URL`, `PLAYWRIGHT_MODULE` e `VISUAL_DIR`. Por padrão as capturas ficam em `.checks/`, fora do Git.

O vídeo respeita movimento reduzido e economia de dados, pausa ao sair da tela e tem poster estático. Imagens abaixo da abertura usam carregamento adiado e fallback em caso de falha. As fontes são servidas pelo próprio site.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d49e20e9-e5ee-4406-a6ca-5322f2cf26c5).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
