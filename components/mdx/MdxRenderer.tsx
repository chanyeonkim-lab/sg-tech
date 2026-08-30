"use client";

import * as runtime from "react/jsx-runtime";
import { useMemo, type ComponentType } from "react";
import { Callout, ContactCta } from "./Callout";

function getMDXComponent(code: string) {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
}

const defaultComponents: Record<string, ComponentType<Record<string, unknown>>> = {
  Callout: Callout as unknown as ComponentType<Record<string, unknown>>,
  ContactCta: ContactCta as unknown as ComponentType<Record<string, unknown>>,
};

export function MdxRenderer({ code }: { code: string }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return <Component components={defaultComponents} />;
}
