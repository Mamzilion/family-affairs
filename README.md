# Site — Family Affairs (boutique de vêtements, Yaoundé)

Site vitrine + catalogue en Next.js 15 + Tailwind CSS 4, prêt pour Vercel.
Pas de base de données : les commandes partent sur WhatsApp, déjà rédigées.

## Fonctionnalités

- Catalogue filtrable (Femme, Homme, Enfant, Accessoires) avec choix de la taille
- Panier conservé sur le téléphone du client, quantités, total en FCFA
- Commande envoyée sur WhatsApp (retrait en boutique ou livraison avec quartier)
- Statut « Ouvert / Fermé » en direct (heure du Cameroun) et tableau des horaires
- Carte Google Maps, bouton d'appel et itinéraire
- FAQ, bouton WhatsApp flottant

## Lancer en local

```bash
npm install
npm run dev
```

## Personnaliser

Tout est dans **`src/content/site.ts`** :

- `products` : les articles (nom, catégorie, prix, tailles, photo). Les articles actuels sont des **exemples**.
- `shop.heroImages` : 3 photos pour l'accueil.
- `shop.address`, `shop.instagram`, `shop.facebook` : à compléter.
- `hours` : les horaires (repris de la fiche Google Maps).
- `about` et `faq` : textes à confirmer avec la boutique.

Photos : mettre les fichiers dans `public/produits/` puis écrire le chemin, ex. `image: "/produits/robe-wax.jpg"`.
Conseil : photos verticales (format 3:4), compressées (moins de 300 Ko).

Couleurs : `src/app/globals.css` (variables `--clay`, `--gold`, `--ink`…).

## Déployer sur Vercel

1. Pousser le dossier sur GitHub.
2. vercel.com → **Add New → Project** → importer le dépôt → **Deploy**.
