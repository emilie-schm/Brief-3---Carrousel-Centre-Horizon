# Centre Horizon — Galerie d'inspiration (Carrousel interactif)

Projet réalisé dans le cadre de la refonte de la page d'accueil du **Centre Horizon**. L'objectif est de proposer une galerie photo interactive, fluide, responsive et entièrement accessible au clavier.

---

## Fonctionnalités réalisées

- **Affichage dynamique (R1 & R9)** : Chargement automatique de la première photo avec mise à jour dynamique de sa source (`src`), de sa description alternative (`alt`), de sa légende (`figcaption`) et du compteur (`1 / 6`).
- **Barre d'outils escamotable (R2)** : Bouton/lien d'affichage et de masquage (`#toolbar-toggle`) permettant de déployer ou replier les commandes sans recharger ni faire remonter la page.
- **Navigation en boucle (R3 & R4)** : Boutons *Précédent* et *Suivant* permettant un défilement continu (retour à la première image après la dernière, et inversement).
- **Mode aléatoire intelligent (R5)** : Affichage d'une photo au hasard tout en garantissant de ne jamais afficher deux fois la même photo consécutivement.
- **Lecture automatique & Pause (R6 & R8)** : Défilement automatique toutes les 3 secondes avec changement d'icône (Play / Pause), réinitialisation du minuteur à chaque action utilisateur et déclenchement automatique après une période d'inactivité.
- **Raccourcis clavier (R7)** : Navigation possible à l'aide des flèches gauche (`ArrowLeft`) et droite (`ArrowRight`) du clavier.

---

## Choix techniques & Accessibilité

- **HTML5 sémantique** : Utilisation des balises `<header>`, `<main>`, `<figure>`, `<figcaption>` et `<button>` pour une structure claire et validée W3C.
- **Accessibilité (RGAA / WCAG)** :
  - Attributs `aria-label` dynamiques sur les boutons ne contenant que des icônes (notamment le bouton Lecture/Pause qui adapte son libellé selon son état).
  - Attribut `aria-expanded` sur le contrôle de la barre d'outils pour indiquer son état d'ouverture aux lecteurs d'écran.
  - Focus clavier visible (`:focus`) sur l'ensemble des éléments interactifs.
- **CSS3 & Responsive Design** : Mise en page Flexbox, effet visuel incliné avec bords arrondis conforme à la maquette, et adaptation fluide jusqu'aux écrans mobiles de **375 px** sans défilement horizontal.
- **JavaScript natif (Vanilla JS)** :
  - Code exécuté en mode strict (`"use strict"`).
  - Manipulation sécurisée du DOM exclusivement via `textContent`, `setAttribute` et `classList` (aucun recours à `innerHTML`).
  - Gestion rigoureuse de la mémoire avec un seul intervalle (`setInterval` / `clearInterval`) actif à la fois.

---

## Structure du projet

```text
centre-horizon-carrousel/
├── images/               # Dossier contenant les 6 photos du carrousel
│   ├── loup1.jpg
│   ├── loup2.jpg
│   ├── loup3.png
│   ├── loup4.jpg
│   ├── loup5.jpg
│   └── loup6.jpg
├── index.html            # Structure sémantique de la page
├── style.css             # Mise en forme, animations et media queries
├── script.js             # Logique interactive et gestion des événements
└── README.md             # Documentation du projet