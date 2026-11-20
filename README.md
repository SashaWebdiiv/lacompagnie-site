# L'acompagnie improvisée — site

Site de **L'acompagnie improvisée**, troupe de théâtre à Sucy-en-Brie ([lacompagnie.net](https://lacompagnie.net)).
Il remplace le site WordPress/Elementor : même contenu, mêmes adresses, en Astro statique hébergé sur Vercel.

Développé par [Webdiiv](https://webdiiv.com).

## Démarrer

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # génère dist/
```

Chaque push sur `main` est déployé par Vercel.

## Structure

| Chemin | Rôle |
| --- | --- |
| `src/data/site.ts` | Coordonnées, réseaux, menu, titres et descriptions SEO de chaque page |
| `src/layouts/Layout.astro` | Gabarit commun : balises `<head>`, SEO, Open Graph |
| `src/styles/global.css` | Jetons de design (couleurs, polices) relevés sur l'ancien site |
| `src/pages/` | Une page par adresse de l'ancien site |
| `public/fonts/` | Police de titre Lovelo Black |
| `vercel.json` | Redirections permanentes des anciennes adresses WordPress (espace élèves, connexion…) |

## Adresses

Les adresses gardent la barre finale de WordPress (`/cours/`, `/contact/`…) pour ne rien perdre en référencement.
Les pages abandonnées (espace élèves, pages de compte, `/troupe/`) redirigent vers l'accueil.

## Billetterie

La billetterie passe de Pretix (auto-hébergé) à HelloAsso : la page `/billetterie/` intègre le widget HelloAsso
de chaque spectacle.
