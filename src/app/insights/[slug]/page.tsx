import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/insights/ArticleBody";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { categories, formatInsightDate, insightsPage } from "@/data/insights";
import { getInsight, getInsightSlugs } from "@/lib/content";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getInsightSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getInsight(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt, url: `/insights/${post.slug}`, type: "article", publishedTime: post.date, images: [post.image.src] },
  };
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params;
  const post = await getInsight(slug);
  if (!post) notFound();

  const category = categories.find((c) => c.value === post.category)?.label ?? "";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    image: post.image.src,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      {/* Dark page-top so the transparent header stays readable */}
      <header className="bg-night pb-[clamp(2.5rem,6vw,4.5rem)] pt-[calc(var(--header-h)+clamp(2rem,5vw,4rem))] text-white">
        <div className="wrap max-w-[52rem]">
          <Link href="/insights" className="text-sm font-semibold text-brand-soft hover:text-gold">&larr; All insights</Link>
          <Eyebrow className="mt-8 text-gold">{category}</Eyebrow>
          <h1 className="mt-4 font-display text-h1 font-medium">{post.title}</h1>
          <p className="mt-6 max-w-[40rem] text-lead text-white/75">{post.excerpt}</p>
          <p className="mt-6 text-sm text-white/60">
            <time dateTime={post.date}>{formatInsightDate(post.date)}</time> &middot; {post.readMinutes} min read
          </p>
        </div>
      </header>

      <div className="wrap max-w-[52rem] pb-[clamp(4rem,9vw,7rem)]">
        <div className="relative -mt-2 aspect-[16/9] overflow-hidden rounded-card bg-night-card shadow-lift sm:-mt-10">
          <Image src={post.image.src} alt={post.image.alt} fill priority sizes="(min-width: 832px) 52rem, 92vw" quality={75} className="object-cover" style={{ objectPosition: post.image.focus }} />
        </div>

        <article className="mt-6 sm:mt-10">
          <ArticleBody value={post.body} />
        </article>

        <p className="mt-14 text-sm text-ink-muted">{insightsPage.disclaimer}</p>

        <div className="mt-8 flex flex-wrap items-center gap-4 rounded-card bg-mist p-6 sm:p-8">
          <p className="min-w-[14rem] flex-1 font-display text-xl font-medium text-night">Want help applying this to your situation?</p>
          <Button href="/contact" variant="cta" size="lg" arrow>Talk to us</Button>
        </div>
      </div>
    </main>
  );
}
