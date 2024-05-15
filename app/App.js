import { getCategoryList } from "./utils/mealDB.client.js";
import { CategoryCarousel } from "./components/CategoryCarousel.js";
import { SearchBar } from "./components/SearchBar.js";

export const App = () => {

  const root = document.querySelector("#root");

  const title = document.createElement("h1");
  title.textContent = "The Perfect Meal";
  root.append(title);

  root.append(SearchBar());

  getCategoryList().then(data => {

    data.forEach(category => {
      root.append(CategoryCarousel(category.strCategory));
    });
  }).catch(error => {
    console.error(error);
  });

};