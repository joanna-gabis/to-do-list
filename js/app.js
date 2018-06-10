document.addEventListener('DOMContentLoaded', function() {

    var input = document.getElementById('taskInput');
    var addTaskButton = document.getElementById('addTaskButton');
    var taskList = document.getElementById('taskList');
    var removeFinishButton = document.getElementById('removeFinishedTasksButton');
    var counter = document.getElementById('counter');
    var counterIndex = 0;
    counter.innerText = counterIndex;
    var priority = document.getElementById('priority');

    // Add task button event listener

    addTaskButton.addEventListener('click', function() {
       var newTask = document.createElement('li');
       var taskName = document.createElement('h1');
       taskName.innerText = input.value;
       var taskPriority = document.createElement('p');
       taskPriority.innerText = 'Priorytet zadania: ' +  priority.value;
       var buttonComplete = document.createElement('button');
       buttonComplete.innerText = 'Complete';
       var buttonDelete = document.createElement('button');
       buttonDelete.innerText = 'Delete';

       buttonComplete.addEventListener('click', function() {
           this.parentElement.firstElementChild.classList.toggle('done');
           counterIndex = document.querySelectorAll('h1:not(.done)').length;
           counter.innerText = counterIndex;
       });

       buttonDelete.addEventListener('click', function() {
           taskList.removeChild(this.parentElement);
           counterIndex = document.querySelectorAll('h1:not(.done)').length;
           counter.innerText = counterIndex;
       });

       if(input.value.length > 5 && input.value.length < 100) { // correct task name length

           newTask.appendChild(taskName);
           newTask.appendChild(taskPriority);
           newTask.appendChild(buttonComplete);
           newTask.appendChild(buttonDelete);
           newTask.setAttribute('data-priority', priority.value);

           if(taskList.children.length === 0) {
               taskList.appendChild(newTask);
           } else {
                for(var i=0; i<taskList.children.length; i++) {
                    if (parseInt(newTask.dataset.priority) >= parseInt(taskList.children[i].dataset.priority)) {
                        taskList.insertBefore(newTask, taskList.children[i]);
                        break;

                    } else if(parseInt(newTask.dataset.priority) < parseInt(taskList.children[i].dataset.priority) && i===taskList.children.length-1) {
                        taskList.appendChild(newTask);
                        break;
                    }
                }
           }
           input.style.borderColor="inherit";
           input.value = '';
           priority.value = 1;
       } else { // incorrect task name length (too short or too long)
           input.value = '';
           input.setAttribute('placeholder', 'The number of characters must be between 5 and 100');
           input.style.borderColor="red";
       }
        counterIndex = document.querySelectorAll('h1:not(.done)').length;
        counter.innerText = counterIndex;
    });

    // remove finished tasks button event listener

    removeFinishButton.addEventListener('click', function() {
       var finishedTasks = document.querySelectorAll('.done'); //array h1

       for(var i=0; i<finishedTasks.length; i++) {
           taskList.removeChild(finishedTasks[i].parentElement);
       }
    });
});
