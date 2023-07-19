// Sidebar

// Function to set the current mode to localStorage
function setModeToLocalStorage(mode) {
    localStorage.setItem("darkMode", mode);
  }
  
  // Function to get the current mode from localStorage
  function getModeFromLocalStorage() {
    return localStorage.getItem("darkMode");
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

// Inspirational Quotes

const quoteText = document.querySelector(".quote"),
quoteBtn = document.querySelector("button"),
authorName = document.querySelector(".name"),
speechBtn = document.querySelector(".speech"),
copyBtn = document.querySelector(".copy"),
synth = speechSynthesis;

function randomQuote(){
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";
    fetch("http://api.quotable.io/random").then(response => response.json()).then(result => {
        quoteText.innerText = result.content;
        quoteBtn.classList.remove("loading");
        quoteBtn.innerText = "New Quote";
    });
}

speechBtn.addEventListener("click", ()=>{
    if(!quoteBtn.classList.contains("loading")){
        let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText}`);
        synth.speak(utterance);
        setInterval(()=>{
            !synth.speaking ? speechBtn.classList.remove("active") : speechBtn.classList.add("active");
        }, 10);
    }
});

copyBtn.addEventListener("click", ()=>{
    navigator.clipboard.writeText(quoteText.innerText);
});

quoteBtn.addEventListener("click", randomQuote);

// Inspirational Quotes End