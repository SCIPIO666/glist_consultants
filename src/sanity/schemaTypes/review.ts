import { defineField, defineType } from "sanity";
import { services } from "../../data/services";

/** A client review on the home page stack. Use at least 2 (4 looks best). */
export const review = defineType({
  name: "review",
  title: "Client review",
  type: "document",
  fields: [
    defineField({ name: "quote", type: "text", rows: 4, description: "Use the client's own words, with their permission.", validation: (r) => r.required().max(300) }),
    defineField({ name: "name", type: "string", description: "e.g. Amina W.", validation: (r) => r.required() }),
    defineField({ name: "role", type: "string", description: "e.g. Landlord, Business owner", validation: (r) => r.required() }),
    defineField({ name: "location", type: "string", description: "e.g. Kilimani, Nairobi", validation: (r) => r.required() }),
    defineField({
      name: "service",
      type: "string",
      description: "Shown on the card's top strip.",
      options: { list: services.map((s) => ({ title: s.title, value: s.title })) },
      validation: (r) => r.required(),
    }),
    defineField({ name: "stars", type: "number", initialValue: 5, validation: (r) => r.required().integer().min(1).max(5) }),
    defineField({ name: "order", type: "number", description: "Lowest number shows first.", initialValue: 10, validation: (r) => r.required() }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "service" } },
});
