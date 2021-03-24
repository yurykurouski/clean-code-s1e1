//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput = document.getElementById("main-page__new-task");//Add a new task.
var addButton = document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder = document.getElementById("main-page__tasks_incomplete");//ul of #main-page__tasks_incomplete
var completedTasksHolder = document.getElementById("main-page__tasks_completed");//main-page__tasks_completed

//New task list item
var createNewTaskElement = function (taskString) {

    var listItem = document.createElement("li");

    //input (checkbox)
    var checkBox = document.createElement("input");//checkbx
    //label
    var label = document.createElement("label");//label
    //input (text)
    var editInput = document.createElement("input");//text
    //button.edit
    var editButton = document.createElement("button");//edit button

    //button.delete
    var deleteButton = document.createElement("button");//delete button
    var deleteButtonImg = document.createElement("img");//delete button image

    const sectionWrap = document.createElement("section");

    sectionWrap.className = "task__wrap";

    label.innerText = taskString;
    label.className = "main-page__label task__task-name";

    //Each elements, needs appending
    listItem.className = "tasks__task tasks__task_incomplete";


    checkBox.type = "checkbox";
    checkBox.className = "main-page__checkbox";
    editInput.type = "text";
    editInput.className = "main-page__input task__input";

    editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
    editButton.className = "main-page__button task__edit-btn";

    deleteButton.className = "main-page__button button__delete-btn";
    deleteButtonImg.src = "./remove.svg";
    deleteButtonImg.className = "delete-btn__cover";
    deleteButtonImg.alt = "Delete button";
    deleteButton.appendChild(deleteButtonImg);


    //and appending.
    listItem.appendChild(sectionWrap);
    sectionWrap.appendChild(checkBox);
    sectionWrap.appendChild(label);
    sectionWrap.appendChild(editInput);
    sectionWrap.appendChild(editButton);
    sectionWrap.appendChild(deleteButton);
    return listItem;
}



var addTask = function () {
    console.log("Add Task...");
    //Create a new list item with the text from the #main-page__new-task:
    if (!taskInput.value) return;
    var listItem = createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";

}

//Edit an existing task.

var editTask = function () {
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem = this.parentNode;

    var editInput = listItem.querySelector("input[type=text]");
    var label = listItem.querySelector("label");
    var editBtn = listItem.querySelector(".task__edit-btn");
    var containsClass = editInput.classList.contains("input_edit-mode");
    console.log(editInput, label, editBtn)
    //If class of the parent is .tasks__task_edit-mode
    if (containsClass) {

        //switch to .tasks__task_edit-mode
        //label becomes the inputs value.
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    //toggle .tasks__task_edit-mode on the parent.
    editInput.classList.toggle("input_edit-mode");
    label.classList.toggle("task_edit-mode__label");
};


//Delete task.
var deleteTask = function () {
    console.log("Delete Task...");

    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted = function () {
    console.log("Complete Task...");

    //Append the task list item to the #main-page__tasks_completed
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete = function () {
    console.log("Incomplete Task...");
    //Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #main-page__tasks_incomplete.
    var listItem = this.parentNode;


    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}



var ajaxRequest = function () {
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    console.log("bind list item events");
    //select ListItems children
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector(".task__edit-btn");
    var deleteButton = taskListItem.querySelector(".button__delete-btn");


    //Bind editTask to edit button.
    editButton.onclick = editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick = deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i = 0; i < incompleteTaskHolder.children.length; i++) {

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}




// Issues with usability don"t get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.