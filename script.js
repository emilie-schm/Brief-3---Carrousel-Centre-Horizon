"use strict";

const photos = [
    {
        src: "images/loup1.jpg",
        titre: "titre de l'image 1",
        alt: "Paysage verdoyant avec un pont en bois au-dessus d'un cours d'eau."
    },
    {
        src: "images/loup2.jpg",
        titre: "titre de l'image 2",
        alt: "Vue panoramique d'une forêt dense sous un ciel bleu."
    },
    {
        src: "images/loup3.png",
        titre: "titre de l'image 3",
        alt: "Gros plan sur une cascade naturelle au cœur de roches moussues."
    },
    {
        src: "images/loup4.jpg",
        titre: "titre de l'image 4",
        alt: "Chemin sinueux traversant une vallée montagneuse."
    },
    {
        src: "images/loup5.jpg",
        titre: "titre de l'image 5",
        alt: "Reflet d'un coucher de soleil flamboyant sur un lac calme."
    },
    {
        src: "images/loup6.jpg",
        titre: "titre de l'image 6",
        alt: "Vue d'une chaîne de montagnes enneigées sous un ciel dégagé."
    }
];

let currentIndex = 0;
let timer = null;
let isPlaying = false;

// Sélection des éléments DOM
const imgElement = document.querySelector(".slider img");
const captionElement = document.getElementById("slider-caption");
const counterElement = document.getElementById("slider-counter");

const btnPrevious = document.getElementById("slider-previous");
const btnNext = document.getElementById("slider-next");
const btnRandom = document.getElementById("slider-random");
const btnToggle = document.getElementById("slider-toggle");

const toolbarToggle = document.querySelector("body > button.toolbar");
const toolbarButtons = document.querySelector("main > div.toolbar");

// Masquer la barre d'outils au chargement initial
toolbarButtons.classList.add("hidden");
toolbarToggle.setAttribute("aria-expanded", "false");

// R1 & R9 : Affichage de la photo, du titre, du alt et du compteur
function displayPhoto(index) {
    const photo = photos[index];
    imgElement.setAttribute("src", photo.src);
    imgElement.setAttribute("alt", photo.alt);
    captionElement.textContent = photo.titre;
    counterElement.textContent = `${index + 1} / ${photos.length}`;
}

// R8 : Relance du délai de lecture automatique à chaque action utilisateur
function resetTimer() {
    if (isPlaying) {
        clearInterval(timer);
        timer = setInterval(nextPhoto, 3000);
    }
}

// R3 : Photo suivante avec retour en boucle au début
function nextPhoto() {
    currentIndex = (currentIndex + 1) % photos.length;
    displayPhoto(currentIndex);
    resetTimer();
}

// R4 : Photo précédente avec retour en boucle à la fin
function prevPhoto() {
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    displayPhoto(currentIndex);
    resetTimer();
}

// R5 : Photo aléatoire (jamais la même que l'actuelle)
function randomPhoto() {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * photos.length);
    } while (newIndex === currentIndex && photos.length > 1);
    
    currentIndex = newIndex;
    displayPhoto(currentIndex);
    resetTimer();
}

// R6 : Gestion de la lecture automatique et du bouton pause/lecture
function togglePlay() {
    const icon = btnToggle.querySelector("i");
    if (isPlaying) {
        clearInterval(timer);
        timer = null;
    } else {
        timer = setInterval(nextPhoto, 3000);
    }
    isPlaying = !isPlaying;
    
    if (isPlaying) {
        btnToggle.setAttribute("aria-label", "Pause");
        icon.className = "fa-solid fa-pause";
    } else {
        btnToggle.setAttribute("aria-label", "Lecture");
        icon.className = "fa-solid fa-play";
    }
}

// R2 : Afficher / Masquer la barre d'outils au clic sans remonter la page
toolbarToggle.addEventListener("click", (e) => {
    e.preventDefault();
    toolbarButtons.classList.toggle("hidden");
    const isExpanded = toolbarButtons.classList.contains("hidden") ? "false" : "true";
    toolbarToggle.setAttribute("aria-expanded", isExpanded);
});

// Écouteurs d'événements des boutons du carrousel
btnNext.addEventListener("click", () => nextPhoto());
btnPrevious.addEventListener("click", () => prevPhoto());
btnRandom.addEventListener("click", () => randomPhoto());
btnToggle.addEventListener("click", () => togglePlay());

// R7 : Navigation au clavier (flèches gauche et droite)
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
        nextPhoto();
    } else if (e.key === "ArrowLeft") {
        prevPhoto();
    }
});

// Initialisation au chargement de la page
displayPhoto(currentIndex);