import Image from "next/image";
import { PortableText, type PortableTextBlock, type PortableTextComponents } from "next-sanity";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mt-5 text-lg leading-[1.8] text-ink">{children}</p>,
    h2: ({ children }) => <h2 className="mt-14 font-display text-h3 font-medium text-night">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-10 font-display text-xl font-medium text-night sm:text-2xl">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="mt-8 border-l-2 border-gold pl-6 font-display text-xl leading-snug text-night sm:text-2xl">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-5 list-disc space-y-2 pl-6 text-lg leading-[1.8] text-ink marker:text-gold">{children}</ul>,
    number: ({ children }) => <ol className="mt-5 list-decimal space-y-2 pl-6 text-lg leading-[1.8] text-ink marker:font-semibold marker:text-brand">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => {
      const href: string = value?.href ?? "#";
      const external = /^https?:/.test(href);
      return (
        <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="font-medium text-brand underline underline-offset-4 hover:text-night">
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) =>
      value?.src ? (
        <figure className="mt-10">
          <div className="relative aspect-[16/9] overflow-hidden rounded-card">
            <Image src={value.src} alt={value.alt ?? ""} fill sizes="(min-width: 768px) 48rem, 92vw" quality={75} className="object-cover" />
          </div>
        </figure>
      ) : null,
  },
};

/** Renders an article's rich text (Sanity Portable Text) in the site's type styles. */
export function ArticleBody({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
