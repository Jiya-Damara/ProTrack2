const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");

menuBtn.addEventListener("click", () => {
  sideMenu.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  sideMenu.classList.remove("active");
});

themeToggler.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme-variables");

  themeToggler
    .querySelectorAll("span")
    .forEach((e) => e.classList.toggle("active"));
});
document.addEventListener('DOMContentLoaded', function() {
    const signedInUser = localStorage.getItem('signedInUser');
    const userGender = localStorage.getItem('userGender');

    if (signedInUser) {
        const usernamePlaceholders = document.querySelectorAll('#username-placeholder');
        usernamePlaceholders.forEach(placeholder => {
            placeholder.textContent = signedInUser;
        });
        const profilePhotoPlaceholders = document.querySelectorAll('#profile-photo-placeholder');
        profilePhotoPlaceholders.forEach(photo => {
            if (userGender === 'male') {
                photo.src = './contents/images/male.png';
            } else if (userGender === 'female') {
                photo.src = './contents/images/female.png';
            } else {
                photo.src = './contents/images/user.png';
            }
        });
    } else {
        window.location.href = 'login.html';
    }
});

function logout() {
  localStorage.removeItem("signedInUser");
  window.location.href = "login.html";
}
