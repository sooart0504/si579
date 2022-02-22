const taskList = document.querySelector('ul#task_list');
const descriptionInput = document.querySelector('input#task_description_input');
const dateInputElement = document.querySelector('input#duedate_input');
const timeInputElement = document.querySelector('input#duetime_input');
const taskButton = document.querySelector('button#add_task');


function addTask(description, timestamp) {
    // console.log("Test 1 worked.");
    const newList = document.createElement('li');
    const showTime = new Date(timestamp);

    if(timestamp === false) {
        newList.innerHTML = description + ' <button class="btn btn-sm btn-outline-danger done" type="button">Done</button>';
        taskList.append(newList);
    } else {
        newList.innerHTML = description + ' <span class="due">due ' + showTime + '</span><button class="btn btn-sm btn-outline-danger done" type="button">Done</button>';
        taskList.append(newList);

        dateInputElement.value = "";
        timeInputElement.value = "";
    }

    // console.log(description, "Is this working?");
};

addTask("Learn to wrap gifts", 1639944400000);
addTask("Buy milk");
addTask("Finish this Problem set.", 20220504, 1639944400000);

taskButton.addEventListener('click', () => {
    let descriptionValue = descriptionInput.value;
    addTask(descriptionValue, dateAndTimeToTimestamp(dateInputElement, timeInputElement));

    descriptionInput.value = '';
});

function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {
    const dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
    const dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time

    if(dueDate && dueTime) { // The user specified both a due date & due time
        //Add the timezone offset to account for the fact that timestamps are specified by UTC
        const timezoneOffset =  (new Date()).getTimezoneOffset() * 60 * 1000;
        return dueDate + dueTime + timezoneOffset;
    } else {
        // if the user did not specify both a due date and due time, return false
        return false;
    }
}

descriptionInput.addEventListener("keydown", (e) => {
    if (e.key === 'Enter') {
        let descriptionValue = descriptionInput.value;
        addTask(descriptionValue, dateAndTimeToTimestamp(dateInputElement, timeInputElement));

        descriptionInput.value = '';
    }
});


taskList.addEventListener('click', (e) => {
    // const doneButton = document.querySelectorAll('.btn btn-sm btn-outline-danger done');
    console.log("taskList was clicked");

    if (e.target.classList.contains("done")) {
        console.log('done button was clicked!');
        // e.parentElement.remove();
        e.target.parentElement.remove();
    };
});