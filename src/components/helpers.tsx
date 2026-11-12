"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { hours, shop } from "@/content/site";

export const formatPrice = (n: number | null) =>
  n == null ? "Prix sur demande" : `${n.toLocaleString("fr-FR").replace(/\u202f/g, " ")} ${shop.currency}`;

export const waLink = (text: string) => `https://wa.me/${shop.whatsapp}?text=${encodeURIComponent(text)}`;

/** Heure actuelle au Cameroun (UTC+1), quel que soit le fuseau du visiteur. */
export function nowInDouala() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Douala",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const dayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { dayIndex, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

const toMin = (hhmm: string) => Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3));

export function openStatus() {
  const { dayIndex, minutes } = nowInDouala();
  const today = hours[dayIndex];
  if (today.open && today.close && minutes >= toMin(today.open) && minutes < toMin(today.close)) {
    return { open: true, label: `Ouvert · ferme à ${today.close.replace(":", "h")}`, dayIndex };
  }
  // Prochaine ouverture
  for (let i = 0; i < 7; i++) {
    const d = (dayIndex + i) % 7;
    const h = hours[d];
    if (!h.open) continue;
    if (i === 0 && minutes >= toMin(h.open)) continue;
    const when = i === 0 ? "aujourd'hui" : i === 1 ? "demain" : h.day.toLowerCase();
    return { open: false, label: `Fermé · ouvre ${when} à ${h.open.replace(":", "h")}`, dayIndex };
  }
  return { open: false, label: "Fermé", dayIndex };
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-visible");
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/** Photo produit, ou visuel d'attente coloré si aucune image n'est fournie. */
export function Visual({ src, alt, tone, label, className = "" }: { src: string; alt: string; tone: string; label?: string; className?: string }) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-cover ${className}`}
        style={{ backgroundColor: tone }}
        loading="lazy"
        decoding="async"
      />
    );
  }
  return (
    <div className={`placeholder flex h-full w-full items-end p-4 ${className}`} style={{ backgroundColor: tone }}>
      {label && <span className="font-serif text-sm italic text-white/85">{label}</span>}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">{children}</p>;
}

export function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2.1-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
    </svg>
  );
}
