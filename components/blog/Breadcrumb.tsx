import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, type BreadcrumbItem } from "@/components/seo/schemas";

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema(items)} />
      <nav aria-label="Breadcrumb" className="text-sm text-sg-gray">
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((item, index) => (
            <li key={item.url} className="flex items-center gap-2">
              {index < items.length - 1 ? (
                <>
                  <Link
                    href={item.url}
                    className="hover:text-sg-charcoal transition"
                  >
                    {item.name}
                  </Link>
                  <span aria-hidden className="text-sg-pale-gray">/</span>
                </>
              ) : (
                <span aria-current="page" className="text-sg-charcoal font-medium">
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
