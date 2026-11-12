/**
 * TOUT le contenu du site est ici : textes, produits, prix, horaires, contacts.
 * Les éléments marqués « EXEMPLE » sont à remplacer par les vraies infos de la boutique.
 *
 * IMAGES : place les photos dans /public/produits/ (ex. /public/produits/robe-wax.jpg)
 * puis indique le chemin dans `image` (ex. "/produits/robe-wax.jpg").
 * Tant que `image` est vide, un visuel d'attente s'affiche.
 */

export const shop = {
  name: "Family Affairs",
  tagline: "Boutique de vêtements à Yaoundé",
  // Numéro WhatsApp au format international sans « + » (numéro de la fiche Google).
  whatsapp: "237651582663",
  phoneDisplay: "+237 6 51 58 26 63",
  city: "Yaoundé, Cameroun",
  address: "Yaoundé — préciser le quartier et un repère", // À COMPLÉTER
  mapsUrl: "https://maps.app.goo.gl/2hn81VjXbvzBaZ8v7",
  mapsEmbed: "https://www.google.com/maps?q=3.837681,11.5419246&z=16&output=embed",
  instagram: "", // À COMPLÉTER si la boutique a un compte
  facebook: "", // À COMPLÉTER
  currency: "FCFA",
  heroImages: ["/produits/family-affairs2.webp", "/produits/family-affairs.webp", "/produits/article4.webp"], // grande arche, puis 2 petites vignettes
};

/** Horaires (0 = dimanche … 6 = samedi), heure du Cameroun. */
export const hours: { day: string; open?: string; close?: string }[] = [
  { day: "Dimanche" },
  { day: "Lundi", open: "08:30", close: "19:30" },
  { day: "Mardi", open: "10:30", close: "19:30" },
  { day: "Mercredi", open: "08:30", close: "19:30" },
  { day: "Jeudi", open: "08:30", close: "19:30" },
  { day: "Vendredi", open: "08:30", close: "19:30" },
  { day: "Samedi", open: "09:00", close: "19:30" },
];

export const categories = ["Sacs", "Chaussures", "Femme", "Enfant"] as const;
export type Category = (typeof categories)[number];

export type Product = {
  id: string;
  name: string;
  category: Category;
  price: number | null; // null = « Prix sur demande »
  sizes: string[];
  image: string;
  tag?: string; // ex. « Nouveau », « -20 % »
  tone: string; // couleur affichée pendant le chargement / si pas de photo
};

/**
 * Articles repris des photos de la boutique.
 * Prix à confirmer avec la boutique : remplacer `null` par le prix en FCFA (ex. 15000).
 */
export const products: Product[] = [
  { id: "s1", name: "Sac à main structuré", category: "Sacs", price: null, sizes: ["Unique"], image: "/produits/article2.webp", tag: "Nouveau", tone: "#1f4d4a" },
  { id: "s2", name: "Sacs à rabat — plusieurs coloris", category: "Sacs", price: null, sizes: ["Jaune", "Rouge", "Bleu", "Vert", "Taupe"], image: "/produits/article3.webp", tone: "#c4a35a" },
  { id: "s3", name: "Pochette rose bijou", category: "Sacs", price: null, sizes: ["Unique"], image: "/produits/article1.webp", tone: "#e45a84" },
  { id: "s4", name: "Pochette dorée de soirée", category: "Sacs", price: null, sizes: ["Unique"], image: "/produits/sac.webp", tone: "#d8c08a" },
  { id: "c1", name: "Mules en cuir", category: "Chaussures", price: null, sizes: ["37", "38", "39", "40", "41"], image: "/produits/chaussure_femmes2.webp", tone: "#d6c2a8" },
  { id: "c2", name: "Sandales à nœud fleuri", category: "Chaussures", price: null, sizes: ["37", "38", "39", "40"], image: "/produits/chaussure_femme.webp", tag: "Nouveau", tone: "#e6ded3" },
  { id: "c3", name: "Bottines montantes", category: "Chaussures", price: null, sizes: ["38", "39", "40", "41", "42", "43"], image: "/produits/timberland.webp", tone: "#c9a256" },
  { id: "c4", name: "Sandales fillette à fleurs", category: "Chaussures", price: null, sizes: ["24", "26", "28", "30"], image: "/produits/chaussure_enfant.webp", tone: "#eee5ea" },
  { id: "f1", name: "Robe fleurie évasée", category: "Femme", price: null, sizes: ["S", "M", "L", "XL"], image: "/produits/robe.webp", tag: "Coup de cœur", tone: "#1e3b2c" },
  { id: "e1", name: "Ensemble sweat et jogging", category: "Enfant", price: null, sizes: ["2 ans", "4 ans", "6 ans", "8 ans"], image: "/produits/enfant.webp", tone: "#7b2b7f" },
  { id: "e2", name: "Tenue habillée garçon", category: "Enfant", price: null, sizes: ["4 ans", "6 ans", "8 ans", "10 ans"], image: "/produits/tenue_enfant.webp", tone: "#283a5c" },
];

export const about = {
  title: "Habiller toute la famille,",
  accent: "avec soin.",
  text: [
    "Family Affairs est une boutique de vêtements à Yaoundé. On y trouve des sacs, des chaussures et des tenues pour femmes et enfants, pour le quotidien comme pour les grandes occasions.",
    "Ce texte est un exemple : à remplacer par l'histoire de la boutique, sa date d'ouverture et ce qui la rend unique.",
  ],
  values: [
    { title: "Pour toute la famille", text: "Sacs, chaussures, tenues femme et enfant : un seul endroit pour toute la famille." },
    { title: "Conseil personnalisé", text: "On vous aide à trouver la bonne taille et la bonne tenue." },
    { title: "Commande facile", text: "Choisissez en ligne, confirmez sur WhatsApp, récupérez ou faites-vous livrer." },
  ],
};

export const howTo = [
  { title: "Choisissez", text: "Parcourez le catalogue et ajoutez vos articles au panier avec la bonne taille." },
  { title: "Envoyez sur WhatsApp", text: "Votre commande arrive directement chez la boutique, déjà rédigée." },
  { title: "Récupérez ou recevez", text: "Passez en boutique ou faites-vous livrer dans Yaoundé." },
];

export const faq = [
  { q: "Livrez-vous à Yaoundé ?", a: "Oui, la livraison est possible dans Yaoundé. Les frais dépendent du quartier et sont confirmés sur WhatsApp. (Exemple à confirmer avec la boutique.)" },
  { q: "Quels moyens de paiement acceptez-vous ?", a: "Espèces en boutique, Orange Money et MTN Mobile Money. (Exemple à confirmer.)" },
  { q: "Puis-je échanger un article ?", a: "Les échanges sont possibles sous quelques jours avec l'étiquette. (Exemple à confirmer.)" },
  { q: "Les articles affichés sont-ils disponibles ?", a: "Le stock change vite : la boutique confirme la disponibilité et la taille sur WhatsApp avant toute livraison." },
];
