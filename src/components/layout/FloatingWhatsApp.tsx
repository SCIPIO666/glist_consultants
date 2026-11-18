import { WhatsApp } from "@/components/ui/icons";
import { whatsappUrl } from "@/lib/site";

/** Always-visible WhatsApp enquiry button. */
export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex h-14 items-center gap-0 overflow-hidden rounded-full bg-whatsapp text-night-deep shadow-lift transition-[padding] duration-500 ease-out-expo hover:gap-2 hover:pr-5"
    >
      <span className="grid size-14 shrink-0 place-items-center text-3xl">
        <WhatsApp />
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-[max-width,opacity] duration-500 ease-out-expo group-hover:max-w-40 group-hover:opacity-100">
        Chat on WhatsApp
      </span>
    </a>
  );
}
