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

let listOfTasks = [];

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
container.addEventListener("click", acceptChanges);

//FUNCTIONS
function addItem(e) {
  e.preventDefault();
  console.log("ADDITEM FIRED");
  const value = grocery.value;
  if (value.length > 25) {
    displayAlert("Text is too long! Text < 25Char", "alert-danger");
    return;
  }
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
  });
};

// function to display Alert
async function displayAlert(message, alertType) {
  // message passed as argument gets put inside display div
  alert.textContent = message;
  // add class based on alert-type
  // removing classes completely from alert.Classlist
  // adding the alert class so that our css style is applied and then adding the class of the button clicked
  alert.classList = [];
  alert.classList.add("alert");
  alert.classList.add(alertType);
  // 1 wait before removing display message
  await sleep(1000);
  document.querySelector(".alert").innerText = "";
}
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
    listOfTasks.push(text);
    // console.log(listOfTasks);
  }
  addText();
  serializeTasks();
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
  //
  // save item to localStorage

  // saveToLocalStorage();
};
//
//
//
//

const editableText = document.createElement("input");
editableText.setAttribute("type", "text");
editableText.setAttribute("class", "input-edit");
// sleep function to deliberately block code if needed
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function editOrDelete(e) {
  // blocking for 20ms so the switch looks more natural in the app
  await sleep(20);
  let id = e.target.getAttribute("id");
  let element = e.target;
  console.log(element);
  if (e.target.classList.contains("del-btn") && id) {
    const article = e.target.closest(".grocery-item");
    let textToPop = article.children[0].innerText;
    console.log(textToPop);
    if (article) {
      article.remove();

      // remove from list of tasks:
      listOfTasks.pop(textToPop);
    }
  } else if (e.target.classList.contains("edit-btn") && id) {
    const article = e.target.closest(".grocery-item");

    if (article) {
      const paragraph = article.querySelector(".title");
      // inner Content of p tag to put in the input field:
      let innerContent = paragraph.innerText;
      console.log(innerContent);
      if (paragraph);

      const inputElement = editableText.cloneNode(true);
      paragraph.innerHTML = "";
      paragraph.appendChild(inputElement);
      // putting <p> text into input field:
      inputElement.value = innerContent;
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

  if (
    e.target.classList.contains("edit-btn") &&
    id &&
    element.innerHTML !== checkFontAwesome
  ) {
    element.innerHTML = checkFontAwesome;
  }

  if (element.className == "fa-solid fa-check") {
    // change input field to <p> with changes saved:
    acceptChanges(e);
    element.className = "fa-solid fa-pen-to-square";
    // editOrDelete(e);
    console.log("HELLO FROM", element);
  }
}

function clearItems() {
  // length more than one so that the initial child doesnt get removed, we should simply hide it
  while (list.lastChild && list.children.length > 1) {
    list.removeChild(list.lastChild);
  }
}
// function to clear input form after new <p> element has been formed
function clearInput() {
  document.querySelector("input").value = "";
  //
}

// function to accept changes made from user
function acceptChanges(e) {
  let element = e.target;
  if (element.className == "fa-solid fa-check") {
    // select article
    const article = element.closest(".grocery-item");
    // select paragraph inside article
    const pTitle = article.querySelector("p.title");
    // if paragraph is there, select input, get its value, remove it and lastly put text into the paragraph text
    if (pTitle) {
      const inputToRemove = pTitle.querySelector("input");
      let textToSave = inputToRemove.value;
      inputToRemove.remove();
      pTitle.innerText = textToSave;
    }
  } else {
    return;
  }
}

// Undo function
// function that undoes last action :
// use the memento pattern although inefficient
// take a snapshot of the entire state of the program and save it into an array
// if user wants to undo, simply pop() the last memento and apply it
//The program will return to the state it was before the last action was applied
function undo() {}

//

// serialization
const serializeTasks = () => {
  let serializationText = "tasks=";
  listOfTasks.forEach((element, index) => {
    let newString = `${element}:`;
    serializationText += newString;
  });
  return serializationText;
};

// cookies
document.getElementById("addCookie").addEventListener("click", addCookie);
document.getElementById("loadCookie").addEventListener("click", readCookie);
function addCookie() {
  let variable = serializeTasks();
  console.log(variable);
  document.cookie = variable;
}

function readCookie() {
  console.log("hello from read");
  // console.log(document.cookie);
  let variable = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("tasks="))
    .replace("tasks=", "");

  console.log(variable);
  let cookieArray = variable.split(":");
  console.log(cookieArray);
  // if user clicks "LOAD", create cookieArray.length amount of articles and add each element of array to the p tags in order
}

function loadSavedElements() {
  let containerDiv = document.getElementById("groceryID");
  let savedItems = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("tasks="))
    .replace("tasks=", "")
    .split(":");
  savedItems = savedItems.filter((x) => x !== "");

  console.log(savedItems);

  savedItems.forEach((element, i) => {
    createItemContainer();
    const childrenArray = Array.from(containerDiv.children);
    console.log(childrenArray);
    childrenArray[i].childNodes[0].innerText = element;

    // childrenArray.forEach((x) => {
    //   console.log(x);
    // });
  });
}

document
  .getElementById("loadCookie")
  .addEventListener("click", loadSavedElements);
