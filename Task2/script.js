// Function to create a new task item
function createTaskItem(task, priority, deadline, label, taskNumber) {
    // Create the task item elements
    var listItem = document.createElement('li');
    var taskNumberSpan = document.createElement('span');
    var taskTextSpan = document.createElement('span');
    var priorityText = document.createElement('span');
    var deadlineText = document.createElement('span');
    var labelText = document.createElement('span');
    var editButton = document.createElement('button');
    var deleteButton = document.createElement('button');

    // Set the task item content
    taskNumberSpan.textContent = taskNumber + '.';
    taskTextSpan.textContent = task;
    priorityText.textContent = "Priority: " + priority;
    deadlineText.textContent = "Deadline: " + deadline;
    labelText.textContent = "Label: " + label;
    editButton.textContent = 'Edit';
    deleteButton.textContent = 'Delete';

    // Add event listener to the edit button
    editButton.addEventListener('click', function() {
    editTaskItem(listItem);
    });

    // Add event listener to the delete button
    deleteButton.addEventListener('click', function() {
    deleteTaskItem(listItem);
    });

    // Append the elements to the task item
    listItem.appendChild(taskNumberSpan);
    listItem.appendChild(taskTextSpan);
    listItem.appendChild(document.createElement('br'));
    listItem.appendChild(priorityText);
    listItem.appendChild(document.createElement('br'));
    listItem.appendChild(deadlineText);
    listItem.appendChild(document.createElement('br'));
    listItem.appendChild(labelText);
    listItem.appendChild(document.createElement('br'));
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    listItem.style.marginBottom = '10px';

    return listItem;
}

  // Function to add a new task
function addTask() {
    var todoInput = document.getElementById('todo-input');
    var prioritySelect = document.getElementById('priority-select');
    var deadlineInput = document.getElementById('deadline-input');
    var labelInput = document.getElementById('label-input');

    var task = todoInput.value.trim();
    var priority = prioritySelect.value;
    var deadline = deadlineInput.value;
    var label = labelInput.value.trim();

    if (task === '') {
    return;
    }

    // Create a new task item
    var taskList = document.getElementById('taskList');
    var taskNumber = taskList.children.length + 1;
    var listItem = createTaskItem(task, priority, deadline, label, taskNumber);

    // Append the task item to the task list
    taskList.appendChild(listItem);

    // Clear the input fields
    todoInput.value = '';
    prioritySelect.value = '';
    deadlineInput.value = '';
    labelInput.value = '';
    history.replaceState({}, document.title, location.href.split('?')[0]);
}

  // Function to update task numbering
function updateTaskNumbering() {
    var taskItems = document.querySelectorAll('#taskList li');
    for (var i = 0; i < taskItems.length; i++) {
    var taskNumberSpan = taskItems[i].querySelector('span:first-child');
    taskNumberSpan.textContent = (i + 1) + '.';
    }
}

  // Function to edit a task item
function editTaskItem(listItem) {
    var taskTextSpan = listItem.querySelector('span:nth-child(2)');
    var priorityText = listItem.querySelector('span:nth-child(4)');
    var deadlineText = listItem.querySelector('span:nth-child(6)');
    var labelText = listItem.querySelector('span:nth-child(8)');

    var task = prompt('Edit Task:', taskTextSpan.textContent);
    var priority = prompt('Edit Priority:', priorityText.textContent.slice(9));
    var deadline = prompt('Edit Deadline:', deadlineText.textContent.slice(10));
    var label = prompt('Edit Label:', labelText.textContent.slice(7));

    if (task !== null && priority !== null && deadline !== null && label !== null) {
    taskTextSpan.textContent = task;
    priorityText.textContent = 'Priority: ' + priority;
    deadlineText.textContent = 'Deadline: ' + deadline;
    labelText.textContent = 'Label: ' + label;
    }
}

  // Function to delete a task item
function deleteTaskItem(listItem) {
    var taskList = document.getElementById('taskList');
    taskList.removeChild(listItem);
    updateTaskNumbering();
}

  // Get the form and add event listener to the submit event
var todoForm = document.getElementById('ToDo-List');
todoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    addTask();
});

  // Get the clear tasks button and add event listener to the click event
var clearTasksBtn = document.getElementById('clearTasksBtn');
clearTasksBtn.addEventListener('click', function() {
    var taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
});
