const themeIcon = document.querySelector('.toggle-label i');
const body = document.body;
let isDarkMode = false;

themeIcon.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    body.classList.toggle('dark-mode', isDarkMode);
    themeIcon.classList.toggle('fa-moon', !isDarkMode);
    themeIcon.classList.toggle('fa-sun', isDarkMode);
});
