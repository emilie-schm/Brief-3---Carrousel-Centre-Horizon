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

// Sélection sécurisée via les ID
const imgElement = document.getElementById("slider-image");
const captionElement = document.getElementById("slider-caption");
const counterElement = document.getElementById("slider-counter");

const btnPrevious = document.getElementById("slider-previous");
const btnNext = document.getElementById("slider-next");
const btnRandom = document.getElementById("slider-random");
const btnToggle = document.getElementById("slider-toggle");

const toolbarToggle = document.getElementById("toolbar-toggle");
const toolbarButtons = document.getElementById("toolbar-buttons");

// Affichage initial
function displayPhoto(index) {
    const photo = photos[index];
    imgElement.setAttribute("src", photo.src);
    imgElement.setAttribute("alt", photo.alt);
    captionElement.textContent = photo.titre;
    counterElement.textContent = `${index + 1} / ${photos.length}`;
}

// Relance du timer à chaque action utilisateur
function resetTimer() {
    if (isPlaying) {
        clearInterval(timer);
        timer = setInterval(nextPhoto, 3000);
    }
}

// Suivante
function nextPhoto() {
    currentIndex = (currentIndex + 1) % photos.length;
    displayPhoto(currentIndex);
    resetTimer();
}

// Précédente
function prevPhoto() {
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    displayPhoto(currentIndex);
    resetTimer();
}

// Aléatoire (jamais la même d'affilée)
function randomPhoto() {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * photos.length);
    } while (newIndex === currentIndex && photos.length > 1);
    
    currentIndex = newIndex;
    displayPhoto(currentIndex);
    resetTimer();
}

// Lecture / Pause
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

// Afficher / Masquer la barre d'outils
toolbarToggle.addEventListener("click", () => {
    toolbarButtons.classList.toggle("hidden");
    const isExpanded = toolbarButtons.classList.contains("hidden") ? "false" : "true";
    toolbarToggle.setAttribute("aria-expanded", isExpanded);
});

// Écouteurs d'événements
btnNext.addEventListener("click", () => nextPhoto());
btnPrevious.addEventListener("click", () => prevPhoto());
btnRandom.addEventListener("click", () => randomPhoto());
btnToggle.addEventListener("click", () => togglePlay());

// Navigation clavier
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
        nextPhoto();
    } else if (e.key === "ArrowLeft") {
        prevPhoto();
    }
});

// Lancement au démarrage
displayPhoto(currentIndex);