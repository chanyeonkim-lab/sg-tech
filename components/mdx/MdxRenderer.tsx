"use client";

import * as runtime from "react/jsx-runtime";
import { useMemo, type ComponentType, type ImgHTMLAttributes } from "react";
import { Callout, ContactCta } from "./Callout";
import { LightboxImage } from "@/components/blog/LightboxImage";

function getMDXComponent(code: string) {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
}

function MdxImage({ src, alt = "", ...rest }: ImgHTMLAttributes<HTMLImageElement>) {
  if (typeof src !== "string" || !src) return null;
  return (
    <span className="not-prose block my-6">
      <LightboxImage src={src} alt={alt} aspectClassName="aspect-[4/3]" {...rest} />
    </span>
  );
}

const defaultComponents: Record<string, ComponentType<Record<string, unknown>>> = {
  Callout: Callout as unknown as ComponentType<Record<string, unknown>>,
  ContactCta: ContactCta as unknown as ComponentType<Record<string, unknown>>,
  img: MdxImage as unknown as ComponentType<Record<string, unknown>>,
};

export function MdxRenderer({ code }: { code: string }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return <Component components={defaultComponents} />;
}
