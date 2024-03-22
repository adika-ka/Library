import { winter } from "./winter.js";
import { spring } from "./spring.js";
import { summer } from "./summer.js";
import { autumn } from "./autumn.js";

const slidesContainer = document.querySelector(".slider__items");
const controlsContainer = document.querySelector(".slider__controls");
const controlsArr = document.querySelectorAll(".controls__circle");
const seasons = document.querySelector(".gallery__seasons");
const galleryItems = document.querySelector(".gallery__items");
const seasonsActive = document.querySelectorAll(".gallery__season");
const dropMenu = document.querySelector(".header__logo");
const wrapper = document.querySelector(".wrapper");
const login = document.querySelector(".modal__logIn");
const register = document.querySelector(".modal__register");
const registerForm = document.getElementById("registerForm");
const lastName = document.querySelector("#LastName");
const email = document.querySelector("#email-reg");
const password = document.querySelector("#pass-reg");

//Выпадающее меню при клике на иконку
dropMenu.addEventListener("click", (e) => {
  if (!dropMenu.classList.contains("header__logo--active")) {
    dropMenu.classList.add("header__logo--active");
  }
  if (e.target.classList.contains("logo-modal__log")) {
    wrapper.classList.add("modal--active");
    login.classList.add("modal__sing--active");
  } else if (e.target.classList.contains("logo-modal__reg")) {
    wrapper.classList.add("modal--active");
    register.classList.add("modal__sing--active");
  }
});

//Обработчик на модалку

login.addEventListener("click", (e) => {
  if (e.target.classList.contains("choice__link")) {
    register.classList.add("modal__sing--active");
    login.classList.remove("modal__sing--active");
  }
});
register.addEventListener("click", (e) => {
  if (e.target.classList.contains("choice__link")) {
    register.classList.remove("modal__sing--active");
    login.classList.add("modal__sing--active");
  }
});

//Меню бургер
const iconMenu = document.querySelector(".menu__icon");
const menuBody = document.querySelector(".header__menu");
iconMenu.addEventListener("click", (e) => {
  iconMenu.classList.toggle("menu__icon--active");
  menuBody.classList.toggle("header__menu--active");
});

document.addEventListener("click", (e) => {
  if (
    iconMenu.classList.contains("menu__icon--active") &&
    e.target !== menuBody &&
    e.target !== iconMenu
  ) {
    iconMenu.classList.remove("menu__icon--active");
    menuBody.classList.remove("header__menu--active");
  }
  if (!e.target.closest(".header__logo")) {
    dropMenu.classList.remove("header__logo--active");
  }
  if (
    (!e.target.closest(".logo-modal__log") &&
      !e.target.closest(".modal__logIn") &&
      !e.target.closest(".logo-modal__reg") &&
      !e.target.closest(".modal__register")) ||
    e.target.closest(".modal__close") ||
    e.target.closest(".modal__close-register")
  ) {
    wrapper.classList.remove("modal--active");
    login.classList.remove("modal__sing--active");
    register.classList.remove("modal__sing--active");
  }
});

//Слайдер About
const imgArr = [
  { imgSrc: "./img/slider0.jpg" },
  { imgSrc: "./img/slider1.jpg" },
  { imgSrc: "./img/slider2.jpg" },
  { imgSrc: "./img/slider3.jpg" },
  { imgSrc: "./img/slider4.jpg" },
];
let count = 0;
function clickChangeSlide(control) {
  const { target } = control;
  if (target.classList.contains("controls__circle")) {
    const id = target.dataset.id;
    renderSlides(slidesContainer, imgArr, id);
  }
}

function renderSlides(container, slides, countControl = 0) {
  const viewArr = slides.slice(+countControl, +countControl + 3);
  container.innerHTML = "";

  controlsArr.forEach((control) => {
    control.classList.remove("controls__circle--active");
    if (control.dataset.id == countControl) {
      control.classList.add("controls__circle--active");
    }
  });

  viewArr.forEach((element) => {
    const a = document.createElement("img");

    const img = `<img class="slider__item" src="${element.imgSrc}"  alt="" />`;
    container.innerHTML += img;
  });
}

controlsContainer.addEventListener("click", clickChangeSlide);

//Смена контента для блока Favorites
function switchCard(data, container) {
  container.innerHTML = "";
  data.forEach(({ subtitle, sublable, text, img }) => {
    const template = `<div class="gallery__item">
            <div class="gallery-item__title">
              Staff Picks <span></span>
            </div>
              <div class="gallery-item__subtitle">
                <p>${subtitle}</p>
                <p>${sublable}</p>
              </div>
                <div class="gallery-item__text">
                ${text}
                </div>
                  <button class="gallery-item__btn btn">Buy</button>
                    <div class="gallary-item__img">
                      <img src=${img} alt="" />
                    </div>
            </div>`;
    container.innerHTML += template;
  });
}

seasons.addEventListener("click", function (event) {
  if (event.target.closest(".gallery__season")) {
    switchCard(winter, galleryItems);
  }

  switch (event.target.id) {
    case "winter":
      switchCard(winter, galleryItems);
      break;
    case "spring":
      switchCard(spring, galleryItems);
      break;
    case "summer":
      switchCard(summer, galleryItems);
      break;
    case "autumn":
      switchCard(autumn, galleryItems);
      break;
  }
});

// Функции, вызываемые при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  switchCard(winter, galleryItems);
  renderSlides(slidesContainer, imgArr);
});

// Запись в LocalStorage

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(registerForm);
  const email = formData.get("email");
  const password = formData.get("password");

  const user = { email, password };
  const jsonUser = JSON.stringify(user);
  localStorage.setItem("user", jsonUser);
  alert("Абалдеть, зарегались.");

  e.target.reset();
});

const storedUser = JSON.parse(localStorage.getItem("user"));
console.log(storedUser.email);
console.log(storedUser.password);
