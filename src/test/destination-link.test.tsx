import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DestinationLink } from "@/components/montanha/destination-link";
import { siteConfig } from "@/config/site";

describe("Links da capa e dos CTAs", () => {
  afterEach(() => {
    cleanup();
    siteConfig.CHECKOUT_URL = "";
    window.history.replaceState({}, "", "/");
  });

  it("usa o mesmo destino configurado para capa, oferta e botão móvel", () => {
    siteConfig.CHECKOUT_URL = "https://example.com/livro?produto=ebook";
    window.history.replaceState({}, "", "/?utm_source=tiktok&ttclid=123");
    render(
      <>
        {["capa", "oferta", "celular"].map((location) => (
          <DestinationLink key={location} location={location}>
            {location}
          </DestinationLink>
        ))}
      </>,
    );
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3);
    for (const link of links) {
      expect(link).toHaveAttribute(
        "href",
        "https://example.com/livro?produto=ebook&utm_source=tiktok&ttclid=123",
      );
    }
  });

  it("distingue um clique pendente de uma saída real", () => {
    const listener = vi.fn();
    window.addEventListener("montanha:analytics", listener);
    render(<DestinationLink location="capa">Conhecer o livro</DestinationLink>);
    fireEvent.click(screen.getByRole("link"));
    expect(screen.getByRole("dialog")).toBeVisible();
    const events = listener.mock.calls.map(([event]) => event.detail.event);
    expect(events).toEqual(["cta_click", "destination_pending"]);
    window.removeEventListener("montanha:analytics", listener);
  });
});
