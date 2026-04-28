/**
 * Drop-in nav brand component.
 *
 * Renders the Artheswara wordmark with a cross-fade between two color variants:
 * a white version for the transparent nav state (over the hero) and a dark
 * teak version for the scrolled, solid-background nav state.
 *
 * The parent <nav> is expected to toggle a class (or pass `scrolled`) when the
 * page scrolls past 50px — see Home.tsx for the existing isScrolled state.
 */

import { cn } from "@/lib/utils";

interface NavBrandProps {
  scrolled: boolean;
  onClick?: () => void;
}

export default function NavBrand({ scrolled, onClick }: NavBrandProps) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label="Artheswara Raya — Interior Design"
      className="relative flex items-center cursor-pointer h-9 md:h-11"
    >
      <img
        src="/images/logo-light.png"
        alt="Artheswara Raya"
        className={cn(
          "h-full w-auto block transition-opacity duration-500",
          scrolled ? "opacity-0" : "opacity-100"
        )}
      />
      <img
        src="/images/logo-dark.png"
        alt=""
        aria-hidden="true"
        className={cn(
          "absolute inset-0 h-full w-auto block transition-opacity duration-500",
          scrolled ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
}
