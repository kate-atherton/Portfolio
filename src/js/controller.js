import "../sass/main.scss";

const header = document.querySelector(".header");
const sticky = header.offsetTop;
const links = document.querySelectorAll(".navbar__link");
const projects = document.querySelectorAll(".projects__card");
const closeModalBtns = document.querySelectorAll(".overlay__close");
const navIcon = document.querySelector(".navbar-small__icon");
const navModal = document.querySelector(".navbar-small__menu");
const sections = document.querySelectorAll(".section");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});

//updates scroll bar progress on scroll
window.addEventListener("scroll", () => {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;

  document.querySelector(".scroll-progress").style.width = scrolled + "%";
});

//add throttling to prevent too many function calls?
//highlights nav-link according to scroll position
const changeLinkState = () => {
  const sections = document.querySelectorAll("section");
  let index = sections.length;
  let height = header.offsetHeight;

  while (index-- && window.scrollY < sections[index].offsetTop + height) {
    links.forEach((link) => {
      link.classList.remove("navbar__link--active");
      links[index].classList.add("navbar__link--active");
    });
  }
};

//shows overlay when project card clicked
projects.forEach((project) =>
  project.addEventListener("click", () => {
    const number = project.id.slice(-1);
    const overlayToLoad = document.getElementById(`overlay${number}`);
    overlayToLoad.classList.add("overlay--active");
  })
);

//closes overlay when x clicked
closeModalBtns.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    const overlay = document.getElementById(`overlay${btn.id.slice(-1)}`);
    overlay.classList.remove("overlay--active");
  })
);

//closes overlay if clicked outside
const overlays = document.querySelectorAll(".overlay");
overlays.forEach((overlay) => {
  overlay.addEventListener("click", (e) => {
    const modal = document.getElementById(`modal${overlay.id.slice(-1)}`);
    const isClickInside = modal.contains(e.target);

    if (isClickInside) return;

    overlay.classList.remove("overlay--active");
  });
});

// Slider
const slider = (num) => {
  const slides = document.querySelectorAll(`.overlay__slide${num}`);
  const btnLeft = document.querySelector(`.overlay__slider__btn--left${num}`);
  const btnRight = document.querySelector(`.overlay__slider__btn--right${num}`);
  const dotContainer = document.querySelector(`.overlay__dots${num}`);

  let curSlide = 0;
  const maxSlide = slides.length;

  const createDots = () => {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="overlay__dots__dot overlay__dots__dot${num}" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = (slide) => {
    const dots = document.querySelectorAll(`.overlay__dots__dot${num}`);

    dots.forEach((dot) => dot.classList.remove("overlay__dots__dot--active"));

    document
      .querySelector(`.overlay__dots__dot${num}[data-slide="${slide}"]`)
      .classList.add("overlay__dots__dot--active");
  };

  const goToSlide = (slide) => {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = () => {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = () => {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const activateSliders = () => {
    goToSlide(0);
    createDots();
    activateDot(0);
  };

  activateSliders();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  //fix this
  // document.addEventListener("keydown", function (e) {
  //   if (e.key === "ArrowLeft") prevSlide();
  //   e.key === "ArrowRight" && nextSlide();
  // });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("overlay__dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

//switch between gif and video
const gifSliderSwitch = (num) => {
  const videoBtn = document.querySelector(`.overlay__video-btn${num}`);
  const gifDisplay = document.querySelector(`.overlay__gif${num}`);
  const slideDisplay = document.querySelector(`.overlay__slider${num}`);
  const imagesBtn = document.querySelector(`.overlay__images-btn${num}`);

  videoBtn.addEventListener("click", () => {
    if (gifDisplay.classList.contains("overlay__gif--active")) {
      return;
    }
    gifDisplay.classList.add("overlay__gif--active");
    slideDisplay.classList.remove("overlay__slider--active");

    videoBtn.classList.add("overlay__btn--active");
    imagesBtn.classList.remove("overlay__btn--active");
  });

  imagesBtn.addEventListener("click", () => {
    if (slideDisplay.classList.contains("overlay__slider--active")) {
      return;
    }
    slideDisplay.classList.add("overlay__slider--active");
    gifDisplay.classList.remove("overlay__gif--active");

    imagesBtn.classList.add("overlay__btn--active");
    videoBtn.classList.remove("overlay__btn--active");
  });
};

const addPhotoHandlers = () => {
  const photo = document.querySelector(".home__img");

  //photo zoom effect
  photo.addEventListener("mouseover", () => {
    photo.classList.add("home__img--active");

    photo.addEventListener("mouseout", () => {
      photo.classList.remove("home__img--active");
    });
  });
};

//mobile navbar
navIcon.addEventListener("click", () => {
  navModal.classList.toggle("navbar-small__menu--show");
  navIcon.classList.toggle("navbar-small__icon--active");
});

//removes navbar modal when nav-link clicked
links.forEach((link) => {
  link.addEventListener("click", () => {
    if (navModal.classList.contains("navbar-small__menu--show")) {
      navModal.classList.remove("navbar-small__menu--show");
      navIcon.classList.remove("navbar-small__icon--active");
    }
  });
});

if (
  navigator.userAgent.search("Safari") >= 0 &&
  navigator.userAgent.search("Chrome") < 0
) {
  sections.forEach((section) => section.classList.add("safari"));
}

const init = () => {
  slider(1);
  slider(2);
  gifSliderSwitch(1);
  gifSliderSwitch(2);
  changeLinkState();
  window.addEventListener("scroll", changeLinkState);
  addPhotoHandlers();
};

init();
