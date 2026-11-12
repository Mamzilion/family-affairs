"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { about, categories, faq, hours, howTo, products, shop, type Category, type Product } from "@/content/site";
import { Eyebrow, formatPrice, openStatus, Reveal, Visual, waLink, WhatsAppIcon } from "./helpers";

type CartLine = { key: string; product: Product; size: string; qty: number };

export default function Store() {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [status, setStatus] = useState<ReturnType<typeof openStatus> | null>(null);

  // Panier conservé sur l'appareil du visiteur
  useEffect(() => {
    try {
      const saved = localStorage.getItem("fa-cart-v2");
      if (saved) setCart(JSON.parse(saved));
    } catch {}
    setStatus(openStatus());
    const t = setInterval(() => setStatus(openStatus()), 60_000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("fa-cart-v2", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const add = (product: Product, size: string) => {
    const key = `${product.id}-${size}`;
    setCart((c) => {
      const found = c.find((l) => l.key === key);
      return found ? c.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l)) : [...c, { key, product, size, qty: 1 }];
    });
    setCartOpen(true);
  };
  const setQty = (key: string, qty: number) =>
    setCart((c) => (qty <= 0 ? c.filter((l) => l.key !== key) : c.map((l) => (l.key === key ? { ...l, qty } : l))));
  const count = cart.reduce((s, l) => s + l.qty, 0);

  return (
    <>
      <Header count={count} onCart={() => setCartOpen(true)} status={status} />
      <main>
        <Hero />
        <Catalogue onAdd={add} />
        <About />
        <HowTo />
        <Visit status={status} />
        <Faq />
      </main>
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} setQty={setQty} clear={() => setCart([])} />
      <a
        href={waLink("Bonjour Family Affairs, j'ai une question.")}
        target="_blank"
        aria-label="Écrire à la boutique sur WhatsApp"
        className="fixed bottom-5 left-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-110"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </>
  );
}

/* --------------------------------- HEADER --------------------------------- */
function Header({ count, onCart, status }: { count: number; onCart: () => void; status: ReturnType<typeof openStatus> | null }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 10);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition ${scrolled ? "border-b border-line bg-cream/90 backdrop-blur" : ""}`}>
      {status && (
        <div className="bg-ink py-1.5 text-center text-[11px] tracking-wide text-cream">
          <span className={`mr-2 inline-block h-1.5 w-1.5 rounded-full ${status.open ? "bg-emerald-400" : "bg-red-400"}`} />
          {status.label} · Commandes WhatsApp 7j/7
        </div>
      )}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <nav className="hidden flex-1 gap-7 text-sm md:flex">
          <a href="#catalogue" className="hover:text-gold">Catalogue</a>
          <a href="#boutique" className="hover:text-gold">La boutique</a>
          <a href="#visite" className="hover:text-gold">Nous trouver</a>
        </nav>
        <a href="#top" className="font-serif text-2xl font-semibold tracking-tight md:flex-1 md:text-center">
          Family <span className="italic text-clay">Affairs</span>
        </a>
        <div className="flex flex-1 justify-end">
          <button onClick={onCart} className="relative flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2 text-sm font-semibold transition hover:bg-ink hover:text-cream">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 7h12l-1 13H7L6 7zM9 7a3 3 0 0 1 6 0" />
            </svg>
            <span className="hidden sm:inline">Panier</span>
            {count > 0 && (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-clay px-1 text-[11px] text-white">{count}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

/* ---------------------------------- HERO ---------------------------------- */
function Hero() {
  const tones = ["#9c4a2f", "#3e5c76", "#b0843e"];
  const labels = ["", "", ""];
  return (
    <section id="top" className="pt-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 lg:grid-cols-[1fr_1.1fr] lg:items-end">
        <Reveal>
          <Eyebrow>{shop.tagline}</Eyebrow>
          <h1 className="mt-5 font-serif text-6xl font-light leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
            L&apos;élégance, <span className="italic text-clay">en famille.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            Sacs, chaussures, tenues femme et enfant. Choisissez vos articles en ligne et commandez en un message WhatsApp.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#catalogue" className="rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-cream transition hover:bg-clay">
              Voir le catalogue
            </a>
            <a href="#visite" className="rounded-full border border-ink/25 px-7 py-3.5 text-sm font-semibold transition hover:border-ink">
              Venir en boutique
            </a>
          </div>
        </Reveal>
        <Reveal delay={150} className="grid h-[420px] grid-cols-5 grid-rows-2 gap-3 sm:h-[520px]">
          <div className="col-span-3 row-span-2 overflow-hidden rounded-t-full">
            <Visual src={shop.heroImages[0]} alt="Family Affairs" tone={tones[0]} label={labels[0]} />
          </div>
          <div className="col-span-2 overflow-hidden rounded-3xl">
            <Visual src={shop.heroImages[1]} alt="Look" tone={tones[1]} label={labels[1]} />
          </div>
          <div className="col-span-2 overflow-hidden rounded-3xl">
            <Visual src={shop.heroImages[2]} alt="Look" tone={tones[2]} label={labels[2]} />
          </div>
        </Reveal>
      </div>
      <div className="overflow-hidden border-y border-line bg-paper py-4">
        <div className="marquee flex w-max gap-12">
          {[...Array(4)].flatMap((_, k) =>
            [...categories, "Nouveautés", "Cérémonies", "Livraison à Yaoundé"].map((c, i) => (
              <span key={`${k}-${i}`} className="flex items-center gap-12 font-serif text-2xl italic text-muted">
                {c} <span className="not-italic text-gold">✶</span>
              </span>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- CATALOGUE ------------------------------- */
function Catalogue({ onAdd }: { onAdd: (p: Product, size: string) => void }) {
  const [filter, setFilter] = useState<Category | "Tout">("Tout");
  const list = useMemo(() => (filter === "Tout" ? products : products.filter((p) => p.category === filter)), [filter]);
  return (
    <section id="catalogue" className="mx-auto max-w-7xl px-5 py-24">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <Reveal>
          <Eyebrow>Catalogue</Eyebrow>
          <h2 className="mt-3 font-serif text-5xl font-light tracking-tight sm:text-6xl">
            Les <span className="italic">nouveautés</span>
          </h2>
          <p className="mt-2 text-sm text-muted">Disponibilité et prix confirmés sur WhatsApp.</p>
        </Reveal>
        <div className="flex flex-wrap gap-2">
          {(["Tout", ...categories] as const).map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full px-5 py-2 text-sm transition ${
                filter === c ? "bg-ink text-cream" : "border border-line text-muted hover:border-ink hover:text-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {list.map((p, i) => (
          <Reveal key={p.id} delay={(i % 4) * 70}>
            <ProductCard product={p} onAdd={onAdd} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product: p, onAdd }: { product: Product; onAdd: (p: Product, size: string) => void }) {
  const [size, setSize] = useState(p.sizes[0]);
  return (
    <article className="group">
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
        <Visual src={p.image} alt={p.name} tone={p.tone} label="Photo à ajouter" className="transition duration-500 group-hover:scale-105" />
        {p.tag && <span className="absolute left-3 top-3 rounded-full bg-cream px-3 py-1 text-[11px] font-semibold">{p.tag}</span>}
        <button
          onClick={() => onAdd(p, size)}
          className="absolute inset-x-3 bottom-3 translate-y-2 rounded-full bg-ink py-2.5 text-xs font-semibold text-cream opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100 max-md:translate-y-0 max-md:opacity-100"
        >
          Ajouter au panier
        </button>
      </div>
      <div className="mt-3">
        <p className="text-[11px] uppercase tracking-widest text-muted">{p.category}</p>
        <h3 className="font-serif text-lg leading-tight">{p.name}</h3>
        <p className={`mt-1 text-sm font-semibold ${p.price == null ? "text-clay" : ""}`}>{formatPrice(p.price)}</p>
      </div>
      {p.sizes.length > 1 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {p.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`rounded-md border px-2 py-0.5 text-[11px] transition ${size === s ? "border-ink bg-ink text-cream" : "border-line text-muted hover:border-ink"}`}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </article>
  );
}

/* ------------------------------- LA BOUTIQUE ------------------------------ */
function About() {
  return (
    <section id="boutique" className="bg-ink text-cream">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 lg:grid-cols-2">
        <Reveal>
          <Eyebrow>La boutique</Eyebrow>
          <h2 className="mt-4 font-serif text-5xl font-light leading-tight tracking-tight sm:text-6xl">
            {about.title} <span className="italic text-gold">{about.accent}</span>
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-cream/70">
            {about.text.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
        </Reveal>
        <div className="space-y-px overflow-hidden rounded-3xl bg-cream/10">
          {about.values.map((v, i) => (
            <Reveal key={v.title} delay={i * 100}>
              <div className="flex gap-6 bg-ink p-7">
                <span className="font-serif text-4xl italic text-gold">{i + 1}</span>
                <div>
                  <h3 className="font-serif text-2xl">{v.title}</h3>
                  <p className="mt-1 text-sm text-cream/65">{v.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- COMMENT COMMANDER ---------------------------- */
function HowTo() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24">
      <Reveal className="text-center">
        <Eyebrow>Commander</Eyebrow>
        <h2 className="mt-3 font-serif text-5xl font-light tracking-tight">
          Simple comme <span className="italic text-clay">un message.</span>
        </h2>
      </Reveal>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {howTo.map((s, i) => (
          <Reveal key={s.title} delay={i * 100}>
            <div className="h-full rounded-3xl border border-line bg-paper p-8 text-center">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-gold font-serif text-xl italic text-gold">{i + 1}</span>
              <h3 className="mt-5 font-serif text-2xl">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------- VISITE --------------------------------- */
function Visit({ status }: { status: ReturnType<typeof openStatus> | null }) {
  return (
    <section id="visite" className="border-y border-line bg-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 lg:grid-cols-2">
        <Reveal>
          <Eyebrow>Nous trouver</Eyebrow>
          <h2 className="mt-3 font-serif text-5xl font-light tracking-tight">
            Passez nous <span className="italic text-clay">voir.</span>
          </h2>
          <p className="mt-4 text-muted">{shop.address}</p>
          {status && (
            <p className={`mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${status.open ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`}>
              <span className={`h-2 w-2 rounded-full ${status.open ? "bg-emerald-500" : "bg-red-500"}`} />
              {status.label}
            </p>
          )}
          <table className="mt-6 w-full max-w-md text-sm">
            <tbody>
              {[1, 2, 3, 4, 5, 6, 0].map((d) => {
                const h = hours[d];
                const today = status?.dayIndex === d;
                return (
                  <tr key={d} className={`border-b border-line ${today ? "font-semibold" : "text-muted"}`}>
                    <td className="py-2.5">
                      {h.day} {today && <span className="ml-1 text-gold">· aujourd&apos;hui</span>}
                    </td>
                    <td className="py-2.5 text-right">{h.open ? `${h.open.replace(":", "h")} – ${h.close?.replace(":", "h")}` : "Fermé"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`tel:+${shop.whatsapp}`} className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream hover:bg-clay">
              Appeler · {shop.phoneDisplay}
            </a>
            <a href={shop.mapsUrl} target="_blank" className="rounded-full border border-ink/25 px-6 py-3 text-sm font-semibold hover:border-ink">
              Itinéraire Google Maps
            </a>
          </div>
        </Reveal>
        <Reveal delay={120} className="min-h-[380px] overflow-hidden rounded-3xl border border-line">
          <iframe src={shop.mapsEmbed} title="Carte Family Affairs" className="h-full min-h-[380px] w-full" loading="lazy" />
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------- FAQ ---------------------------------- */
function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-24">
      <Reveal className="text-center">
        <Eyebrow>Questions</Eyebrow>
        <h2 className="mt-3 font-serif text-5xl font-light tracking-tight">Bon à savoir</h2>
      </Reveal>
      <div className="mt-10 divide-y divide-line border-y border-line">
        {faq.map((f) => (
          <details key={f.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-xl">
              {f.q}
              <span className="text-2xl text-gold transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------- FOOTER --------------------------------- */
function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-5 py-16 text-center">
        <p className="font-serif text-5xl font-light sm:text-7xl">
          Family <span className="italic text-gold">Affairs</span>
        </p>
        <p className="mt-3 text-sm text-cream/60">{shop.tagline}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
          <a href={waLink("Bonjour Family Affairs !")} target="_blank" className="hover:text-gold">WhatsApp</a>
          <a href={`tel:+${shop.whatsapp}`} className="hover:text-gold">{shop.phoneDisplay}</a>
          {shop.instagram && <a href={shop.instagram} target="_blank" className="hover:text-gold">Instagram</a>}
          {shop.facebook && <a href={shop.facebook} target="_blank" className="hover:text-gold">Facebook</a>}
          <a href={shop.mapsUrl} target="_blank" className="hover:text-gold">Google Maps</a>
        </div>
        <p className="mt-10 text-xs text-cream/40">© {new Date().getFullYear()} Family Affairs · {shop.city}</p>
      </div>
    </footer>
  );
}

/* --------------------------------- PANIER --------------------------------- */
function CartDrawer({
  open,
  onClose,
  cart,
  setQty,
  clear,
}: {
  open: boolean;
  onClose: () => void;
  cart: CartLine[];
  setQty: (key: string, qty: number) => void;
  clear: () => void;
}) {
  const [mode, setMode] = useState<"Retrait en boutique" | "Livraison">("Retrait en boutique");
  const priced = cart.every((l) => l.product.price != null);
  const total = cart.reduce((s, l) => s + l.qty * (l.product.price ?? 0), 0);
  const lineTotal = (l: CartLine) => (l.product.price == null ? "Prix sur demande" : formatPrice(l.qty * l.product.price));
  const totalLabel = priced ? formatPrice(total) : "À confirmer";

  function order(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const lines = cart.map((l) => `• ${l.qty} × ${l.product.name} (taille ${l.size}) — ${lineTotal(l)}`).join("\n");
    const msg =
      `Bonjour Family Affairs, je souhaite commander :\n\n${lines}\n\n` +
      `Total : ${totalLabel}\n` +
      `Nom : ${f.get("name")}\n` +
      `${mode}${mode === "Livraison" ? ` — quartier : ${f.get("area")}` : ""}\n\n` +
      `Merci de me confirmer la disponibilité.`;
    window.open(waLink(msg), "_blank");
  }

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none invisible"}`} aria-hidden={!open}>
      <div onClick={onClose} className={`absolute inset-0 bg-ink/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`} />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="font-serif text-2xl">Votre panier</h2>
          <button onClick={onClose} aria-label="Fermer" className="grid h-9 w-9 place-items-center rounded-full border border-line hover:border-ink">
            ✕
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
            <p className="font-serif text-2xl italic">Votre panier est vide.</p>
            <button onClick={onClose} className="text-sm underline">Continuer mes achats</button>
          </div>
        ) : (
          <form onSubmit={order} className="flex flex-1 flex-col overflow-hidden">
            <ul className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
              {cart.map((l) => (
                <li key={l.key} className="flex gap-4">
                  <div className="h-24 w-20 shrink-0 overflow-hidden rounded-xl">
                    <Visual src={l.product.image} alt={l.product.name} tone={l.product.tone} />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <p className="font-serif text-lg leading-tight">{l.product.name}</p>
                    <p className="text-xs text-muted">Taille {l.size}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-line">
                        <button type="button" onClick={() => setQty(l.key, l.qty - 1)} className="px-3 py-1">−</button>
                        <span className="w-6 text-center text-sm">{l.qty}</span>
                        <button type="button" onClick={() => setQty(l.key, l.qty + 1)} className="px-3 py-1">+</button>
                      </div>
                      <p className="text-sm font-semibold">{lineTotal(l)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="space-y-3 border-t border-line bg-paper px-6 py-5">
              <div className="flex gap-2">
                {(["Retrait en boutique", "Livraison"] as const).map((m) => (
                  <button
                    type="button"
                    key={m}
                    onClick={() => setMode(m)}
                    className={`flex-1 rounded-full py-2 text-xs font-semibold ${mode === m ? "bg-ink text-cream" : "border border-line"}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <input name="name" required placeholder="Votre nom" className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm outline-none focus:border-ink" />
              {mode === "Livraison" && (
                <input name="area" required placeholder="Quartier de livraison (Yaoundé)" className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm outline-none focus:border-ink" />
              )}
              <div className="flex items-baseline justify-between pt-1">
                <span className="text-sm text-muted">Total</span>
                <span className="font-serif text-2xl">{totalLabel}</span>
              </div>
              <button className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 text-sm font-semibold text-white transition hover:brightness-95">
                <WhatsAppIcon className="h-5 w-5" /> Commander sur WhatsApp
              </button>
              <button type="button" onClick={clear} className="w-full text-xs text-muted underline">
                Vider le panier
              </button>
            </div>
          </form>
        )}
      </aside>
    </div>
  );
}
