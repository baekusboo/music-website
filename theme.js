const themeIcon = document.querySelector(".toggle-label i");
const body = document.body;
const arrow = document.querySelector("#backToTopBtn");
let musicitem = document.getElementsByClassName("music-item");
let isDarkMode = localStorage.getItem("isDarkMode") === "true";

body.classList.toggle("dark-mode", isDarkMode);

for (let i = 0; i < musicitem.length; i++) {
  musicitem[i].classList.toggle("music-item-dark-mode", isDarkMode);
}

themeIcon.classList.toggle("fa-sun", isDarkMode);
themeIcon.classList.toggle("fa-moon", !isDarkMode);
arrow.classList.toggle("light-mode", !isDarkMode);
arrow.classList.toggle("dark-mode", isDarkMode);

themeIcon.addEventListener("click", () => {
  isDarkMode = !isDarkMode;
  body.classList.toggle("dark-mode", isDarkMode);

  for (let i = 0; i < musicitem.length; i++) {
    musicitem[i].classList.toggle("music-item-dark-mode", isDarkMode);
  }
  themeIcon.classList.toggle("fa-sun", isDarkMode);
  themeIcon.classList.toggle("fa-moon", !isDarkMode);
  arrow.classList.toggle("light-mode", !isDarkMode);
  arrow.classList.toggle("dark-mode", isDarkMode);
  localStorage.setItem("isDarkMode", isDarkMode);
});