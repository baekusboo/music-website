const themeIcon = document.querySelector('.toggle-label i');
const body = document.body;

let musicitem=document.getElementsByClassName('music-item');
console.log(musicitem)
let isDarkMode = false;

themeIcon.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    body.classList.toggle('dark-mode', isDarkMode);
    for(let i=0;i<musicitem.length;i++){
        musicitem[i].classList.toggle('music-item-dark-mode',isDarkMode);
    }
    musicitem.classList.toggle('music-item-dark-mode', isDarkMode);
    themeIcon.classList.toggle('fa-moon', !isDarkMode);
    themeIcon.classList.toggle('fa-sun', isDarkMode);
});
