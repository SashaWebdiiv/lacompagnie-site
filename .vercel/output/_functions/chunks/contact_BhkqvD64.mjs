import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
// src/data/contact.ts
/** Contenu du formulaire de contact, partagé entre la page et la fonction d'envoi. */
var motifs = [
	"Je veux m’inscrire à un cours 🎭",
	"Je veux faire un cours d’essai",
	"Infos sur les cours (horaires / tarifs / niveaux)",
	"Je veux parler à un prof",
	"Stages / ateliers",
	"Billetterie / paiements",
	"Partenariat",
	"Autre"
];
/** Limites de longueur, côté page et côté serveur. */
var limites = {
	prenom: 100,
	nom: 100,
	email: 200,
	telephone: 40,
	objet: 200,
	message: 5e3
};
// src/pages/api/contact.ts
var contact_exports = /* @__PURE__ */ __exportAll({
	ALL: () => ALL,
	POST: () => POST,
	prerender: () => false
});
var reponse = (statut, corps) => new Response(JSON.stringify(corps), {
	status: statut,
	headers: {
		"Content-Type": "application/json; charset=utf-8",
		"Cache-Control": "no-store"
	}
});
var echapper = (texte) => texte.replace(/[&<>"']/g, (c) => ({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
})[c]);
var emailValide = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
var POST = async ({ request }) => {
	let donnees;
	try {
		donnees = await request.json();
	} catch {
		return reponse(400, {
			ok: false,
			erreur: "Requête illisible."
		});
	}
	const champ = (cle) => String(donnees[cle] ?? "").trim();
	const c = {
		motif: champ("motif"),
		prenom: champ("prenom"),
		nom: champ("nom"),
		email: champ("email"),
		telephone: champ("telephone"),
		objet: champ("objet"),
		message: champ("message"),
		site_web: champ("site_web"),
		debut: champ("debut")
	};
	const duree = Date.now() - Number(c.debut || 0);
	if (c.site_web || !Number.isFinite(duree) || duree < 3e3) return reponse(200, { ok: true });
	const erreurs = {};
	const obligatoire = "Ce champ est obligatoire";
	if (!motifs.includes(c.motif)) erreurs.motif = obligatoire;
	if (!c.prenom) erreurs.prenom = obligatoire;
	if (!c.nom) erreurs.nom = obligatoire;
	if (!c.email) erreurs.email = obligatoire;
	else if (!emailValide(c.email)) erreurs.email = "Cette adresse e-mail n’est pas valide";
	if (!c.objet) erreurs.objet = obligatoire;
	if (!c.message) erreurs.message = obligatoire;
	for (const [cle, max] of Object.entries(limites)) if (c[cle].length > max) erreurs[cle] = `${max} caractères maximum`;
	if (Object.keys(erreurs).length) return reponse(422, {
		ok: false,
		erreurs
	});
	const cle = process.env.RESEND_API_KEY;
	const destinataires = (process.env.CONTACT_DESTINATAIRES ?? "").split(",").map((a) => a.trim()).filter(Boolean);
	const expediteur = process.env.CONTACT_EXPEDITEUR;
	if (!cle || !destinataires.length || !expediteur) {
		console.error("Formulaire de contact : RESEND_API_KEY, CONTACT_DESTINATAIRES ou CONTACT_EXPEDITEUR manquant.");
		return reponse(503, {
			ok: false,
			erreur: "Le formulaire n’est pas encore activé."
		});
	}
	const lignes = [
		["Motif de votre demande", c.motif],
		["Prénom", c.prenom],
		["Nom", c.nom],
		["Adresse e-mail", c.email],
		["Numéro de téléphone", c.telephone || "—"],
		["Objet du message", c.objet],
		["Votre message", c.message]
	];
	const html = `<p>Une nouvelle entrée de formulaire a été soumise sur la page de contact de L'acompagnie improvisée. Les informations liées à cette demande sont détaillées ci-dessous.</p>
<table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
${lignes.map(([titre, valeur]) => `<tr><th align="left" valign="top" style="border-bottom:1px solid #eee;padding-right:16px">${echapper(titre)}</th><td style="border-bottom:1px solid #eee;white-space:pre-wrap">${echapper(valeur)}</td></tr>`).join("\n")}
</table>
<p style="color:#888;font-size:12px">Répondez directement à cet e-mail pour écrire à ${echapper(c.prenom)}.</p>`;
	const texte = lignes.map(([t, v]) => `${t} : ${v}`).join("\n\n");
	const envoi = await fetch("https://api.resend.com/emails", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${cle}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			from: expediteur,
			to: destinataires,
			reply_to: `${c.prenom} ${c.nom} <${c.email}>`,
			subject: `${c.objet} - Contact L'acompagnie improvisée`,
			html,
			text: texte
		})
	}).catch((e) => {
		console.error("Formulaire de contact : Resend injoignable", e);
		return null;
	});
	if (!envoi || !envoi.ok) {
		if (envoi) console.error("Formulaire de contact : refus de Resend", envoi.status, await envoi.text());
		return reponse(502, {
			ok: false,
			erreur: "L’envoi a échoué."
		});
	}
	return reponse(200, { ok: true });
};
var ALL = () => reponse(405, {
	ok: false,
	erreur: "Méthode non autorisée."
});
// \0virtual:astro:page:src/pages/api/contact@_@ts
var page = () => contact_exports;
export { page };
