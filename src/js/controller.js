import "../sass/main.scss";

const header = document.querySelector(".header");
const sticky = header.offsetTop;
const links = document.querySelectorAll(".navbar__link");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});

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

const changeLinkState = () => {
  let index = sections.length;

  while (index-- && window.scrollY < sections[index].offsetTop) {
    links.forEach((link) => {
      link.classList.remove("navbar__link--active");
      links[index].classList.add("navbar__link--active");
    });
  }
};

changeLinkState();
window.addEventListener("scroll", changeLinkState);
