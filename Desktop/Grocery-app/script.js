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
  console.log(id);
  if (value && !editFlag) {
    console.log("ADDING VALUE TO LIST");
  } else if (value && editFlag) {
    console.log("EDITING");
  } else {
    console.log("ELSE");
  }
}

// function to add eventListener to all buttons

allButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    // console.log(button);
    // put message and data type into variables.
    const message = e.target.getAttribute("data-message");
    const alertType = e.target.getAttribute("data-alert-type");

    console.log(button, message, alertType);
    // get inputValue to check submit button(2 outcomes)
    const inputValue = grocery.value;
    // if value is empty, display failure function && target is our submit button
    if (
      inputValue.trim() == "" &&
      e.target.getAttribute("class") === "submit-btn my-button"
    ) {
      displayAlert("Empty Value!", "alert-danger");
    }
    // if value is not empty, submit item accordingly && target is our submit button
    else if (
      inputValue.trim() &&
      e.target.getAttribute("class") === "submit-btn my-button"
    ) {
      displayAlert("Item submitted Successfully!", "alert-success");
    }
    // else statement for the other 3 buttons that only have 1 outcome
    else {
      displayAlert(message, alertType);
    }
  });
  console.log(button);
});
console.log(allButtons);

function displayAlert(message, alertType) {
  // message passed as argument gets put inside display div
  alert.textContent = message;
  // add class based on alert-type
  alert.classList.add(alertType);
}

// Functions to dynamically add or remove more items in the list :
// {Implementation Guide}:
/*
Optional: start off with the item holders being #hidden
 If User clicks Submit Button && there's a value in input field, add another item holder(<p> with edit and delete button) and display added item.
 If User clicks delete button on an item, remove it from list
 If User clicks edit button, edit <p> tag
 If theres a lot of items, increase container size as needed
 If Clear-BTN is clicked, remove all lists
 Clicking the edit button turn the item text into an input field for editing, once user clicks edit, it changes back to a <p> tag
 Optional: add confirmation button when user clicks Clear Button(In case they click accidentally/ or add Undo button)


*/
//Function to create the container with the item that is added by User/ alongside Edit and Delete Buttons

// document.createElement("");
// let createItemContainer = () => {};

// LOCAL STORAGE

//SETUP ITEMS
