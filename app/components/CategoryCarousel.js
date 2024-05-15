import { PreviewCard } from "./PreviewCard.js";
import { getMealsByCategory } from "../utils/mealDB.client.js";
import { categoryColors } from "../assets/consts.js";

export const CategoryCarousel = (category) => {
  const carouselContainer = document.createElement("div");
  carouselContainer.classList.add("carousel-container");


  const carousel = document.createElement("div");
  carousel.id = category;
  carousel.classList.add("carousel");

  const cardsToShow = 4;
  let currentIndex = 0;

  // Create title for the carousel
  const title = document.createElement("h2");
  title.textContent = category;
  carouselContainer.append(title);

  // Toggle carousel view between expanded and collapsed
  title.addEventListener("click", () => {
    if (carousel.classList.contains("carousel")) {
      carousel.classList.remove("carousel");
      carousel.classList.add("carousel-expanded");
      carousel.style.transform = `translateX(0px)`;
      hideButtons();
    } else {
      carousel.classList.remove("carousel-expanded");
      carousel.classList.add("carousel");
      showButtons();
    }
  });

  // Update carousel position based on currentIndex
  function updateCarousel() {
    const cardWidth =
      carousel.children[0].offsetWidth +
      parseFloat(getComputedStyle(carousel.children[0]).marginRight);
    carousel.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
  }

  // Fetch meals data by category and populate carousel
  getMealsByCategory(category)
    .then((data) => {
      data.forEach((meal) => {
        const previewCard = PreviewCard(meal);
        // previewCard.style.backgroundColor = categoryColors[category];
        carousel.append(previewCard);
      });
    })
    .catch((error) => {
      console.error(error);
    });

  // Create previous button for carousel navigation
  const prevButton = document.createElement("button");
  prevButton.classList.add("prevButton");
  prevButton.style.display = "none";
  prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
    if (currentIndex === 0) {
      prevButton.style.display = "none";
    }
    if (currentIndex < carousel.children.length - cardsToShow && carousel.children.length > cardsToShow) {
      nextButton.style.display = "block";
    }
  });
  prevButton.textContent = "❮";

  // Create next button for carousel navigation
  const nextButton = document.createElement("button");
  nextButton.classList.add("nextButton");
  nextButton.addEventListener("click", () => {
    if (currentIndex < carousel.children.length - cardsToShow) {
      currentIndex++;
      updateCarousel();
    }
    if (currentIndex === carousel.children.length - cardsToShow) {
      nextButton.style.display = "none";
    }
    if (currentIndex > 0) {
      prevButton.style.display = "block";
    }
  });
  nextButton.textContent = "❯";

  // Append carousel elements to the container
  carouselContainer.append(prevButton, carousel, nextButton);

  // Function to hide navigation buttons
  const hideButtons = () => {
    const prevButton = carouselContainer.querySelector(".prevButton");
    const nextButton = carouselContainer.querySelector(".nextButton");
    prevButton.style.display = "none";
    nextButton.style.display = "none";
  };

  // Function to show navigation buttons
  const showButtons = () => {
    const prevButton = carouselContainer.querySelector(".prevButton");
    const nextButton = carouselContainer.querySelector(".nextButton");
    if (currentIndex > 0) {
      prevButton.style.display = "block";
    }
    if (currentIndex < carousel.children.length - cardsToShow) {
      nextButton.style.display = "block";
    }
  };

  return carouselContainer;
};
