console.log('Code is Poetry');

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    // Validate if the input is not empty
    if (taskInput.value.trim() !== '') {
        const task = document.createElement('li');
        task.innerText = taskInput.value;

        // Create a button to mark task as complete
        const completeButton = document.createElement('button');
        completeButton.innerText = 'Complete';
        completeButton.classList.add('complete');
        completeButton.onclick = function() {
            task.classList.toggle('completed');
        };

        // Create a button to delete the task
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.onclick = function() {
            task.remove();
        };

        // Append the buttons to the task
        task.appendChild(completeButton);
        task.appendChild(deleteButton);

        // Append the task to the task list
        taskList.appendChild(task);

        // Clear the input field after adding the task
        taskInput.value = '';
    } else {
        alert('Please enter a task!');
    }
}
