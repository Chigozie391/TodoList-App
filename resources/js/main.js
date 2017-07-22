
//to store our items
var data ={
	todo:[],
	completed:[]
}

//remove and complete icons in SVG format
var removeSVG = '<svg version="1.1" class ="fill" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><<g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6L16.3,18.7L16.3,18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8C7.4,10.2,7.7,10,8,10c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
var completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';


 //user clicked on add button
 //if there is any item in the text field, add that item to the to do list
 document.getElementById('add').addEventListener('click', function(){
 var value = document.getElementById('item').value;

if(value){
	addItem(value);
	data.todo.push(value);
	document.getElementById('item').value = '';
}   
 });

 //function to remove item
function removeItem(){
	var item = this.parentNode.parentNode; //li
	var parent = item.parentNode;//ul
	parent.removeChild(item);
}


function completeItem(){
	var item = this.parentNode.parentNode; //li
	parent = item.parentNode //ul
	var id = parent.id;  //gets the id
    //check if the item should be added to the completed or readded to todo
   var textValue = item.innerText;

   if (id === 'todo'){
   	data.todo.splice(data.todo.indexOf(textValue),1); //deleting item from data.todo and remove one
    data.completed.push(textValue);
}else{
   data.completed.splice(data.todo.indexOf(textValue),1); //deleting item from data.todo and remove one
   data.todo.push(textValue);
}

   data.todo.splice(data.todo.indexOf(textValue),1); //deleting item from data.todo and remove one
   data.completed.push(textValue);
   console.log(data); 

   if  (id === 'todo') {
    var target = document.getElementById('completed');
    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);

    }
    else {

    var target = document.getElementById('todo');
    target.insertBefore(item, target.childNodes[0]);
   
    } 
    
}
//add items in the to do list
 function addItem(text){
    
    var list = document.getElementById('todo');


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

 	buttons.appendChild(remove);
 	buttons.appendChild(complete);

//putting buttons into li(item)
item.appendChild(buttons);
list.insertBefore(item, list.childNodes[0]);

}