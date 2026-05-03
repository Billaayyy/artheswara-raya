/**
 * Drop-in replacement for the existing "Trusted By Visionary Clients" block
 * inside src/pages/Home.tsx.
 *
 * Paste the contents of TRUST_BLOCK below over the existing block (the one
 * starting with `<div className="mt-16 md:mt-32 pt-12 md:pt-16 border-t ...`
 * and ending with the closing `</div>` of `.flex.flex-wrap.justify-center`).
 *
 * The cleaned-up logo files belong in `public/images/logos/`.
 *
 * No new dependencies. Pure Tailwind + your existing tokens.
 */

export default function TrustBlock() {
  const logos = [
    { src: "/images/logos/panasonic.png",  alt: "Panasonic",                  scale: "max-h-[38%]" },
    { src: "/images/logos/bmw.png",        alt: "BMW",                        scale: "max-h-[72%]" },
    { src: "/images/logos/itcroxy.webp",   alt: "ITC Roxy Mas",               scale: "max-h-[64%]" },
    { src: "/images/logos/kementrian.png", alt: "Kementerian Pertahanan RI",  scale: "max-h-[75%]" },
    { src: "/images/logos/realme.png",     alt: "Realme",                     scale: "max-h-[50%]" },
    { src: "/images/logos/tokopedia.png",  alt: "Tokopedia",                  scale: "max-h-[36%]" },
  ];

  const alsoWith = [
    "Apartments",
    "Private Residences",
    "Medical Clinics",
    "Government Offices",
    "Others",
  ];

  return (
    <div className="mt-16 md:mt-32 pt-12 md:pt-16 border-t border-border flex flex-col items-center">
      <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-6 md:mb-8 text-center">
        Our Clients
      </p>

      {/* Logo grid: 2 cols mobile → 3 cols tablet → 6 cols desktop */}
      <div className="w-full max-w-[1100px] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-6 md:gap-x-10 md:gap-y-8 items-center">
        {logos.map((logo) => (
          <a
            key={logo.alt}
            href="#"
            aria-label={logo.alt}
            className="flex items-center justify-center h-[72px] md:h-[88px] opacity-70 hover:opacity-100 transition-opacity duration-300"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              decoding="async"
              className={`w-auto max-w-full object-contain ${logo.scale}`}
            />
          </a>
        ))}
      </div>

      {/* "We also work with" — italic Playfair list with teak dot separators */}
      <div className="w-full max-w-[1100px] mt-10 md:mt-14 pt-8 md:pt-10 border-t border-border text-center">
        <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
          We Also Work With
        </p>
        <p className="font-serif italic text-lg md:text-2xl text-foreground leading-relaxed">
          {alsoWith.map((label, i) => (
            <span key={label}>
              {label}
              {i < alsoWith.length - 1 && (
                <span
                  aria-hidden="true"
                  className="inline-block w-[4px] h-[4px] rounded-full bg-primary align-middle mx-3 md:mx-4 mb-1"
                />
              )}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
