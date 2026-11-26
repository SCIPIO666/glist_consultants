/**
 * POST /api/revalidate: called by a Sanity webhook whenever content is published,
 * so the site refreshes within seconds instead of waiting for the hourly cache.
 * Webhook: URL https://YOUR-SITE/api/revalidate, secret = SANITY_REVALIDATE_SECRET,
 * filter  _type in ["insight","review"],  projection  {_type, "slug": slug.current}
 */
import { revalidatePath, revalidateTag } from "next/cache";
import { parseBody } from "next-sanity/webhook";

export async function POST(req: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return new Response("Revalidation secret is not set", { status: 500 });

  const { isValidSignature, body } = await parseBody<{ _type?: string; slug?: string }>(req as never, secret);
  if (!isValidSignature) return new Response("Invalid signature", { status: 401 });
  if (!body?._type) return new Response("Bad request", { status: 400 });

  // Tag is the document type; Next 16 asks for a cache-life profile as the second argument.
  revalidateTag(body._type, "max");
  if (body._type === "insight") {
    revalidatePath("/insights");
    if (body.slug) revalidatePath(`/insights/${body.slug}`);
  }
  if (body._type === "review") revalidatePath("/");

  return Response.json({ ok: true, revalidated: body._type });
}
