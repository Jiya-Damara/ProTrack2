let hamMenuIcon = document.getElementById("ham-menu");
let navBar = document.getElementById("nav-bar");
let navLinks = navBar.querySelectorAll("li");
let scrollTopBtn = document.getElementById("scroll-top");

/* SideMenu Toggle */
hamMenuIcon.addEventListener("click", () => {
  navBar.classList.toggle("active");
  hamMenuIcon.classList.toggle("fa-times");
});
navLinks.forEach((navLinks) => {
  navLinks.addEventListener("click", () => {
    navBar.classList.remove("active");
    hamMenuIcon.classList.toggle("fa-times");
  });
});

let header = document.querySelector("header");
window.onscroll = () => {
  /* Sticky Header */
  let pos = document.documentElement.scrollTop;
  if (pos > 0) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
  /* Scroll Top Button */
  if (pos > 300) {
    scrollTopBtn.style.display = "grid";
  } else {
    scrollTopBtn.style.display = "none";
  }

  scrollTopBtn.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const registerButton = document.querySelector(".register-btn");

  registerButton.addEventListener("click", () => {
    window.location.href = "login.html";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.querySelector(".primary-btn.btn");

  loginButton.addEventListener("click", () => {
    window.location.href = "login.html";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const exploreMoreButton = document.getElementById("explore-more-btn");
  const coursesSection = document.getElementById("courses");

  exploreMoreButton.addEventListener("click", () => {
    coursesSection.scrollIntoView({ behavior: "smooth" });
  });
});

// Preloader
var loader = document.getElementById("preloader");
window.addEventListener("load", function(){
  loader.style.display = "none"; 
});
