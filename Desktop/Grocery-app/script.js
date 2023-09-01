// SELECT ELEMENTS ::
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");

const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

let allButtons = document.querySelectorAll(".my-button");

//EDIT OPTION
let editElement;
let editFlag = false;
let editID = "";
//EVENT LISTENERS
//submit form;
form.addEventListener("submit", addItem);

//FUNCTIONS
function addItem(e) {
  e.preventDefault();
  console.log("ADDITEM FIRED");
  const value = grocery.value;
  const id = new Date().getTime().toString();
  if (value && !editFlag) {
    console.log("ADDING VALUE TO LIST");
  } else if (value && editFlag) {
    console.log("EDITING");
  } else {
    displayAlert();
  }
}

// function to add eventListener to all buttons

allButtons.forEach((button) => {
  button.addEventListener("click", displayAlert);
  console.log(button);
});
console.log(allButtons);

function displayAlert(event) {
  let buttonClasses = event.target.classList;
  switch (true) {
    case buttonClasses.contains("clear-btn"):
      alert.textContent = "Items Cleared!";
      alert.classList.add("alert-success");
      break;
    case buttonClasses.contains("del-btn"):
      alert.textContent = "Item deleted!";
      alert.classList.add("alert-success");
      break;
    case buttonClasses.contains("edit-btn"):
      alert.textContent = "Item edited successfully!";
      alert.classList.add("alert-success");
      break;
    case buttonClasses.contains("submit-btn"):
        if()
      alert.textContent = "Empty Value";
      alert.classList.add("alert-danger");
  }
}
// LOCAL STORAGE

//SETUP ITEMS
