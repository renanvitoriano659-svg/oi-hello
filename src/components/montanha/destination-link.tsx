import { useEffect, useRef, useState, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowTopRightIcon, Cross2Icon } from "@radix-ui/react-icons";
import { siteConfig } from "@/config/site";
import { buildDestinationUrl } from "@/lib/destination";
import { trackEvent } from "@/lib/analytics";
import { MountainMark } from "./primitives";

export function DestinationLink({
  children,
  className = "",
  location,
  label,
}: {
  children: ReactNode;
  className?: string;
  location: string;
  label?: string;
}) {
  const [destination, setDestination] = useState(buildDestinationUrl(siteConfig.CHECKOUT_URL));
  const [open, setOpen] = useState(false);
  const link = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    setDestination(
      buildDestinationUrl(siteConfig.CHECKOUT_URL, window.location.search, window.location.origin),
    );
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <a
        ref={link}
        href={destination || "#livro"}
        className={className}
        aria-label={label}
        onClick={(event) => {
          trackEvent("cta_click", { location });
          if (!destination) {
            event.preventDefault();
            trackEvent("destination_pending", { location });
            setOpen(true);
          } else {
            trackEvent("checkout_exit", { location, destination: new URL(destination).origin });
          }
        }}
      >
        {children}
      </a>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content
          className="destination-dialog"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            link.current?.focus({ preventScroll: true });
          }}
        >
          <MountainMark className="mx-auto mb-6 h-10 w-14 text-olive" />
          <p className="eyebrow text-olive">A JORNADA CONTINUA</p>
          <Dialog.Title className="mt-4 font-display text-4xl text-forest">
            O próximo capítulo
            <br />
            <em>está a caminho.</em>
          </Dialog.Title>
          <Dialog.Description className="mt-5 leading-relaxed text-muted-foreground">
            A página de acesso ao livro será disponibilizada em breve. Enquanto isso, continue
            explorando este universo.
          </Dialog.Description>
          <Dialog.Close className="button button-dark mt-7 w-full">
            Continuar explorando <ArrowTopRightIcon aria-hidden="true" />
          </Dialog.Close>
          <Dialog.Close className="dialog-close" aria-label="Fechar">
            <Cross2Icon />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
