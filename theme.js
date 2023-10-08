const themeIcon = document.querySelector(".toggle-label i");
const heading = document.querySelector("h1");
const body = document.body;
let isDarkMode = false;

themeIcon.addEventListener("click", () => {
  isDarkMode = !isDarkMode;
  body.classList.toggle("dark-mode", isDarkMode);
  heading.classList.toggle("dark-mode", isDarkMode);
  themeIcon.classList.toggle("fa-moon", !isDarkMode);
  themeIcon.classList.toggle("fa-sun", isDarkMode);
});
