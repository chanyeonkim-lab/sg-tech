import Link from "next/link";
import type { ReactNode } from "react";

interface CalloutProps {
  variant?: "info" | "cta" | "warning";
  title?: string;
  children?: ReactNode;
}

const styles = {
  info: "bg-sg-cream border-l-4 border-sg-yellow",
  cta: "bg-sg-charcoal text-white",
  warning: "bg-sg-yellow-pale border-l-4 border-sg-yellow-dark",
} as const;

export function Callout({ variant = "info", title, children }: CalloutProps) {
  return (
    <aside
      className={`not-prose my-8 rounded-xl p-6 md:p-8 ${styles[variant]}`}
    >
      {title && (
        <p
          className={`text-sm font-bold uppercase tracking-wider mb-3 ${
            variant === "cta" ? "text-sg-yellow" : "text-sg-yellow-dark"
          }`}
        >
          {title}
        </p>
      )}
      <div className={variant === "cta" ? "text-white" : "text-sg-charcoal"}>
        {children}
      </div>
    </aside>
  );
}

interface ContactCtaProps {
  phone?: string;
  email?: string;
  smartStore?: string;
  headline?: string;
  variant?: "cta" | "info";
}

export function ContactCta({
  phone = "010-4437-4540",
  email = "jaeyoung@sg-powertech.com",
  smartStore = "https://smartstore.naver.com/sg-powertech",
  headline = "지금 바로 상담하세요",
  variant = "cta",
}: ContactCtaProps) {
  const isDark = variant === "cta";
  return (
    <aside
      className={`not-prose my-10 rounded-2xl p-6 md:p-8 ${
        isDark ? "bg-sg-charcoal" : "bg-sg-cream border-l-4 border-sg-yellow"
      }`}
    >
      <p
        className={`text-sm font-bold uppercase tracking-wider mb-4 ${
          isDark ? "text-sg-yellow" : "text-sg-yellow-dark"
        }`}
      >
        {headline}
      </p>
      <ul className="space-y-2.5 text-base">
        <li>
          <a
            href={`tel:${phone.replace(/-/g, "")}`}
            className={`inline-flex items-baseline gap-3 font-medium hover:underline ${
              isDark ? "text-white hover:text-sg-yellow" : "text-sg-charcoal"
            }`}
          >
            <span
              className={`text-xs font-bold w-14 ${
                isDark ? "text-sg-yellow" : "text-sg-yellow-dark"
              }`}
            >
              TEL
            </span>
            <span>{phone}</span>
          </a>
        </li>
        <li>
          <a
            href={`mailto:${email}`}
            className={`inline-flex items-baseline gap-3 font-medium hover:underline break-all ${
              isDark ? "text-white hover:text-sg-yellow" : "text-sg-charcoal"
            }`}
          >
            <span
              className={`text-xs font-bold w-14 ${
                isDark ? "text-sg-yellow" : "text-sg-yellow-dark"
              }`}
            >
              EMAIL
            </span>
            <span>{email}</span>
          </a>
        </li>
        <li>
          <Link
            href={smartStore}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-baseline gap-3 font-medium hover:underline ${
              isDark ? "text-white hover:text-sg-yellow" : "text-sg-charcoal"
            }`}
          >
            <span
              className={`text-xs font-bold w-14 ${
                isDark ? "text-sg-yellow" : "text-sg-yellow-dark"
              }`}
            >
              STORE
            </span>
            <span>네이버 스마트스토어 바로가기</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}
