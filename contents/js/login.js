const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

// $("#search-icon").click(function() {
//   $(".nav").toggleClass("search");
//   $(".nav").toggleClass("no-search");
//   $(".search-input").toggleClass("search-active");
// });

// $('.menu-toggle').click(function() {
//   $(".nav").toggleClass("mobile-nav");
//   $(this).toggleClass("is-active");
// });

function getStoredUsers() {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
}

// Function to save users to localStorage
function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

// Function to get selected gender`
function getSelectedGender(formId) {
  const genderRadios = document.querySelectorAll(`#${formId} input[name="gender"]`);
  for (let radio of genderRadios) {
    if (radio.checked) {
      return radio.value;
    }
  }
  return null; 
}

// Sign Up handler
function handleSignUp(event) {
  event.preventDefault();
  
  const username = document.getElementById('signup-username').value;
  const password = document.getElementById('signup-password').value;
  const gender = document.querySelector('input[name="gender"]:checked')?.value;

  if (!gender) {
      alert('Please select a gender.');
      return;
  }

  let users = getStoredUsers();
  const userExists = users.some(user => user.username === username);
  
  if (userExists) {
      alert('Username is already taken. Please choose a different username.');
      return;
  }

  users.push({ username, password, gender });

  saveUsers(users);
  
  alert('Registration successful! You can now log in.');
  
  // Clear sign-up fields
  document.getElementById('signup-username').value = '';
  document.getElementById('signup-password').value = '';
  document.querySelector('input[name="gender"]:checked').checked = false;
}

// Sign In handler
function handleSignIn(event) {
  event.preventDefault();
  
  const username = document.getElementById('signin-username').value;
  const password = document.getElementById('signin-password').value;
  
  const users = getStoredUsers();
  
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
      localStorage.setItem('signedInUser', user.username);
      localStorage.setItem('userGender', user.gender);

      alert('Login successful! Redirecting to homepage...');
      // Redirect to index.html
      window.location.href = "index.html";
  } else {
      alert('Invalid username or password. Please try again.');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Check if a user is signed in
  const signedInUser = localStorage.getItem('signedInUser');
  const userGender = localStorage.getItem('userGender');
  const userNavItem = document.getElementById('user-nav-item');
  const btnContainer = document.querySelector('.btn-container');

  if (signedInUser) {
      if (userNavItem) {
          userNavItem.innerHTML = `<span>Welcome, ${signedInUser}!</span><button id="logout-btn" class="btn">Logout</button>`;
      }

      if (btnContainer) {
          btnContainer.innerHTML = `<button class="primary-btn btn" onclick="openDashboard()">Open Dashboard</button>`;
      }

      document.getElementById('logout-btn').addEventListener('click', function() {
          localStorage.removeItem('signedInUser');
          localStorage.removeItem('userGender');
          window.location.href = 'index.html';
      });
  }
});

// Function to open the dashboard page
function openDashboard() {
  window.location.href = 'dashboard.html';
}

// To be placed in dashboard.html script tag or external JS file
document.addEventListener('DOMContentLoaded', function() {
  const signedInUser = localStorage.getItem('signedInUser');
  const userGender = localStorage.getItem('userGender');

  if (signedInUser) {
      // Update the profile section
      const profileUser = document.querySelector('.profile p b');
      const profilePhoto = document.querySelector('.profile-photo img');
      const usernamePlaceholder = document.querySelectorAll('#username-placeholder');

      if (profileUser) {
          profileUser.textContent = signedInUser;
      }

      if (profilePhoto) {
          profilePhoto.src = userGender === 'male' ? './contents/images/male.png' : './contents/images/female.png';
      }

      usernamePlaceholder.forEach(element => {
          element.textContent = signedInUser;
      });
  }
});