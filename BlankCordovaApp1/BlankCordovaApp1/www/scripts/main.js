function openNav() {
    document.getElementById("mySidenav").style.width = "50px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

//PERSONALIZE

function GetWorkspace(id_ws) {
    var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM WORKSPACE WHERE id=?', [id_ws], function (tx, rs) {
            //console.log(rs.rows.item(0));
            var div = document.createElement('div');
            div.className = 'project_item';
            div.innerHTML = '<a href="./project.html?project=' + rs.rows.item(0).id +'"> <img src="images/zairon_icon.128.png" alt="Project Icon" /> </a> <h3>' + rs.rows.item(0).name + '</h3>';
            document.getElementById('project_option').appendChild(div);
        });
    });
}

function onLoad() {
    var email = window.location.search.split('=')[1];
    var id_email=0;
    var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);
    db.transaction(function (tr) {
        tr.executeSql('SELECT * FROM USERS WHERE EMAIL=? ', [email], function (tr, rs) {
            id_email = rs.rows.item(0).id;
        });
    });

    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM PARTICIPANTS WHERE userFK=? AND active=1', [id_email], function (tx, result) {
            for (var i = 0; i < result.rows.length; i++) {
                GetWorkspace(result.rows.item(i).workspaceFK);
            }
        });
    });
}

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
