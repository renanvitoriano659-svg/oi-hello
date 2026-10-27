import { createRequire } from "node:module";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const output = process.env.VISUAL_DIR || ".checks";
const base = process.env.TEST_URL || "http://127.0.0.1:5173";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const results = [];
try {
  for (const [width, height] of [
    [375, 812],
    [430, 932],
    [768, 1024],
    [1440, 1000],
  ]) {
    const context = await browser.newContext({
      viewport: { width, height },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    const errors = [];
    const requests = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("request", (request) => requests.push(request.url()));
    await page.addInitScript(() => {
      window.__events = [];
      window.addEventListener("montanha:analytics", (event) => window.__events.push(event.detail));
    });
    const response = await page.goto(`${base}/?utm_source=tiktok&utm_campaign=teste`, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    assert.equal(response.status(), 200);
    await page.locator("h1").waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(() => window.__events?.some((event) => event.event === "page_view"));
    await page.screenshot({ path: path.join(output, `abertura-${width}.png`) });
    assert.match(await page.title(), /Os Saberes do Mestre da Montanha/);
    assert.equal(await page.locator("html").getAttribute("lang"), "pt-BR");
    assert.equal(await page.locator("h1").count(), 1);
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
      false,
      `Overflow em ${width}px`,
    );
    assert.equal(
      await page.locator("video").evaluate((video) => video.paused && !video.getAttribute("src")),
      true,
      "Movimento reduzido deve exibir somente o poster",
    );
    assert.equal(
      requests.some((url) => /googletagmanager|analytics\.tiktok/.test(url)),
      false,
    );
    if (width < 768) {
      await page.getByRole("button", { name: "Abrir menu" }).click();
      await page.locator("#mobile-menu a").last().click();
      assert.equal(await page.locator("#mobile-menu").count(), 0);
      assert.equal(await page.locator(".mobile-purchase").isVisible(), true);
    }
    const faq = page.locator(".faq-list details").first();
    await faq.locator("summary").click();
    assert.equal(await faq.getAttribute("open"), "");
    await faq.locator("summary").press("Enter");
    assert.equal(await faq.getAttribute("open"), null);
    const cover = page.locator("#livro .book-cover-link");
    await cover.click();
    await page.getByRole("dialog").waitFor();
    assert.match(await page.getByRole("dialog").innerText(), /está a caminho/);
    await page.keyboard.press("Escape");
    await page.getByRole("dialog").waitFor({ state: "hidden" });
    await page.waitForFunction(() => document.activeElement?.matches("#livro .book-cover-link"));
    assert.equal(
      await cover.evaluate((el) => el === document.activeElement),
      true,
      "Foco deve voltar à capa",
    );
    const events = await page.evaluate(() => window.__events);
    assert(events.some((event) => event.event === "page_view"));
    assert(
      events.some((event) => event.event === "cta_click" && event.location === "book_preview"),
    );
    assert(events.some((event) => event.event === "destination_pending"));
    assert(!events.some((event) => event.event === "checkout_exit"));
    for (const image of await page.locator("img").all()) await image.scrollIntoViewIfNeeded();
    await page.waitForFunction(() =>
      [...document.images].every((img) => img.complete && img.naturalWidth > 0),
    );
    await page.evaluate(() => {
      document.activeElement?.blur();
      scrollTo(0, 0);
    });
    await page.screenshot({ path: path.join(output, `montanha-${width}.png`), fullPage: true });
    assert.deepEqual(errors, [], `Erros de JavaScript em ${width}px`);
    results.push({
      width,
      height,
      overflow: false,
      images: "ok",
      faq: "ok",
      coverClick: "ok",
      keyboard: "ok",
      reducedMotion: "ok",
      analytics: "local only",
      errors,
    });
    await context.close();
  }
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForFunction(() => {
    const v = document.querySelector("video");
    return v && !v.paused && v.readyState >= 3;
  });
  await page.getByRole("button", { name: "Pausar vídeo de fundo" }).click();
  assert.equal(await page.locator("video").evaluate((v) => v.paused && v.muted), true);
  await context.close();
  console.log(JSON.stringify({ viewports: results, videoPlayback: "ok" }, null, 2));
} finally {
  await browser.close();
}
