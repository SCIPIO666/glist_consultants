/**
 * Property Management, section 5: circular reviews.
 * SAMPLE PLACEHOLDERS: these four are written to show the layout and are NOT from real
 * clients. Replace each with a genuine testimonial (with permission), then set
 * `propertyReviewsAreSamples` to false. While true, a dev-only reminder badge shows.
 */
export type PropertyReview = {
  quote: string;
  name: string;
  role: string;
  location: string;
  image: { src: string; alt: string; position: string };
  /** Where the circle sits around the text, as % of the section (centre of the circle). Desktop only. */
  at: { x: number; y: number };
  /** Circle diameter (CSS length, fluid). */
  size: string;
};

export const propertyReviewsAreSamples = true;

export const propertyReviews: {
  label: string;
  heading: string;
  headingAccent: string;
  cta: { label: string; href: string };
  stars: number;
  items: PropertyReview[];
} = {
  label: "Landlords say",
  heading: "Owners who stopped",
  headingAccent: "chasing rent.",
  cta: { label: "Discuss your property", href: "/contact?service=property-management" },
  stars: 5,
  items: [
    {
      quote:
        "Rent now lands on the same date every month, and the report tells me exactly what came in and what went out. I stopped chasing tenants the week Glist took over.",
      name: "Samuel M.",
      role: "Apartment landlord",
      location: "Kileleshwa, Nairobi",
      image: { src: "/pages/property/reviews/pexels-bule-2127348686-33986306.webp", alt: "Samuel M., a landlord, smiling in a blue shirt", position: "50% 24%" },
      at: { x: 17, y: 30 },
      size: "clamp(6.5rem, 12vw, 13rem)",
    },
    {
      quote:
        "Our commercial block was losing money to vacancies and late service charge. Screening, collection and repairs are now handled, and the numbers finally make sense.",
      name: "David K.",
      role: "Commercial property owner",
      location: "Upper Hill, Nairobi",
      image: { src: "/pages/property/reviews/pexels-mizunokozuki-13801614.webp", alt: "David K., a property owner, in a light grey suit", position: "50% 16%" },
      at: { x: 84, y: 25 },
      size: "clamp(5.5rem, 9.5vw, 10rem)",
    },
    {
      quote:
        "When a pipe burst on a Sunday, a vetted plumber was on site within hours and I was kept informed throughout. That is the peace of mind I was paying for.",
      name: "Brian O.",
      role: "Rental estate owner",
      location: "Syokimau, Machakos",
      image: { src: "/pages/property/reviews/pexels-yankrukov-7794061.webp", alt: "Brian O., an estate owner, reviewing a statement at his desk", position: "50% 26%" },
      at: { x: 22, y: 76 },
      size: "clamp(5rem, 8.5vw, 9rem)",
    },
    {
      quote:
        "Good tenants, clear leases and honest monthly statements. I live abroad, and I have never once worried about my flats in Ruaka.",
      name: "Mercy W.",
      role: "Diaspora landlord",
      location: "Ruaka, Kiambu",
      image: { src: "/pages/property/reviews/towfiqu-barbhuiya-nApaSgkzaxg-unsplash.webp", alt: "A landlord reviewing rental income statements on a tablet", position: "62% 55%" },
      at: { x: 80, y: 74 },
      size: "clamp(6.5rem, 11.5vw, 12rem)",
    },
  ],
};
