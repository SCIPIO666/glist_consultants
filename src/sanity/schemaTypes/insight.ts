import { defineArrayMember, defineField, defineType } from "sanity";
import { categories } from "../../data/insights";
import { services } from "../../data/services";

/** An article on /insights and /insights/<slug>. */
export const insight = defineType({
  name: "insight",
  title: "Insight (article)",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required().max(120) }),
    defineField({
      name: "slug",
      type: "slug",
      description: "The web address: /insights/<slug>. Click Generate. Do not change it after publishing.",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Short description",
      type: "text",
      rows: 3,
      description: "One or two sentences. Used on the cards and in search results.",
      validation: (r) => r.required().max(220),
    }),
    defineField({ name: "date", title: "Publish date", type: "date", initialValue: () => new Date().toISOString().slice(0, 10), validation: (r) => r.required() }),
    defineField({
      name: "category",
      type: "string",
      options: { list: categories.map((c) => ({ title: c.label, value: c.value })), layout: "radio" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "service",
      title: "Related service",
      type: "string",
      description: "Drives the Service filter on the Insights page.",
      options: { list: services.map((s) => ({ title: s.title, value: s.slug })) },
      validation: (r) => r.required(),
    }),
    defineField({ name: "readMinutes", title: "Reading time (minutes)", type: "number", initialValue: 5, validation: (r) => r.required().integer().min(1).max(30) }),
    defineField({
      name: "image",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      description: "Drag the hotspot onto the part that must stay in view when the photo is cropped.",
      fields: [defineField({ name: "alt", type: "string", title: "Describe the image (for screen readers)", validation: (r) => r.required() })],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      title: "Article",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Paragraph", value: "normal" },
            { title: "Heading", value: "h2" },
            { title: "Sub-heading", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullets", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [defineField({ name: "href", type: "url", validation: (r) => r.uri({ scheme: ["http", "https", "mailto", "tel"] }) })],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", type: "string", title: "Describe the image", validation: (r) => r.required() })],
        }),
      ],
    }),
  ],
  orderings: [{ title: "Newest first", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: {
    select: { title: "title", subtitle: "date", media: "image" },
  },
});
