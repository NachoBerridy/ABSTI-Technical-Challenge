import { DetailModal } from "./DetailModal.js";

export const PreviewCard = (meal) => {
  const root = document.querySelector("#root");

  const card = document.createElement("div");
  card.classList.add("preview-card-container");
  card.classList.add(meal.idMeal);
  
  const backgroundImage = document.createElement("div");
  backgroundImage.classList.add("preview-card-image");
  backgroundImage.style.backgroundImage = `url(${meal.strMealThumb})`;

  const cardTitle = document.createElement("h3");
  cardTitle.classList.add("preview-card-title");
  cardTitle.textContent = meal.strMeal;

  card.appendChild(backgroundImage);
  card.appendChild(cardTitle);

  const openModal = async () => {
    const modal = await DetailModal(meal.idMeal);
    root.append(modal);
  }

  card.addEventListener("click", async () => {
    openModal();
  });

  return card;
};