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
let inactivityTimer = null;
let isPlaying = false;

// Sélection des éléments DOM
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

// Mise à jour de l'icône et de l'état du bouton play/pause
function updatePlayState(playing) {
    isPlaying = playing;
    const icon = btnToggle.querySelector("i");
    if (isPlaying) {
        btnToggle.setAttribute("aria-label", "Pause");
        icon.className = "fa-solid fa-pause";
        if (!timer) {
            timer = setInterval(nextPhoto, 3000);
        }
    } else {
        btnToggle.setAttribute("aria-label", "Lecture");
        icon.className = "fa-solid fa-play";
        clearInterval(timer);
        timer = null;
    }
}

// Relance du délai de lecture auto et gestion de l'inactivité (si inactif 5s, lance le diaporama)
function resetTimer() {
    if (isPlaying) {
        clearInterval(timer);
        timer = setInterval(nextPhoto, 3000);
    }

    // Gestion de l'inactivité utilisateur (ex: 5 secondes sans action lance la lecture auto)
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        if (!isPlaying) {
            updatePlayState(true);
        }
    }, 5000);
}

// Suivante
function nextPhoto() {
    currentIndex = (currentIndex + 1) % photos.length;
    displayPhoto(currentIndex);
    if (isPlaying) {
        clearInterval(timer);
        timer = setInterval(nextPhoto, 3000);
    }
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

// Lecture / Pause (clic sur le bouton)
function togglePlay() {
    updatePlayState(!isPlaying);
    resetTimer();
}

// Afficher / Masquer la barre d'outils
toolbarToggle.addEventListener("click", () => {
    toolbarButtons.classList.toggle("hidden");
    const isExpanded = toolbarButtons.classList.contains("hidden") ? "false" : "true";
    toolbarToggle.setAttribute("aria-expanded", isExpanded);
    resetTimer();
});

// Écouteurs d'événements
btnNext.addEventListener("click", () => {
    nextPhoto();
    resetTimer();
});
btnPrevious.addEventListener("click", () => {
    prevPhoto();
    resetTimer();
});
btnRandom.addEventListener("click", () => {
    randomPhoto();
    resetTimer();
});
btnToggle.addEventListener("click", () => togglePlay());

// Navigation clavier
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
        nextPhoto();
        resetTimer();
    } else if (e.key === "ArrowLeft") {
        prevPhoto();
        resetTimer();
    }
});

// Lancement au démarrage et initialisation du timer d'inactivité
displayPhoto(currentIndex);
resetTimer();