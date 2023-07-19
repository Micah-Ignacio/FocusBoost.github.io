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

// Pomodoro

const circularProgressBar = document.querySelector("#circularProgressBar");
const circularProgressBarNumber = document.querySelector("#circularProgressBar .progress-value");
const buttonTypePomodoro = document.querySelector("#buttonTypePomodoro");
const buttonTypeShortBreak = document.querySelector("#buttonTypeShortBreak");

const audio = new Audio('images/alarm.mp3');

const pomodoroTimerInSeconds = 1500; 
const shortBreakTimerInSeconds = 100;
const TIMER_TYPE_POMODORO = 'POMODORO';
const TIMER_TYPE_SHORT_BREAK = 'SHORTBREAK';


let progressInterval;
let pomodoroType = TIMER_TYPE_POMODORO;
let timerValue = pomodoroTimerInSeconds;
let multiplierFactor = 360 / timerValue;


function formatNumberInStringMinute(number){
    
    const minutes = Math.trunc(number / 60)
                        .toString()
                            .padStart(2, '0');
    const seconds = Math.trunc(number % 60)
                            .toString()
                                .padStart(2, '0');
    return `${minutes}:${seconds}`;
}

const startTimer = () => {
    progressInterval = setInterval(() => {
        timerValue--;
        setInfoCircularProgressBar();
    }, 1000);
}

const stopTimer = () => clearInterval(progressInterval);

const resetTimer = () =>{
    clearInterval(progressInterval);

    timerValue = (pomodoroType === TIMER_TYPE_POMODORO) 
                        ? pomodoroTimerInSeconds 
                            : shortBreakTimerInSeconds;

    multiplierFactor = 360 / timerValue;

    setInfoCircularProgressBar();    
    // audio.stop();
}
  
function setInfoCircularProgressBar(){

    if(timerValue === 0){
        stopTimer();
        audio.play();        
    }

    circularProgressBarNumber.textContent = `${formatNumberInStringMinute(timerValue) }`;
    circularProgressBar.style.background = `conic-gradient(var(--blue) ${timerValue * multiplierFactor}deg, var(--purple) 0deg)`;

}

const setPomodoroType = (type) =>{    
    pomodoroType = type; 

    if(type === TIMER_TYPE_POMODORO){
        buttonTypeShortBreak.classList.remove("active");
        buttonTypePomodoro.classList.add("active");                  
    }else{
        buttonTypePomodoro.classList.remove("active");
        buttonTypeShortBreak.classList.add("active"); 
    }

    resetTimer();
}

// Pomodoro End