import { Breadcrumb } from "@/components/blog/Breadcrumb";
import type { BreadcrumbItem } from "@/components/seo/schemas";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb: BreadcrumbItem[];
}

export function PageHero({ title, subtitle, breadcrumb }: PageHeroProps) {
  return (
    <section className="bg-sg-cream border-b border-sg-pale-gray">
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-10 pb-14 md:pt-14 md:pb-20">
        <Breadcrumb items={breadcrumb} />
        <h1 className="mt-6 text-4xl md:text-5xl font-bold text-sg-charcoal leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg text-sg-gray max-w-3xl">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
