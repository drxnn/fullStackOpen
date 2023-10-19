// SELECT ELEMENTS ::
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");

const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
console.log(list.children);
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

clearBtn.addEventListener("click", clearItems);
container.addEventListener("click", editOrDelete);
container.addEventListener("click", changeFont);

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

let createItemContainer = () => {
  // selecting original elements that are in the HTML("HIDDEN") so we can assign their attributes to the newly created Elements.

  let containerDiv = document.getElementById("groceryID");
  let originalArticle = document.getElementById("articleID");
  let originalP = document.getElementById("p-ID");
  let originalButtonDiv = document.querySelector(".button-container");
  let originalEditButton = document.querySelector(".edit-btn");
  let originalDeleteButton = document.querySelector(".del-btn");

  // create article
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

  // function to add Text to new <p> tag and clear input form
  function addText() {
    let text = document.querySelector("input").value;
    p.innerText = text;
    clearInput(); // function to clear input field called
  }
  addText();
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

  // add unique ID to newly created elements so that we can select them later
  const id = new Date().getTime().toString();
  editButton.setAttribute("id", id);
  deleteButton.setAttribute("id", +id + +id);
  console.log(typeof id);
  //
  //

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
//
//
//
//

const editableText = document.createElement("input");
editableText.setAttribute("type", "text");
editableText.setAttribute("class", "input-edit");

function editOrDelete(e) {
  let id = e.target.getAttribute("id");
  let element = e.target;
  console.log(element);
  console.log(id);
  if (e.target.classList.contains("del-btn") && id) {
    const article = e.target.closest(".grocery-item");

    if (article) {
      article.remove();
    }
  } else if (e.target.classList.contains("edit-btn") && id) {
    const article = e.target.closest(".grocery-item");

    if (article) {
      const paragraph = article.querySelector(".title");
      if (paragraph);
      console.log(paragraph);
      const inputElement = editableText.cloneNode(true);
      paragraph.innerHTML = "";
      paragraph.appendChild(inputElement);
    }
  }
}

//change font upon click:
let checkFontAwesome = "<i class='fa-solid fa-check'></i>";

// normal font:

let editFontAwesome = "<i class='fa-solid fa-pen-to-square'></i>";

function changeFont(e) {
  let id = e.target.getAttribute("id");
  let element = e.target;
  console.log(element, id);

  if (
    e.target.classList.contains("edit-btn") &&
    id &&
    element.innerHTML !== checkFontAwesome
  ) {
    element.innerHTML = checkFontAwesome;
  }
  console.log("element.innerHTML:", element.className);
  if (element.className == "fa-solid fa-check") {
    element.className = "fa-solid fa-pen-to-square";
    console.log("HELLO FROM", element);
  }
}

//{GUIDELINE}:
// Elements are now editable, implement save functionality that allows user to save the changes, change Icon to the "check-mark", user clicks check-mark and the changes are saved and the element is returned back to a <p>;
// When user clicks the edit button, whatever text was on the <p> element before clicking the button, should be transposed to the input
// style input a little more
// "Changes Saved" alert after user saves changes
// (Optional) Set a limit to the amount of items user can add
// "Clear Items" button will remove all items from the list
// (Optional) Add a two step method before clearing all items, in case user accidentally clicks on it

// function to clear all items from List
// doesnt work => fix

function clearItems() {
  while (list.lastChild && list.children.length > 1) {
    list.removeChild(list.lastChild);
  }
}
// function to clear input form after new <p> element has been formed
function clearInput() {
  document.querySelector("input").value = "";
  //
}

// LOCAL STORAGE
