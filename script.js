const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".project-card");

filters.forEach(button => {
  button.addEventListener("click", () => {
    filters.forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    cards.forEach(card => {
      card.classList.toggle("hidden", filter !== "all" && card.dataset.category !== filter);
    });
  });
});

const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxTitle = document.querySelector(".lightbox-title");
const lightboxType = document.querySelector(".lightbox-type");
const lightboxDescription = document.querySelector(".lightbox-description");
const lightboxCounter = document.querySelector(".lightbox-counter");
const thumbs = document.querySelector(".lightbox-thumbs");

let currentImages = [];
let currentIndex = 0;

function renderImage(index) {
  currentIndex = (index + currentImages.length) % currentImages.length;
  lightboxImage.src = currentImages[currentIndex];
  lightboxImage.alt = `${lightboxTitle.textContent} — image ${currentIndex + 1}`;
  lightboxCounter.textContent = `${String(currentIndex + 1).padStart(2,"0")} / ${String(currentImages.length).padStart(2,"0")}`;
  [...thumbs.children].forEach((button, i) => button.classList.toggle("active", i === currentIndex));
}

function openGallery(card) {
  currentImages = card.dataset.images.split("|");
  currentIndex = 0;
  lightboxTitle.textContent = card.dataset.title;
  lightboxType.textContent = card.dataset.type.toUpperCase();
  lightboxDescription.textContent = card.dataset.description;
  thumbs.innerHTML = "";

  currentImages.forEach((src, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.innerHTML = `<img src="${src}" alt="">`;
    button.addEventListener("click", () => renderImage(index));
    thumbs.appendChild(button);
  });

  renderImage(0);
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lock");
}

function closeGallery() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lock");
}

document.querySelectorAll(".project-open").forEach(button => {
  button.addEventListener("click", () => openGallery(button.closest(".project-card")));
});

document.querySelector(".lightbox-close").addEventListener("click", closeGallery);
document.querySelector(".lightbox-arrow.prev").addEventListener("click", () => renderImage(currentIndex - 1));
document.querySelector(".lightbox-arrow.next").addEventListener("click", () => renderImage(currentIndex + 1));

lightbox.addEventListener("click", event => {
  if (event.target === lightbox) closeGallery();
});

document.addEventListener("keydown", event => {
  if (!lightbox.classList.contains("open")) return;
  if (event.key === "Escape") closeGallery();
  if (event.key === "ArrowLeft") renderImage(currentIndex - 1);
  if (event.key === "ArrowRight") renderImage(currentIndex + 1);
});

const menuButton = document.querySelector(".menu-btn");
const nav = document.querySelector(".main-nav");

menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".main-nav a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));

document.getElementById("year").textContent = new Date().getFullYear();
