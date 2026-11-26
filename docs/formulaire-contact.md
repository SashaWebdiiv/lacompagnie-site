# Mettre en service le formulaire de contact (Resend)

Le formulaire de `/contact/` est prêt. Tant que les trois variables ci-dessous ne sont pas définies
dans Vercel, il affiche « Votre message n’a pas pu être envoyé » et n’envoie rien.

Fonctionnement : la page envoie le message à `/api/contact/` (fonction Vercel,
`src/pages/api/contact.ts`), qui vérifie les champs, écarte les robots, puis demande à Resend
d’envoyer l’e-mail. La réponse à l’e-mail part directement vers la personne qui a écrit.

Compter environ 15 minutes. Rien ne change pour les e-mails OVH de `@lacompagnie.net`.

## 1. Créer le compte Resend

1. Créer un compte sur [resend.com](https://resend.com), de préférence avec une adresse de
   l’association ou de Webdiiv (pas un compte personnel, qui pourrait partir avec la personne).
2. Offre gratuite : 3 000 e-mails par mois, 100 par jour. Largement suffisant.

## 2. Valider le domaine lacompagnie.net

1. Dans Resend : **Domains → Add Domain** → `lacompagnie.net`, région **Ireland (eu-west-1)**.
2. Resend affiche des enregistrements DNS à créer, en général :
   - un **TXT** `resend._domainkey` (signature DKIM) ;
   - un **MX** et un **TXT** sur le sous-domaine `send` (adresse de retour et SPF).

   Ils sont tous sur `resend._domainkey` ou `send.` : **ils ne touchent pas aux enregistrements MX
   d’OVH** à la racine du domaine, qui servent à recevoir les e-mails.
3. Dans **Cloudflare → lacompagnie.net → DNS → Records**, ajouter chaque enregistrement tel
   quel, en **DNS only** (nuage gris, pas orange).
4. Revenir dans Resend et cliquer **Verify DNS Records**. La validation prend de quelques
   minutes à une heure.

## 3. Créer la clé API

1. Resend : **API Keys → Create API Key**.
2. Nom : `lacompagnie-site`, permission **Sending access**, domaine **lacompagnie.net**.
3. Copier la clé (`re_…`). Elle n’est affichée qu’une fois. Ne la mettre ni dans le code, ni
   dans un message : directement dans Vercel.

## 4. Ajouter les variables dans Vercel

Vercel → équipe **Webdiiv** → projet **lacompagnie-site** → **Settings → Environment Variables**.
Pour chacune, cocher **Production** et **Preview** :

| Nom | Valeur |
| --- | --- |
| `RESEND_API_KEY` | la clé `re_…` (cocher **Sensitive**) |
| `CONTACT_DESTINATAIRES` | les adresses qui reçoivent les messages, séparées par des virgules, ex. `hello@lacompagnie.net` |
| `CONTACT_EXPEDITEUR` | `L'acompagnie improvisée <contact@lacompagnie.net>` |

L’adresse d’expédition n’a pas besoin d’exister comme boîte mail : il suffit que le domaine
soit validé à l’étape 2. Les réponses partent vers la personne qui a écrit.

Les adresses de destination restent dans Vercel et non dans le code, parce que le dépôt est public.

## 5. Redéployer et tester

1. Vercel → **Deployments** → dernier déploiement → **⋯ → Redeploy** (les variables ne
   s’appliquent qu’aux nouveaux déploiements).
2. Envoyer un message réel depuis `/contact/` : la page doit afficher
   « Merci pour votre message, … » et l’e-mail arriver dans les boîtes indiquées.
3. En cas de souci : Resend → **Emails** liste chaque envoi et son statut ; Vercel →
   **Logs** affiche les erreurs de la fonction (`Formulaire de contact : …`).

## Protection contre les robots

L’ancien formulaire avait une case hCaptcha « Je suis un humain ». Elle est remplacée par deux
protections invisibles : un champ piège caché que seuls les robots remplissent, et un délai
minimum de 3 secondes entre l’affichage et l’envoi. Les envois suspects reçoivent une réponse
« ok » mais ne partent pas. Si du spam passe quand même, on pourra ajouter Cloudflare Turnstile.
