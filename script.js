"use strict";

const photos = [
    {
        src: "images/loup1.jpg",
        titre: "Loup blanc au repos",
        alt: "Loup blanc couché dans une forêt, à moitié caché derrière des branches de sapin"
    },
    {
        src: "images/loup2.jpg",
        titre: "Loup gris sur la colline",
        alt: "Loup gris debout de profil sur une colline, sous un ciel bleu"
    },
    {
        src: "images/loup3.png",
        titre: "Loup en chasse",
        alt: "Loup gris et fauve avançant tête basse sur un sol de terre sombre, au bord d'une forêt"
    },
    {
        src: "images/loup4.jpg",
        titre: "La meute qui hurle",
        alt: "Meute de cinq loups blancs hurlant sur une butte enneigée, devant une forêt de bouleaux"
    },
    {
        src: "images/loup5.jpg",
        titre: "Regard dans les feuillages",
        alt: "Loup gris regardant l'objectif au milieu des feuillages verts d'une forêt"
    },
    {
        src: "images/loup6.jpg",
        titre: "Loup dans la neige",
        alt: "Loup roux marchant dans une forêt enneigée, le museau couvert de neige"
    }
];

let currentIndex = 0;
let timer = null;
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

// Relance le délai de 3 s si la lecture auto est active
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

// Affichage de la première photo au démarrage
displayPhoto(currentIndex);
resetTimer();