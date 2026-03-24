const photos = [
  { src: "assets/images/1.jpg", alt: "Затишний куточок у вітальні" },
  { src: "assets/images/2.jpg", alt: "Вітальня та їдальня з великими вікнами" },
  { src: "assets/images/3.jpg", alt: "Невеликий обідній стіл біля балкону" },
  { src: "assets/images/4.jpg", alt: "Вітальня з телевізором" },
  { src: "assets/images/5.jpeg", alt: "Деталь інтер'єру біля вікна" },
  { src: "assets/images/6.jpg", alt: "Балкон зі столиком" },
  { src: "assets/images/7.jpg", alt: "Вид із балкону" },
  { src: "assets/images/8.jpg", alt: "Кавовий столик на балконі" },
  { src: "assets/images/9.jpg", alt: "Спальня з двоспальним ліжком" },
  { src: "assets/images/10.jpg", alt: "Світла спальня" },
  { src: "assets/images/11.jpg", alt: "Вікно у першій спальні" },
  { src: "assets/images/12.jpeg", alt: "Друга спальня" },
  { src: "assets/images/13.jpeg", alt: "Невеликий письмовий стіл" },
  { src: "assets/images/14.jpeg", alt: "Ліжко у другій спальні" },
  { src: "assets/images/15.jpg", alt: "Обладнана кухня" },
  { src: "assets/images/16.jpg", alt: "Кухня з пральною машиною" },
  { src: "assets/images/17.jpg", alt: "Холодильник та вхід до кухні" },
  { src: "assets/images/18.jpeg", alt: "Сучасна ванна кімната" },
  { src: "assets/images/19.jpeg", alt: "Душова зона у ванній кімнаті" },
  { src: "assets/images/20.jpeg", alt: "Пляж поруч із квартирою" },
  { src: "assets/images/21.jpeg", alt: "Пальми біля узбережжя" },
  { src: "assets/images/22.jpeg", alt: "Захід сонця над морем" },
  { src: "assets/images/23.jpeg", alt: "Прогулянкова зона біля пляжу" },
];

const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox.querySelector(".lightbox__image");
const lightboxCaption = lightbox.querySelector(".lightbox__caption");
const closeButton = lightbox.querySelector(".lightbox__close");
const prevButton = lightbox.querySelector(".lightbox__nav--prev");
const nextButton = lightbox.querySelector(".lightbox__nav--next");
const galleryButtons = document.querySelectorAll(".masonry__item");

let currentIndex = 0;

function renderPhoto(index) {
  const photo = photos[index];

  if (!photo) {
    return;
  }

  currentIndex = index;
  lightboxImage.src = photo.src;
  lightboxImage.alt = photo.alt;
  lightboxCaption.textContent = `${index + 1} / ${photos.length} • ${photo.alt}`;
}

function openLightbox(index) {
  renderPhoto(index);
  lightbox.showModal();
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.close();
  document.body.style.overflow = "";
}

function stepPhoto(direction) {
  const nextIndex = (currentIndex + direction + photos.length) % photos.length;
  renderPhoto(nextIndex);
}

galleryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openLightbox(Number(button.dataset.index));
  });
});

closeButton.addEventListener("click", closeLightbox);
prevButton.addEventListener("click", () => stepPhoto(-1));
nextButton.addEventListener("click", () => stepPhoto(1));

lightbox.addEventListener("click", (event) => {
  const dialogDimensions = lightbox.getBoundingClientRect();
  const clickedOutside =
    event.clientX < dialogDimensions.left ||
    event.clientX > dialogDimensions.right ||
    event.clientY < dialogDimensions.top ||
    event.clientY > dialogDimensions.bottom;

  if (clickedOutside) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.open) {
    return;
  }

  if (event.key === "Escape") {
    closeLightbox();
  }

  if (event.key === "ArrowLeft") {
    stepPhoto(-1);
  }

  if (event.key === "ArrowRight") {
    stepPhoto(1);
  }
});
