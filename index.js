var enterButton = document.getElementById("enter");
var input = document.getElementById("userInput");
var ul = document.querySelector("ul");

function inputLength() {
    return input.value.length;
}

function createListElement(todo) {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(todo.text)); // Use todo.text for the text content
    ul.appendChild(li);
    if (todo.done) {
        li.classList.add("done"); // Add 'done' class if the todo is marked as done
    }
    input.value = "";

    // START STRIKETHROUGH
    function crossOut() {
        li.classList.toggle("done");
        updateLocalStorage(); // Update local storage when crossing out
    }

    li.addEventListener("click", crossOut);
    // END STRIKETHROUGH

    // START ADD DELETE BUTTON
    var dBtn = document.createElement("button");
    dBtn.appendChild(document.createTextNode("x"));
    li.appendChild(dBtn);
    dBtn.addEventListener("click", deleteListItem);
    // END ADD DELETE BUTTON

    // ADD CLASS DELETE (DISPLAY: NONE)
    function deleteListItem() {
        li.classList.add("delete");
        updateLocalStorage(); // Update local storage when deleting
    }
}

function addListAfterClick() {
    if (inputLength() > 0) {
        createListElement({ text: input.value, done: false }); // Pass an object
        updateLocalStorage();
    }
}

function addListAfterKeypress(event) {
    if (inputLength() > 0 && event.which === 13) {
        createListElement({ text: input.value, done: false }); // Pass an object
        updateLocalStorage();
    }
}

function saveToLocalStorage(todo) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push({ text: todo, done: false }); // Save as an object with text and done status
    localStorage.setItem('todos', JSON.stringify(todos));
}

function updateLocalStorage() {
    let todos = [];
    document.querySelectorAll("li").forEach(li => {
        if (!li.classList.contains("delete")) {
            todos.push({
                text: li.firstChild.textContent,
                done: li.classList.contains("done") // Save the done status
            });
        }
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => {
        createListElement(todo); // Pass the entire todo object
    });
}

// Load todos from localStorage when the page loads
window.onload = loadTodos;

enterButton.addEventListener("click", addListAfterClick);
input.addEventListener("keypress", addListAfterKeypress);