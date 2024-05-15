import { getAllMeals } from "../utils/mealDB.client.js";
import { DetailModal } from "./DetailModal.js";

export const SearchBar = () => {

  const root = document.querySelector("#root");

  // Create search bar container
  const searchBarContainer = document.createElement("div");
  searchBarContainer.classList.add("search-bar-container");

  // Create search bar input
  const searchBar = document.createElement("input");
  searchBar.classList.add("search-bar");
  searchBar.setAttribute("type", "text");
  searchBarContainer.append(searchBar);

  let searchQuery = ''; // Variable to store the search query

  // Fetch all meals and perform search
  getAllMeals().then(data => {
    const allMeals = data;

    // Function to perform search and display results
    const search = () => {
      // Delete previous search results
      searchBar.nextElementSibling?.remove();
      let filteredMeals = [];
      const query = searchQuery.toLocaleLowerCase();
      if (query !== ""){
        filteredMeals = allMeals.filter(meal => {
          return (
            meal.strMeal.toLowerCase().includes(query)
          );
        });
      } else {
        filteredMeals = [];
      }
      let searchSuggestions = filteredMeals[0] ? filteredMeals : [];
      if (searchSuggestions.length === 0) {
        searchBar.nextElementSibling?.remove();
      } else {
        const searchResults = document.createElement("ul");
        searchResults.classList.add("search-results");
        searchSuggestions.forEach(meal => {
            const searchResult = document.createElement("li");
            searchResult.classList.add("search-result");
            searchResult.textContent = meal.strMeal;
            searchResult.addEventListener("click", async () => {
              const modal = await DetailModal(meal.idMeal);
              root.append(modal);
            })
            searchResults.append(searchResult)
        });
        searchBar.insertAdjacentElement("afterend", searchResults);
      }
    };
    // Event listener for input on search bar
    searchBar.addEventListener("input", () => {
      searchQuery = searchBar.value; // Update the search query variable
      search(); // Call the search function
    });
    // Event listener for focus on search bar
    searchBar.addEventListener("focus", () => {
      if (searchQuery !== "") {
        search();
      }
    });
    // Event listener for blur on search bar
    searchBar.addEventListener("blur", () => {
      setTimeout(() => {
        searchBar.nextElementSibling?.remove();
      }, 100);
    });
  });
  return searchBarContainer;
};
