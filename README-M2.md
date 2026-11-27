# Milestone 2: petal numbers, services wheel, newsletter

Extract into the project root and overwrite.

- PropertyPoints.tsx   numbers now sit at the centre of each coloured quarter-disc
- DonutBackdrop.tsx    home services background donuts dimmer (about half the opacity)
- ServicesWheel.tsx    wheel larger (about +15%), text column a little narrower, title a touch smaller
  NOTE: if you already applied the other agent's services-wheel zip, that file is overwritten by this one.
  Only these lines differ from the original: grid-cols [0.78fr_1.22fr], lg:w-[min(100%,calc(100svh-3rem))],
  w-[min(96vw,calc(100svh-15rem))], title clamp max 6.25rem, so re-apply them if you prefer their version.
- SubscribeForm.tsx    exports SubscribeForm (Insights banner) and SubscribeCompact (footer)
- SiteFooter.tsx       compact form under "Get in touch"
- api/subscribe/route.ts   records the sign-up source; optional Resend audience list

Env (host settings): RESEND_API_KEY (required), CONTACT_TO_EMAIL, CONTACT_FROM (a verified-domain sender; the default
onboarding@resend.dev can only email the Resend account owner), RESEND_AUDIENCE_ID (optional list).
