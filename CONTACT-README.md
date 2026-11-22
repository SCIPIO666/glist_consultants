# Contact page pack

Extract into the project root (merges into `src/` and `public/`). New files only, nothing is overwritten:

- src/app/contact/page.tsx
- src/app/api/contact/route.ts
- src/components/contact/{ContactSection,ContactForm,ContactPortrait}.tsx
- src/data/contact.ts
- public/pages/contact/contact-person.webp  (background-removed portrait, transparent)

Optional env vars (.env.local) to make the form send email via Resend:
RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM
Without them the form shows its error state with the WhatsApp fallback button.
