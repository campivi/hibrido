function openNav() {
    document.getElementById("mySidenav").style.width = "50px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

//PERSONALIZE
function AddMaterialsToList(){
    var ul = document.getElementById("dynamic-list-material");
    var candidate = document.getElementById("material_new");
    var counter = document.getElementById("counter_material");
    var li = document.createElement("li");
    li.setAttribute('id', counter.value);
    li.appendChild(document.createTextNode(counter.value + ". " +candidate.value));
    counter.value++;
    ul.appendChild(li);
}

function LessMaterialsToList() {
    var ul = document.getElementById("dynamic-list-material");
    var candidate = document.getElementById("material_new");
    var item = document.getElementById(candidate.value);
    var counter = document.getElementById("counter_material");
    if (!document.getElementById(counter.value - 1)) {
        counter.value--;
    }
    ul.removeChild(item);
}

function AddToDoList() {
    var ul = document.getElementById("dynamic-list-todo");
    var candidate = document.getElementById("todo_new");
    var counter = document.getElementById("counter_todo");
    var li = document.createElement("li");
    li.setAttribute('id', counter.value);
    console.log(counter.value);
    li.className = 'item';
    li.addEventListener("click", function (e) {
        if (e.target && e.target.matches("li.item")) {
                e.target.className = "done"; 
        } else {
            //Cuando entra al li.done
            e.target.className = "item";
        }
    });
    li.appendChild(document.createTextNode(counter.value + ". " + candidate.value));
    counter.value++;
    ul.appendChild(li);
}

function LessToDoList() {
    var ul = document.getElementById("dynamic-list-todo");
    var candidate = document.getElementById("todo_new");
    var item = document.getElementById(candidate.value);
    var counter = document.getElementById("counter_todo");
    if (!document.getElementById(counter.value - 1)) {
        counter.value--;
    }
    ul.removeChild(item);
}

function AddParticipantsToList() {
    var ul = document.getElementById("dynamic-list-participants");
    var candidate = document.getElementById("participants_new");
    var counter = document.getElementById("counter_participants");
    var li = document.createElement("li");
    li.setAttribute('id', counter.value);
    li.appendChild(document.createTextNode(counter.value + ". " + candidate.value));
    counter.value++;
    ul.appendChild(li);
}

function LessParticipantsToList() {
    var ul = document.getElementById("dynamic-list-participants");
    var candidate = document.getElementById("participants_new");
    var item = document.getElementById(candidate.value);
    var counter = document.getElementById("counter_participants");
    if (!document.getElementById(counter.value - 1)) {
        counter.value--;
    }
    ul.removeChild(item);
}
