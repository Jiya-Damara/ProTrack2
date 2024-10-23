const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");
const addProductBtn= document.querySelector(".add-product");
const productPopUp= document.querySelector(".add-product-popUp");
const popupSubmit =document.querySelector(".popupSubmit");

window.addEventListener('load', () => {
    activities = JSON.parse(localStorage.getItem('activities')) || [];

    const addProductPopUp = document.querySelector('.add-product-popUp');


    addProductPopUp.addEventListener('submit', e => {
        e.preventDefault();

        const activity = {
            title: e.target.elements.title.value,
            duration: e.target.elements.duration.value,
            createdAt: new Date().getTime()
        }

        activities.push(activity);
        localStorage.setItem('activities', JSON.stringify(activities));
        e.target.reset();
        productPopUp.classList.remove("active");
        DisplayActivities();
    })
    DisplayActivities();
})

function DisplayActivities() {
    const activityList = document.querySelector('#activity-cont');

    activityList.innerHTML = '';

    activities.forEach(activity => {
        const activityItem = document.createElement('div');

        const icon = document.createElement('div');
        const icon1 = document.createElement('span');
        const right = document.createElement('div');
        const info = document.createElement('div');
        const title = document.createElement('h3');
        const last = document.createElement('small');
        const success = document.createElement('h5');
        const duration = document.createElement('h3');

        

        icon.classList.add('icon');
        icon1.classList.add('material-icons-sharp');
        right.classList.add('right');
        info.classList.add('info');
        last.classList.add('text-muted');
        success.classList.add('success');
        
        if(`${activity.createdAt}` % 2 ==0){
            activityItem.classList.add('item','online');
            var image="auto_stories";
            var time="Last 24 Hours";
            var complete="+35%";
        }else{
            activityItem.classList.add('item','offline');
            var image="book";
            var time="Last 12 Hours";
            var complete="+20%";

        }

        icon1.innerHTML = image;
        title.innerHTML = `${activity.title}`;
        last.innerHTML= time;
        success.innerHTML= complete;
        duration.innerHTML= `${activity.duration}`

        icon.appendChild(icon1);
        info.appendChild(title);
        info.appendChild(last);
        right.appendChild(info);
        right.appendChild(success);
        right.appendChild(duration);
        activityItem.appendChild(icon);
        activityItem.appendChild(right);
        activityList.appendChild(activityItem);

    });
}










addProductBtn.addEventListener("click",()=>{
    productPopUp.classList.add("active");
});

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





