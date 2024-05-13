import { Navbar } from "./components/Navbar.js";
import { getAreaList } from "./utils/mealDB.client.js";

export const App = () => {

  const root = document.querySelector("#root");

  root.innerHTML = `
    <h1>My App</h1>
  `
  root.appendChild(Navbar());

  getAreaList().then(data => {
    console.log(data);
  }).catch(error => {
    console.error(error);
  });

};