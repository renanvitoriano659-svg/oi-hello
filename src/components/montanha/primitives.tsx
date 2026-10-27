import { useState, type ImgHTMLAttributes, type ReactNode } from "react";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

export function MountainMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 36" fill="none" aria-hidden="true">
      <path
        d="M2 31 16 9l7 11L31 4l15 27H2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="m9 20 7 3 7-3M25 15l6 3 5-4M5 35h38"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <a
      href="#inicio"
      className={`brand ${light ? "brand-light" : ""}`}
      aria-label="Mestre da Montanha — início"
    >
      <MountainMark className="brand-mark" />
      <span>
        MESTRE DA MONTANHA<small>ERVAS, CHÁS & TRADIÇÕES</small>
      </span>
    </a>
  );
}

export function SectionLabel({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <p className={`section-label ${light ? "text-sand" : "text-olive"}`}>
      <span className="label-line" />
      {children}
    </p>
  );
}

export function EditorialImage({
  alt,
  className = "",
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`editorial-image ${className}`}>
      {failed ? (
        <div className="image-fallback" role="img" aria-label={alt}>
          <MountainMark />
          <span>Um olhar para a natureza</span>
        </div>
      ) : (
        <img {...props} alt={alt} onError={() => setFailed(true)} decoding="async" />
      )}
    </div>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return <ArrowTopRightIcon className={`cta-arrow ${className}`} aria-hidden="true" />;
}
