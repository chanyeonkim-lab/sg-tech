"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import type { ReactNode } from "react";

interface TrackedLinkProps {
  href: string;
  event: string;
  eventData?: Record<string, string | number | boolean>;
  external?: boolean;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}

export function TrackedLink({
  href,
  event,
  eventData,
  external,
  className,
  children,
  ariaLabel,
}: TrackedLinkProps) {
  const handleClick = () => {
    trackEvent(event, eventData);
  };

  const isExternalUrl =
    external ||
    href.startsWith("http") ||
    href.startsWith("tel:") ||
    href.startsWith("mailto:");

  if (isExternalUrl) {
    const isHttp = href.startsWith("http");
    return (
      <a
        href={href}
        onClick={handleClick}
        className={className}
        aria-label={ariaLabel}
        {...(isHttp
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
}
