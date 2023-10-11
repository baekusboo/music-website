const themeIcon = document.querySelector('.toggle-label i');
const body = document.body;
const musicItems = document.getElementsByClassName('music-item');

let isDarkMode = false;

themeIcon.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    body.classList.toggle('dark-mode', isDarkMode);

    for (let i = 0; i < musicItems.length; i++) {
        musicItems[i].classList.toggle('music-item-dark-mode', isDarkMode);
    }

    themeIcon.classList.toggle('fa-moon', !isDarkMode);
    themeIcon.classList.toggle('fa-sun', isDarkMode);
});
