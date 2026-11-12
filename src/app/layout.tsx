import type { Metadata } from "next";
// Polices auto-hébergées (aucun appel externe à Google Fonts)
import "@fontsource-variable/fraunces";
import "@fontsource-variable/fraunces/full-italic.css";
import "@fontsource-variable/manrope";
import "./globals.css";

export const metadata: Metadata = {
  title: "Family Affairs | Boutique de vêtements à Yaoundé",
  description:
    "Vêtements femme, homme, enfant et accessoires à Yaoundé. Parcourez le catalogue et commandez directement sur WhatsApp.",
  openGraph: {
    title: "Family Affairs — Boutique de vêtements à Yaoundé",
    description: "Habiller toute la famille. Commandez sur WhatsApp.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
