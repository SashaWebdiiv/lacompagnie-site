/**
 * Envoi du formulaire de contact par e-mail, via l'API Resend (https://resend.com).
 * Tourne à la demande sur Vercel ; le reste du site est statique.
 *
 * Variables d'environnement (à définir dans Vercel, jamais dans le dépôt, qui est public) :
 * - RESEND_API_KEY          clé API Resend (droit « envoi »)
 * - CONTACT_DESTINATAIRES   adresses qui reçoivent les messages, séparées par des virgules
 * - CONTACT_EXPEDITEUR      expéditeur, sur le domaine validé dans Resend,
 *                           ex. « L'acompagnie improvisée <contact@lacompagnie.net> »
 *
 * Voir docs/formulaire-contact.md pour la mise en service.
 */
import type { APIRoute } from "astro";
import { limites, motifs } from "../../data/contact";

export const prerender = false;

type Champs = {
  motif: string;
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  objet: string;
  message: string;
  site_web: string; // piège à robots : doit rester vide
  debut: string; // horodatage d'affichage du formulaire (ms)
};

const reponse = (statut: number, corps: Record<string, unknown>) =>
  new Response(JSON.stringify(corps), {
    status: statut,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });

const echapper = (texte: string) =>
  texte.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const emailValide = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const POST: APIRoute = async ({ request }) => {
  let donnees: Partial<Champs>;
  try {
    donnees = await request.json();
  } catch {
    return reponse(400, { ok: false, erreur: "Requête illisible." });
  }

  const champ = (cle: keyof Champs) => String(donnees[cle] ?? "").trim();
  const c: Champs = {
    motif: champ("motif"),
    prenom: champ("prenom"),
    nom: champ("nom"),
    email: champ("email"),
    telephone: champ("telephone"),
    objet: champ("objet"),
    message: champ("message"),
    site_web: champ("site_web"),
    debut: champ("debut"),
  };

  // Anti-robots : champ piège rempli, ou formulaire envoyé en moins de 3 secondes.
  // On répond « ok » pour ne pas renseigner le robot, sans rien envoyer.
  const duree = Date.now() - Number(c.debut || 0);
  if (c.site_web || !Number.isFinite(duree) || duree < 3000) {
    return reponse(200, { ok: true });
  }

  // Validation (les mêmes règles que sur la page).
  const erreurs: Record<string, string> = {};
  const obligatoire = "Ce champ est obligatoire";
  if (!(motifs as readonly string[]).includes(c.motif)) erreurs.motif = obligatoire;
  if (!c.prenom) erreurs.prenom = obligatoire;
  if (!c.nom) erreurs.nom = obligatoire;
  if (!c.email) erreurs.email = obligatoire;
  else if (!emailValide(c.email)) erreurs.email = "Cette adresse e-mail n’est pas valide";
  if (!c.objet) erreurs.objet = obligatoire;
  if (!c.message) erreurs.message = obligatoire;
  for (const [cle, max] of Object.entries(limites)) {
    if (c[cle as keyof typeof limites].length > max) erreurs[cle] = `${max} caractères maximum`;
  }
  if (Object.keys(erreurs).length) return reponse(422, { ok: false, erreurs });

  const cle = import.meta.env.RESEND_API_KEY ?? process.env.RESEND_API_KEY;
  const destinataires = (import.meta.env.CONTACT_DESTINATAIRES ?? process.env.CONTACT_DESTINATAIRES ?? "")
    .split(",")
    .map((a: string) => a.trim())
    .filter(Boolean);
  const expediteur = import.meta.env.CONTACT_EXPEDITEUR ?? process.env.CONTACT_EXPEDITEUR;
  if (!cle || !destinataires.length || !expediteur) {
    console.error("Formulaire de contact : RESEND_API_KEY, CONTACT_DESTINATAIRES ou CONTACT_EXPEDITEUR manquant.");
    return reponse(503, { ok: false, erreur: "Le formulaire n’est pas encore activé." });
  }

  // Même présentation que les e-mails de l'ancien formulaire WordPress.
  const lignes: [string, string][] = [
    ["Motif de votre demande", c.motif],
    ["Prénom", c.prenom],
    ["Nom", c.nom],
    ["Adresse e-mail", c.email],
    ["Numéro de téléphone", c.telephone || "—"],
    ["Objet du message", c.objet],
    ["Votre message", c.message],
  ];
  const html = `<p>Une nouvelle entrée de formulaire a été soumise sur la page de contact de L'acompagnie improvisée. Les informations liées à cette demande sont détaillées ci-dessous.</p>
<table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
${lignes
  .map(
    ([titre, valeur]) =>
      `<tr><th align="left" valign="top" style="border-bottom:1px solid #eee;padding-right:16px">${echapper(titre)}</th><td style="border-bottom:1px solid #eee;white-space:pre-wrap">${echapper(valeur)}</td></tr>`,
  )
  .join("\n")}
</table>
<p style="color:#888;font-size:12px">Répondez directement à cet e-mail pour écrire à ${echapper(c.prenom)}.</p>`;
  const texte = lignes.map(([t, v]) => `${t} : ${v}`).join("\n\n");

  const envoi = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${cle}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: expediteur,
      to: destinataires,
      reply_to: `${c.prenom} ${c.nom} <${c.email}>`,
      subject: `${c.objet} - Contact L'acompagnie improvisée`,
      html,
      text: texte,
    }),
  }).catch((e) => {
    console.error("Formulaire de contact : Resend injoignable", e);
    return null;
  });

  if (!envoi || !envoi.ok) {
    if (envoi) console.error("Formulaire de contact : refus de Resend", envoi.status, await envoi.text());
    return reponse(502, { ok: false, erreur: "L’envoi a échoué." });
  }
  return reponse(200, { ok: true });
};

// Toute autre méthode : refusée.
export const ALL: APIRoute = () => reponse(405, { ok: false, erreur: "Méthode non autorisée." });
