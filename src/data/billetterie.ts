/**
 * Page Billetterie : lien de réservation et foire aux questions, repris de l'ancien site.
 *
 * Pour le prochain spectacle (HelloAsso) : remplacer `reservation` par le lien de la billetterie HelloAsso,
 * et le visuel du bandeau dans src/assets/billetterie/. Penser aussi à relire la FAQ, qui parle encore
 * de Stripe et de l'ancienne billetterie Pretix (questions 3 et 6).
 */

/** Lien du bandeau et du bouton « Je réserve ma place » (Festival Improvisé du 14 juin 2026, sur PayAsso). */
export const reservation = "https://www.payasso.fr/lacompagnie-improvisee/festival-improvisee";

export type QuestionFaq = { titre: string; icone: { viewBox: string; d: string }; reponse: string };

/** Questions de l'ancienne page ; `reponse` est du HTML. Les emojis sont des images Twemoji (public/emoji/), comme avant. */
export const faq: QuestionFaq[] = [
  {
    "titre": "Wow ! Vous avez ouvert une billetterie en ligne ?",
    "icone": {
      "viewBox": "0 0 576 512",
      "d": "M128 160h320v192H128V160zm400 96c0 26.51 21.49 48 48 48v96c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48v-96c26.51 0 48-21.49 48-48s-21.49-48-48-48v-96c0-26.51 21.49-48 48-48h480c26.51 0 48 21.49 48 48v96c-26.51 0-48 21.49-48 48zm-48-104c0-13.255-10.745-24-24-24H120c-13.255 0-24 10.745-24 24v208c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24V152z"
    },
    "reponse": "<p>Et oui ! Pour simplifier les démarches d'achat et mieux vous accueillir, nous avons créé cette billetterie qui vous permet de réserver vos places en quelques clics. Sympa, non ? <img class=\"emoji\" src=\"/emoji/1f973.svg\" alt=\"🥳\" width=\"16\" height=\"16\"></p>"
  },
  {
    "titre": "Quels sont les modes de paiement proposés ?",
    "icone": {
      "viewBox": "0 0 576 512",
      "d": "M0 432c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V256H0v176zm192-68c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H204c-6.6 0-12-5.4-12-12v-40zm-128 0c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM576 80v48H0V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48z"
    },
    "reponse": "<p>Nous avons mis en place sur la billetterie le <span style=\"text-decoration: underline;\">paiement en ligne par carte bancaire : simple, sécurisé et instantané</span>.</p><p><img class=\"emoji\" src=\"/emoji/1f4b0.svg\" alt=\"💰\" width=\"16\" height=\"16\"> Afin de simplifier notre gestion administrative, les chèques, espèces et virements ne sont pas acceptés !</p>"
  },
  {
    "titre": "Le paiement en ligne par carte est-il sécurisé ?",
    "icone": {
      "viewBox": "0 0 448 512",
      "d": "M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"
    },
    "reponse": "<p>Oui ! La billetterie est sécurisée par le protocole SSL (https), qui crypte les données sensibles échangées entre votre navigateur web et nos serveurs, assurant ainsi la confidentialité des informations saisies.</p><p>De plus, sachez que nous n'aurons jamais accès à vos données bancaires confidentielles (le numéro de carte bancaire à 16 chiffres, la date d'expiration et le code CVV). En effet, le règlement en ligne est directement géré par notre prestataire Stripe, l'un des leaders mondiaux en solutions de paiement. Stripe est largement reconnu pour ses services fiables et de très nombreux sites e-commerce l'utilisent pour gérer les transactions par carte. Si vous effectuez souvent des achats en ligne, il est d'ailleurs très probable que vous ayez déjà, sans même vous en rendre compte, payé avec votre carte via la solution technique Stripe à de nombreuses reprises.</p>"
  },
  {
    "titre": "Puis-je acheter mon billet sur place au théâtre ?",
    "icone": {
      "viewBox": "0 0 640 512",
      "d": "M206.86 245.15c-35.88 10.45-59.95 41.2-57.53 74.1 11.4-12.72 28.81-23.7 49.9-30.92l7.63-43.18zM95.81 295L64.08 115.49c-.29-1.62.28-2.62.24-2.65 57.76-32.06 123.12-49.01 189.01-49.01 1.61 0 3.23.17 4.85.19 13.95-13.47 31.73-22.83 51.59-26 18.89-3.02 38.05-4.55 57.18-5.32-9.99-13.95-24.48-24.23-41.77-27C301.27 1.89 277.24 0 253.32 0 176.66 0 101.02 19.42 33.2 57.06 9.03 70.48-3.92 98.48 1.05 126.58l31.73 179.51c14.23 80.52 136.33 142.08 204.45 142.08 3.59 0 6.75-.46 10.01-.8-13.52-17.08-28.94-40.48-39.5-67.58-47.61-12.98-106.06-51.62-111.93-84.79zm97.55-137.46c-.73-4.12-2.23-7.87-4.07-11.4-8.25 8.91-20.67 15.75-35.32 18.32-14.65 2.58-28.67.4-39.48-5.17-.52 3.94-.64 7.98.09 12.1 3.84 21.7 24.58 36.19 46.34 32.37 21.75-3.82 36.28-24.52 32.44-46.22zM606.8 120.9c-88.98-49.38-191.43-67.41-291.98-51.35-27.31 4.36-49.08 26.26-54.04 54.36l-31.73 179.51c-15.39 87.05 95.28 196.27 158.31 207.35 63.03 11.09 204.47-53.79 219.86-140.84l31.73-179.51c4.97-28.11-7.98-56.11-32.15-69.52zm-273.24 96.8c3.84-21.7 24.58-36.19 46.34-32.36 21.76 3.83 36.28 24.52 32.45 46.22-.73 4.12-2.23 7.87-4.07 11.4-8.25-8.91-20.67-15.75-35.32-18.32-14.65-2.58-28.67-.4-39.48 5.17-.53-3.95-.65-7.99.08-12.11zm70.47 198.76c-55.68-9.79-93.52-59.27-89.04-112.9 20.6 25.54 56.21 46.17 99.49 53.78 43.28 7.61 83.82.37 111.93-16.6-14.18 51.94-66.71 85.51-122.38 75.72zm130.3-151.34c-8.25-8.91-20.68-15.75-35.33-18.32-14.65-2.58-28.67-.4-39.48 5.17-.52-3.94-.64-7.98.09-12.1 3.84-21.7 24.58-36.19 46.34-32.37 21.75 3.83 36.28 24.52 32.45 46.22-.73 4.13-2.23 7.88-4.07 11.4z"
    },
    "reponse": "<p>Non, désolés ! <img class=\"emoji\" src=\"/emoji/1f622.svg\" alt=\"😢\" width=\"16\" height=\"16\"> Il n'est possible de se procurer un billet que par cette billetterie.</p>"
  },
  {
    "titre": "Puis-je échanger / annuler mon billet une fois la commande effectuée ?",
    "icone": {
      "viewBox": "0 0 512 512",
      "d": "M0 168v-16c0-13.255 10.745-24 24-24h360V80c0-21.367 25.899-32.042 40.971-16.971l80 80c9.372 9.373 9.372 24.569 0 33.941l-80 80C409.956 271.982 384 261.456 384 240v-48H24c-13.255 0-24-10.745-24-24zm488 152H128v-48c0-21.314-25.862-32.08-40.971-16.971l-80 80c-9.372 9.373-9.372 24.569 0 33.941l80 80C102.057 463.997 128 453.437 128 432v-48h360c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24z"
    },
    "reponse": "<p><img class=\"emoji\" src=\"/emoji/26a0.svg\" alt=\"⚠️\" width=\"16\" height=\"16\"> Choisissez bien vos dates ! En principe, <span style=\"text-decoration: underline;\">les échanges et annulations/remboursements ne sont pas possibles</span>. En effet, il nous serait trop prenant en temps de gérer ces réclamations. En cas de circonstances exceptionnelles, nous vous invitons à <a href=\"mailto:hello@lacompagnie.net\">nous contacter</a>.</p>"
  },
  {
    "titre": "Je n'ai pas reçu mes billets dans ma boîte mail ou j'ai perdu le mail contenant mes billets.",
    "icone": {
      "viewBox": "0 0 512 512",
      "d": "M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"
    },
    "reponse": "<p>Avez-vous pensé à vérifier vos spams ? Parfois, nos mails tombent dedans par erreur.</p><p>Vous pouvez également demander à <a href=\"https://billetterie.lacompagnie.net/lacompagnie/quiproquos/resend/\" target=\"_blank\" rel=\"noopener\">renvoyer votre commande sur votre adresse e-mail en cliquant ici</a>.</p><p>Si après avoir suivi cette procédure vous n'avez toujours rien reçu, n'hésitez pas à <a href=\"/contact/\">prendre contact avec nous</a> <img class=\"emoji\" src=\"/emoji/1f60a.svg\" alt=\"😊\" width=\"16\" height=\"16\"></p>"
  },
  {
    "titre": "Je rencontre un problème. Comment vous contacter ?",
    "icone": {
      "viewBox": "0 0 512 512",
      "d": "M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"
    },
    "reponse": "<p>N'hésitez pas à nous écrire en utilisant notre <a href=\"/contact/\">formulaire de contact</a> ou bien en nous envoyant directement un e-mail à <a href=\"mailto:hello@lacompagnie.net\" target=\"_blank\" rel=\"noreferrer noopener\">hello@lacompagnie.net</a> Nous serons ravis de vous aider. <img class=\"emoji\" src=\"/emoji/1f60a.svg\" alt=\"😊\" width=\"16\" height=\"16\"></p>"
  }
];
