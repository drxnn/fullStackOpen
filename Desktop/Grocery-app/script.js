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
    // put message and data type into variables.
    const message = e.target.getAttribute("data-message");
    const alertType = e.target.getAttribute("data-alert-type");
    // get inputValue to check submit button(2 outcomes)
    const inputValue = grocery.value;
    // if value is empty, display failure function
    if (inputValue.trim() == "") {
      displayAlert("Empty Value!", "alert-danger");
    }
    // if value is not empty, submit item accordingly
    else if (inputValue.trim()) {
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
// LOCAL STORAGE

//SETUP ITEMS
