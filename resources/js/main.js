//to store our items
//if there is item stored in the list, convert it to object
var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
    todo: [],
    completed: []
};

//remove and complete icons in SVG format
var removeSVG = '<svg version="1.1" class ="fill" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><<g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6L16.3,18.7L16.3,18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8C7.4,10.2,7.7,10,8,10c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
var completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';

renderTodoList();

//user clicked on add button
//if there is any item in the text field, add that item to the to do list
document.getElementById('add').addEventListener('click', function() {
    var value = document.getElementById('item').value;

    if (value) {
        addItem(value);
    }
});

//When one presses enter key on the item
document.getElementById('item').addEventListener('keydown', function(e) {
    var value = this.value;
    if (e.code === 'Enter' && value) {
        addItem(value);
    }
});

function addItem(value) {
    addItemToDOM(value);
    data.todo.push(value);
    document.getElementById('item').value = '';
    dataObjectUpdated();
    console.log(localStorage);

}


function renderTodoList() {
    if (!data.todo.length && !data.completed.length) return;

    for (var i = 0; i < data.todo.length; i++) {
        var value = data.todo[i];
        addItemToDOM(value); //adds items todo
    }
    for (var j = 0; j < data.completed.length; j++) {
        var value = data.completed[i];
        addItemToDOM(value, true); //adds item to completed
    }
}



//STORE THE ITEMS IN THE LOCAL STORAGE(addItemToDOM,completeitem, remove item)
function dataObjectUpdated() {
    localStorage.setItem('todoList', JSON.stringify(data));
}

//function to remove item
function removeItem() {
    var item = this.parentNode.parentNode; //li
    var parent = item.parentNode; //ul
    var id = parent.id;
    var value = item.innerText;

    //DELETING ITEM FROM STORAGE(DATA);
    if (id === 'todo') {
        data.todo.splice(data.todo.indexOf(value), 1); //delete the item from storage todo
    } else { //else reverse the effect
        data.completed.splice(data.completed.indexOf(value), 1);
    }


    dataObjectUpdated();
    //this has to run last so that the item can be deleted from the storage ist(when using console)
    parent.removeChild(item);
}


function completeItem() {

    var item = this.parentNode.parentNode; //li
    var parent = item.parentNode; //ul
    var id = parent.id; //gets the id of the ul
    //check if the item should be added to the completed or readded to todo
    var value = item.innerText; //gets the text in li


    //STORAGE(DATA)
    if (id === 'todo') {
        data.todo.splice(data.todo.indexOf(value), 1); //delete the item from storage todo
        data.completed.push(value); //add it to the storage completed
    } else { //else reverse the effect
        data.completed.splice(data.completed.indexOf(value), 1);
        data.todo.push(value);
    }


    //check if the item should be added to the completed or readded to the todo
    var target = (id === 'todo') ? document.getElementById('completed') : document.getElementById('todo');
    if (id === 'todo') { //is the id todo
        parent.removeChild(item); //remove from todo
        target.insertBefore(item, target.childNodes[0]); //insert at the top of completed

    } else { //target is now todo
        target.insertBefore(item, target.childNodes[0]);
    }

    dataObjectUpdated();
}



//add items in the to do list
function addItemToDOM(text, completed) {
    //so we can add item to the todo and completed during render from the storage
    var list = (completed) ? document.getElementById('completed') : document.getElementById('todo');
    var item = document.createElement('li');
    item.innerText = text;

    var buttons = document.createElement('div');
    buttons.classList.add('buttons');

    var remove = document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML = removeSVG;

    //adding event listener for remove item using  button thats has class remove
    remove.addEventListener('click', removeItem);


    var complete = document.createElement('button');
    complete.classList.add('complete');
    complete.innerHTML = completeSVG;
    //add event listener for complete
    complete.addEventListener('click', completeItem);

    //add the svg icon to the button div
    buttons.appendChild(remove);
    buttons.appendChild(complete);

    //putting buttons into li(item)
    item.appendChild(buttons);
    //always insert the list item at the top
    list.insertBefore(item, list.childNodes[0]);

}