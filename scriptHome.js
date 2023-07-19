// Sidebar

// Function to set the current mode to localStorage
function setModeToLocalStorage(mode) {
  localStorage.setItem("darkMode", mode);
}

// Function to get the current mode from localStorage
function getModeFromLocalStorage() {
  return localStorage.getItem("darkMode");
}

// Apply the mode directly before the page is fully loaded to avoid glitches
const savedMode = getModeFromLocalStorage();
if (savedMode === "dark") {
  document.body.classList.add("dark");
}

// Check if dark mode is saved in localStorage and apply it on page load
window.addEventListener("load", () => {
  const body = document.querySelector('body');
  const modeText = body.querySelector(".mode-text");

  const savedMode = getModeFromLocalStorage();
  if (savedMode === "dark") {
    body.classList.add("dark");
    modeText.innerText = "Light mode";
  }
});

const body = document.querySelector('body');
const sidebar = body.querySelector('nav');
const toggle = body.querySelector(".toggle");
const modeSwitch = body.querySelector(".toggle-switch");
const modeText = body.querySelector(".mode-text");

toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

modeSwitch.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    modeText.innerText = "Light mode";
    setModeToLocalStorage("dark"); // Save the current mode to localStorage
  } else {
    modeText.innerText = "Dark mode";
    setModeToLocalStorage("light"); // Save the current mode to localStorage
  }
});

// Sidebar End

// Time-Date

const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");

/**
 * @param {Date} date
 */
function formatTime(date) {
  const hours12 = date.getHours() % 12 || 12;
  const minutes = date.getMinutes();
  const isAm = date.getHours() < 12;

  return `${hours12.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${isAm ? "AM" : "PM"}`;
}

/**
 * @param {Date} date
 */
function formatDate(date) {
  const DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  return `${DAYS[date.getDay()]}, ${
    MONTHS[date.getMonth()]
  } ${date.getDate()} ${date.getFullYear()}`;
}

setInterval(() => {
  const now = new Date();

  timeElement.textContent = formatTime(now);
  dateElement.textContent = formatDate(now);
}, 200);

// Time-Date End


// About Button

const aboutButton = document.getElementById('about-btn');
const aboutBox = document.getElementById('about-box');
const closeButton = document.getElementById('close-btn');

aboutButton.addEventListener('click', () => {
  aboutBox.classList.toggle('fade-in');
  aboutBox.style.display = aboutBox.style.display === 'none' ? 'block' : 'none';
});

closeButton.addEventListener('click', () => {
  aboutBox.style.display = 'none';
});

// About Button