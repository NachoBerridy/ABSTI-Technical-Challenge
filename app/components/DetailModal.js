import { getMealById } from "../utils/mealDB.client.js";

export const DetailModal = (mealId) => {
  return new Promise((resolve, reject) => {
    getMealById(mealId)
      .then(data => {
        const modal = document.createElement("div");
        modal.classList.add("modal");

        const modalContent = document.createElement("div");
        modalContent.classList.add("modal-content");

        modalContent.innerHTML = `
          <h2>${data.strMeal}</h2>
          <div class="modal-info-container">
            <div class="modal-ingredients">
              <h3>Ingredients</h3>
              <ul>
                ${Object.keys(data)
                  .filter(key => key.includes("strIngredient") && data[key])
                  .map(key => `<li>${data[`strMeasure${key.slice(-1)}`]} of ${data[key]}</li>`)
                  .join("")}
              </ul>
            </div>
            <div class="modal-info">
              <div class="modal-image">
                <img src="${data.strMealThumb}/preview" alt="${data.strMeal}" />
              </div>  
              <div class="modal-instructions">
                  <h3> Instructions </h3> 
                  <p>${data.strInstructions}</p>
              </div>
            </div> 
          </div>
        `;

        modal.addEventListener("click", () => {
          modal.remove();
        });

        modalContent.addEventListener("click", (event) => {
          event.stopPropagation();
        });

        modal.append(modalContent);
        resolve(modal);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};
