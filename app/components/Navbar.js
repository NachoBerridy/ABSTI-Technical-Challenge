export const Navbar = () => {
  const navbar = document.createElement("nav");

  navbar.innerHTML = `
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  `;

  return navbar;
};