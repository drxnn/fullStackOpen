// SELECT ELEMENTS ::
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");

const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

let allButtons = document.querySelectorAll(".my-button");

//Convert NodeList to Array
let buttonsArray = Array.from(allButtons);
console.log(buttonsArray);

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
    // console.log("ADDING VALUE TO LIST");
    createItemContainer();
    console.log("ADDED");
  } else if (value && editFlag) {
    console.log("EDITING");
  } else {
    console.log("ELSE");
  }
}

// function to add eventListener to all buttons

// {{{{{FIX BELOW: All Buttons are being added when the script is first ran, so when you create new additional containers that have buttons, those buttons are not included in the "allbuttons" variable; fix!}}}}}

fireButton = function () {
  buttonsArray.forEach((button) => {
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
  console.log(buttonsArray);

  function displayAlert(message, alertType) {
    // message passed as argument gets put inside display div
    alert.textContent = message;
    // add class based on alert-type
    alert.classList.add(alertType);
  }
};
//Call fire button for initial buttons
fireButton();
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

let createItemContainer = () => {
  // selecting original elements that are in the HTML("HIDDEN") so we can assign their attributes to the newly created Elements.

  let containerDiv = document.getElementById("groceryID");
  let originalArticle = document.getElementById("articleID");
  let originalP = document.getElementById("p-ID");
  let originalButtonDiv = document.querySelector(".button-container");
  let originalEditButton = document.querySelector(".edit-btn");
  let originalDeleteButton = document.querySelector(".del-btn");
  let article = document.createElement("article");
  containerDiv.appendChild(article);
  // create and append p element
  let p = document.createElement("p");
  article.appendChild(p);

  // create and append div and buttons inside div;

  let buttonDiv = document.createElement("div");
  article.appendChild(buttonDiv);
  let editButton = document.createElement("button");
  let deleteButton = document.createElement("button");
  buttonDiv.appendChild(editButton);
  buttonDiv.appendChild(deleteButton);

  //adding new buttons to the array
  buttonsArray.push(editButton, deleteButton);
  fireButton();
  //
  // assign classes to the new created elements
  // article class
  const articleClass = originalArticle.getAttribute("class");
  article.classList.add(articleClass);
  console.log(originalArticle.attributes);
  // paragraph class
  const paragraphClass = originalP.getAttribute("class");
  p.classList.add(paragraphClass);
  //
  //button div class
  const buttonDivClass = originalButtonDiv.getAttribute("class");
  buttonDiv.classList.add(buttonDivClass);

  // Get all attributes of edit and delete buttons and add them to newly created edit & delete buttons:

  for (const attribute of originalEditButton.attributes) {
    editButton.setAttribute(attribute.name, attribute.value);
  }

  for (const attribute of originalDeleteButton.attributes) {
    deleteButton.setAttribute(attribute.name, attribute.value);
  }

  // add icon elements to newly created buttons
  //edit-btn
  let editIconElement = document.createElement("i");
  editIconElement.className = "fa-solid fa-pen-to-square";
  editButton.appendChild(editIconElement);
  //del-btn
  let deleteIconElement = document.createElement("i");
  deleteIconElement.className = "fa-solid fa-trash";
  deleteButton.appendChild(deleteIconElement);
};

// Function to Delete items when they are clicked
function deleteItemContainer() {}
// LOCAL STORAGE
