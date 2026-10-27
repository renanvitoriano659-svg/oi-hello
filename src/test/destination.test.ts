import { describe, expect, it } from "vitest";
import { buildDestinationUrl } from "@/lib/destination";

describe("Destino do ebook", () => {
  it("aguarda um endereço real e rejeita protocolos executáveis", () => {
    expect(buildDestinationUrl("")).toBeNull();
    expect(buildDestinationUrl("[INSERIR URL]")).toBeNull();
    expect(buildDestinationUrl("javascript:alert(1)")).toBeNull();
    expect(buildDestinationUrl("data:text/html,test")).toBeNull();
  });

  it("preserva atribuição e parâmetros existentes sem repassar dados arbitrários", () => {
    const result = buildDestinationUrl(
      "https://example.com/livro?produto=ebook&utm_source=parceiro#oferta",
      "?utm_source=tiktok&utm_campaign=montanha&ttclid=abc&fbclid=xyz&email=nao-repassar",
    );
    const url = new URL(result!);
    expect(url.searchParams.get("produto")).toBe("ebook");
    expect(url.searchParams.get("utm_source")).toBe("parceiro");
    expect(url.searchParams.get("utm_campaign")).toBe("montanha");
    expect(url.searchParams.get("ttclid")).toBe("abc");
    expect(url.searchParams.get("fbclid")).toBe("xyz");
    expect(url.searchParams.has("email")).toBe(false);
    expect(url.hash).toBe("#oferta");
  });

  it("também aceita uma página do mesmo site quando a origem está disponível", () => {
    expect(buildDestinationUrl("/livro", "?utm_source=tiktok", "https://example.com")).toBe(
      "https://example.com/livro?utm_source=tiktok",
    );
  });
});
