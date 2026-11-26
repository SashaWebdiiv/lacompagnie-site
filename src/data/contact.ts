/** Contenu du formulaire de contact, partagé entre la page et la fonction d'envoi. */

export const motifs = [
  "Je veux m’inscrire à un cours 🎭",
  "Je veux faire un cours d’essai",
  "Infos sur les cours (horaires / tarifs / niveaux)",
  "Je veux parler à un prof",
  "Stages / ateliers",
  "Billetterie / paiements",
  "Partenariat",
  "Autre",
] as const;

/** Limites de longueur, côté page et côté serveur. */
export const limites = {
  prenom: 100,
  nom: 100,
  email: 200,
  telephone: 40,
  objet: 200,
  message: 5000,
} as const;
