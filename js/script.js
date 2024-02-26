const iconMenu = document.querySelector('.menu__icon');
    const menuBody = document.querySelector('.header__menu');
    iconMenu.addEventListener("click", (e) => {
            iconMenu.classList.toggle('menu__icon--active');
            menuBody.classList.toggle('header__menu--active');
        });

document.addEventListener('click', (e) => {
    if(iconMenu.classList.contains('menu__icon--active') && e.target !== menuBody && e.target !== iconMenu){
            iconMenu.classList.remove('menu__icon--active');
            menuBody.classList.remove('header__menu--active');
    }
});
    