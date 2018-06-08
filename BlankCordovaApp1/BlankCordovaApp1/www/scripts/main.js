function openNav() {
    document.getElementById("mySidenav").style.width = "50px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

//PERSONALIZE
function AddMaterialsToList(){
    var ul = document.getElementById("dynamic-list");
    var candidate = document.getElementById("material_new");
    var li = document.createElement("li");
    li.setAttribute('id', candidate.value);
    li.appendChild(document.createTextNode(candidate.value));
    ul.appendChild(li);
}

function LessMaterialsToList() {
    var ul = document.getElementById("dynamic-list");
    var candidate = document.getElementById("material_new");
    var item = document.getElementById(candidate.value);
    ul.removeChild(item);
}

function AddToDoList() {
    var ul = document.getElementById("dynamic-list");
    var candidate = document.getElementById("todo_new");
    var li = document.createElement("li");
    li.setAttribute('id', candidate.value);
    li.appendChild(document.createTextNode(candidate.value));
    ul.appendChild(li);
}

function LessToDoList() {
    var ul = document.getElementById("dynamic-list");
    var candidate = document.getElementById("todo_new");
    var item = document.getElementById(candidate.value);
    ul.removeChild(item);
}