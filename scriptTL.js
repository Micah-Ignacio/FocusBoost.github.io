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

// ToDay List

const itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

document.querySelector("#enter").addEventListener("click", () => {
  const item = document.querySelector("#item")
  createItem(item)
})

document.querySelector("#item").addEventListener("keypress", (e) => {
  if(e.key === "Enter"){
    const item = document.querySelector("#item")
    createItem(item)
  }
})

function displayDate(){
  let date = new Date()
  date = date.toString().split(" ")
  date = date[1] + " " + date[2] + " " + date[3] 
  document.querySelector("#date").innerHTML = date 
}

function displayItems(){
  let items = ""
  for(let i = 0; i < itemsArray.length; i++){
    items += `<div class="item">
                <div class="input-controller">
                  <textarea disabled>${itemsArray[i]}</textarea>
                  <div class="edit-controller">
                    <i class="bx bx-check deleteBtn"></i>
                    <i class="bx bxs-edit editBtn"></i>
                  </div>
                </div>
                <div class="update-controller">
                  <button class="saveBtn">Save</button>
                  <button class="cancelBtn">Cancel</button>
                </div>
              </div>`
  }
  document.querySelector(".to-do-list").innerHTML = items
  activateDeleteListeners()
  activateEditListeners()
  activateSaveListeners()
  activateCancelListeners()
}

function activateDeleteListeners(){
  let deleteBtn = document.querySelectorAll(".deleteBtn")
  deleteBtn.forEach((dB, i) => {
    dB.addEventListener("click", () => { deleteItem(i) })
  })
}

function activateEditListeners(){
  const editBtn = document.querySelectorAll(".editBtn")
  const updateController = document.querySelectorAll(".update-controller")
  const inputs = document.querySelectorAll(".input-controller textarea")
  editBtn.forEach((eB, i) => {
    eB.addEventListener("click", () => { 
      updateController[i].style.display = "block"
      inputs[i].disabled = false })
  })
}

function activateSaveListeners(){
  const saveBtn = document.querySelectorAll(".saveBtn")
  const inputs = document.querySelectorAll(".input-controller textarea")
  saveBtn.forEach((sB, i) => {
    sB.addEventListener("click", () => {
      updateItem(inputs[i].value, i)
    })
  })
}

function activateCancelListeners(){
  const cancelBtn = document.querySelectorAll(".cancelBtn")
  const updateController = document.querySelectorAll(".update-controller")
  const inputs = document.querySelectorAll(".input-controller textarea")
  cancelBtn.forEach((cB, i) => {
    cB.addEventListener("click", () => {
      updateController[i].style.display = "none"
      inputs[i].disabled = true
      inputs[i].style.border = "none"
    })
  })
}

function createItem(item){
  itemsArray.push(item.value)
  localStorage.setItem('items', JSON.stringify(itemsArray))
  location.reload()
}

function deleteItem(i){
  itemsArray.splice(i,1)
  localStorage.setItem('items', JSON.stringify(itemsArray))
  location.reload()
}

function updateItem(text, i){
  itemsArray[i] = text
  localStorage.setItem('items', JSON.stringify(itemsArray))
  location.reload()
}

window.onload = function() {
  displayDate()
  displayItems()
};

// ToDay List End