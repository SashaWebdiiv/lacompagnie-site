/** Informations générales de la troupe, reprises du site WordPress. */
export const site = {
  nom: "L'acompagnie improvisée",
  url: "https://lacompagnie.net",
  slogan: "Troupe de théâtre à Sucy-en-Brie",
  email: "hello@lacompagnie.net",
  adresse: ["14, place du Clos de Pacy", "94370 Sucy-en-Brie"],
  instagram: "https://www.instagram.com/l_acompagnie/",
  facebook: "https://www.facebook.com/LacompagnieSucy",
};

/**
 * Menu de l'en-tête sur ordinateur (« Menu site - sans billetterie » dans WordPress) ;
 * la billetterie a son propre bouton. L'entrée « Connexion » (espace élèves) est retirée.
 */
export const navigation = [
  { libelle: "Accueil", href: "/" },
  { libelle: "Nos Cours", href: "/cours/" },
  { libelle: "Nos Projets", href: "/projets/" },
  { libelle: "Contact", href: "/contact/" },
];

/** Menu plein écran (« Menu site - avec billetterie » dans WordPress), sans « Connexion ». */
export const navigationPleinEcran = [
  { libelle: "Accueil", href: "/" },
  { libelle: "Billetterie", href: "/billetterie/" },
  { libelle: "Cours", href: "/cours/" },
  { libelle: "Catalogue", href: "/projets/" },
  { libelle: "Contact", href: "/contact/" },
];

/** Liens légaux du pied de page. */
export const liensLegaux = [
  { libelle: "Mentions légales", href: "/mentions-legales/" },
  { libelle: "CGV", href: "/conditions-generales-de-vente/" },
  { libelle: "Politique de confidentialité", href: "/politique-de-confidentialite/" },
  { libelle: "Politique de cookies", href: "/politique-de-cookies/" },
];

/**
 * Mesure d'audience et Search Console.
 * - ga4 : identifiant de mesure Google Analytics 4 (« G-XXXXXXXXXX »). Vide = aucun suivi ni bannière cookies.
 *   Peut aussi être fourni par la variable d'environnement PUBLIC_GA4_ID.
 * - searchConsole : contenu de la balise de validation Google Search Console (méthode « Balise HTML »),
 *   inutile si la propriété est validée par DNS.
 */
export const mesure = {
  ga4: (import.meta.env.PUBLIC_GA4_ID as string | undefined) ?? "",
  searchConsole: "",
};

/** Titres et descriptions SEO, repris tels quels de Yoast. */
export const seo = {
  accueil: {
    titre: "L'acompagnie improvisée – Troupe de théâtre à Sucy-en-Brie",
    description:
      "Troupe de théâtre basée à Sucy-en-Brie. Cours de théâtre du soir, formations théâtre et improvisation, écriture de pièces & scénarios.",
  },
  galerie: {
    titre: "Galerie – L'acompagnie improvisée",
    description:
      "Retrouvez les images exclusives des pièces de théâtre et spectacles, des répétitions et des temps forts de la troupe L'acompagnie improvisée.",
  },
  contact: {
    titre: "Contact – L'acompagnie improvisée",
    description:
      "Contactez la troupe L'acompagnie improvisée, troupe de théâtre à Sucy-en-Brie, pour en savoir plus sur nos cours et formations.",
  },
  billetterie: {
    titre: "Billetterie – L'acompagnie improvisée",
    description:
      "Achetez vos places pour les pièces de théâtre et spectacles de L'acompagnie improvisée, troupe de théâtre à Sucy-en-Brie.",
  },
  cours: {
    titre: "Cours du soir – L'acompagnie improvisée",
    description:
      "Découvrez les cours de théâtre du soir de L'acompagnie improvisée, troupe de théâtre à Sucy-en-Brie. Cours pour débutants et confirmés.",
  },
  projets: {
    titre: "Formations à la demande – L'acompagnie improvisée",
    description:
      "Découvrez les formations de L'acompagnie improvisée, troupe de théâtre à Sucy-en-Brie. Formations pour scolaires, entreprises & associations.",
  },
  mentionsLegales: {
    titre: "Mentions légales – L'acompagnie improvisée",
    description: "Mentions légales de l'Acompagnie improvisée, troupe de théâtre à Sucy-en-Brie.",
  },
  cgv: {
    titre: "Conditions générales de vente – L'acompagnie improvisée",
    description: "Conditions générales de vente de l'Acompagnie improvisée, troupe de théâtre à Sucy-en-Brie.",
  },
  confidentialite: {
    titre: "Politique de confidentialité – L'acompagnie improvisée",
    description: "Politique de confidentialité de l'Acompagnie improvisée, troupe de théâtre à Sucy-en-Brie.",
  },
  cookies: {
    titre: "Politique de cookies – L'acompagnie improvisée",
    description: "Politique de cookies de l'Acompagnie improvisée, troupe de théâtre à Sucy-en-Brie.",
  },
} as const;

export type CleSeo = keyof typeof seo;
