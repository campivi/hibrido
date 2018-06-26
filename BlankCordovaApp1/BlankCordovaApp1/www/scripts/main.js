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
            if (rs.rows.length > 0) {
                if (rs.rows.item(0).erased != 1) {
                    var div = document.createElement('div');
                    div.className = 'project_item';
                    div.innerHTML = '<a href="./project.html?workspace=' + rs.rows.item(0).id + '"> <img src="images/zairon_icon.128.png" alt="Project Icon" /> </a> <h3>' + rs.rows.item(0).name + '</h3> <a href="javascript:DeleteExtraWorkspace(' + rs.rows.item(0).id + ');"><h4>eliminar</h4></a>';
                    document.getElementById('project_option').appendChild(div);
                }
            }
        });
    });
}

function LogOut() {
    localStorage.clear();

    window.location.href = window.location.origin + "/index.html";
}

function GetProjects(ps_name, ps_id) {
    var div = document.createElement('div');
    div.className = 'project_item';
    div.innerHTML = '<a href=""> <img src="images/project_icon.128.png" alt="Project Icon"/> </a> <h3>' + ps_name + '</h3> <a href="javascript:DeleteProject(' + ps_id + ');"><h4>eliminar</h4></a>';
    document.getElementById('project_option').appendChild(div);
}

function AddMaterialsToList(){
    var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);
    var id_workspace = window.location.search.split('=')[1];
    var last_MLid = 0;
    var parent_MLid = 0;
    db.transaction(function (tx) {
        var select = "SELECT MAX(id) as maxID FROM MATERIALS";
        tx.executeSql(select, [], function (tr, rs) {
            last_MLid = rs.rows.item(0).maxID + 1;
        });
    });
    db.transaction(function (tx) {
        var select = "SELECT * FROM WORKSPACE WHERE id=" + id_workspace;
        tx.executeSql(select, [], function (tr, rs) {
            parent_MLid = rs.rows.item(0).materialListFK;
        });
    });

    db.transaction(function (tx) {

        var ul = document.getElementById("dynamic-list-material");
        var candidate = document.getElementById("material_new");
        var counter = last_MLid;
        var li = document.createElement("li");
        li.setAttribute('id', counter);
        li.appendChild(document.createTextNode(counter + ". " + candidate.value));

        tx.executeSql('INSERT INTO MATERIALS (id, name, parent_id, erased) VALUES (' + last_MLid + ', "' + candidate.value + '", ' + parent_MLid + ', 0)');
        
        ul.appendChild(li);
    });
}

function LessMaterialsToList() {
    var candidate = document.getElementById("material_new");
    var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);

    db.transaction(function (tx) {
        var select = "SELECT * FROM MATERIALS WHERE id=" + candidate.value;
        tx.executeSql(select, [], function (tr, rs) {
            if (rs.rows.length > 0) {
                var item = document.getElementById(candidate.value);
                if (item) {
                    var ul = document.getElementById("dynamic-list-material");
                    ul.removeChild(item);
                    tx.executeSql('UPDATE MATERIALS SET erased=1 WHERE id=' + candidate.value);
                }
            }
        });
    });
}

function AddToDoList() {
    var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);
    var id_workspace = window.location.search.split('=')[1];
    var last_TDid = 0;
    var parent_TDid = 0;
    db.transaction(function (tx) {
        var select = "SELECT MAX(id) as maxID FROM TO_DO";
        tx.executeSql(select, [], function (tr, rs) {
            last_TDid = rs.rows.item(0).maxID + 1;
        });
    });
    db.transaction(function (tx) {
        var select = "SELECT * FROM WORKSPACE WHERE id=" + id_workspace;
        tx.executeSql(select, [], function (tr, rs) {
            parent_TDid = rs.rows.item(0).toDoListFK;
        });
    });

    db.transaction(function (tx) {
        var ul = document.getElementById("dynamic-list-todo");
        var candidate = document.getElementById("todo_new");
        var li = document.createElement("li");
        
        tx.executeSql('INSERT INTO TO_DO (id, desc, parent_id, done, erased) VALUES (' + last_TDid + ', "' + candidate.value + '", ' + parent_TDid + ', 0, 0)');

        li.setAttribute('id', last_TDid);
        li.className = 'item';
        li.addEventListener("click", function (e) {
            if (e.target && e.target.matches("li.item")) {
                e.target.className = "done";
            } else {
                //Cuando entra al li.done
                e.target.className = "item";
            }
        });
        li.appendChild(document.createTextNode(last_TDid + ". " + candidate.value));

        
        ul.appendChild(li);
    });
}

function LessToDoList() {
    var candidate = document.getElementById("todo_new");
    var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);

    db.transaction(function (tx) {
        var select = "SELECT * FROM TO_DO WHERE id=" + candidate.value;
        tx.executeSql(select, [], function (tr, rs) {
            if (rs.rows.length > 0) {
                var item = document.getElementById(candidate.value);
                if (item) {
                    var ul = document.getElementById("dynamic-list-todo");
                    ul.removeChild(item);
                    tx.executeSql('UPDATE TO_DO SET erased=1 WHERE id=' + candidate.value);
                }
            }
        });
    });
}

function AddBDMaterial(id_materialList) {
    var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);
    db.transaction(function (tx) {
        var select = "SELECT * FROM MATERIALS WHERE id=" + id_materialList;
        tx.executeSql(select, [], function (tr, rs) {
            var ul = document.getElementById("dynamic-list-material");
            var candidate = rs.rows.item(0).name;
            var counter = rs.rows.item(0).id;
            var li = document.createElement("li");
            li.setAttribute('id', counter);
            li.appendChild(document.createTextNode(counter + ". " + candidate));
            ul.appendChild(li);
        });
    });
}

function ChangeDoneStatusto1(todo_ID) {
    var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);

    db.transaction(function (tx) {
        tx.executeSql('UPDATE TO_DO SET done=1 WHERE id=' + todo_ID);
    });
}

function ChangeDoneStatusto0(todo_ID) {
    var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);

    db.transaction(function (tx) {
        tx.executeSql('UPDATE TO_DO SET done=0 WHERE id=' + todo_ID);
    });
}

function AddBDToDo(id_materialList) {
    var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);
    db.transaction(function (tx) {
        var select = "SELECT * FROM TO_DO WHERE id=" + id_materialList;
        tx.executeSql(select, [], function (tr, rs) {
            var ul = document.getElementById("dynamic-list-todo");
            var candidate = rs.rows.item(0).desc;
            var counter = rs.rows.item(0).id;
            var li = document.createElement("li");
            li.setAttribute('id', counter);
            if (rs.rows.item(0).done == 0) li.className = 'item';
            else li.className = 'done';
            li.addEventListener("click", function (e) {
                if (e.target && e.target.matches("li.item")) {
                    ChangeDoneStatusto1(counter);
                    e.target.className = "done";
                } else {
                    //Cuando entra al li.done
                    ChangeDoneStatusto0(counter);
                    e.target.className = "item";
                }
            });
            li.appendChild(document.createTextNode(counter + ". " + candidate));
            ul.appendChild(li);
        });
    });
    
}

function changeName(available_name) {
    var wsnew_name = document.getElementById("ws_name").value;
    var update_wsID = window.location.search.split('=')[1];
    var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);
    if (available_name == 1) {
        db.transaction(function (tx) {
            tx.executeSql("UPDATE WORKSPACE SET name='" + wsnew_name + "' WHERE id=" + update_wsID);
            window.location.href = window.location.origin + "/main.html?email=" + localStorage.getItem("current_user");
        });
    }
    else {
        alert("Cambiar de nombre! Este ya está usado");
    }
}

function updateWS() {
    var wsnew_name = document.getElementById("ws_name").value;
    var update_wsID = window.location.search.split('=')[1];
    var available_name = 0;
    var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);
    db.transaction(function (tx) {
        var select = "SELECT * FROM WORKSPACE WHERE name='" + wsnew_name + "' AND id!=" + update_wsID;
        tx.executeSql(select, [], function (tr, rs) {
            if (rs.rows.length == 0) available_name = 1;
            changeName(available_name);
        });
    });
}

function saveWS() {
    var wsnew_name = document.getElementById("wsnew_name").value;
    var last_WSid = 0;
    var last_MLid = 0;
    var last_TDid = 0;
    var last_ULid = 0;
    var available_name = 0;
    var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);
    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM WORKSPACE WHERE name=?", [wsnew_name], function (tr, rs) {
            if (rs.rows.length == 0) available_name = 1;
        });
    });
    if (available_name == 1) {
        db.transaction(function (tx) {
            tx.executeSql("SELECT MAX(id) as newID FROM WORKSPACE", [], function (tr, rs) {
                last_WSid = rs.rows.item(0).newID + 1;
                console.log("WS " + last_WSid);
            });
        });
        db.transaction(function (tx) {
            tx.executeSql("SELECT MAX(id) as newID FROM MATERIALS", [], function (tr, rs) {
                last_MLid = rs.rows.item(0).newID + 1;
                console.log("ML " + last_MLid);
            });
        });
        db.transaction(function (tx) {
            tx.executeSql("SELECT MAX(id) as newID FROM TO_DO", [], function (tr, rs) {
                last_TDid = rs.rows.item(0).newID + 1;
                console.log("TD " + last_TDid);
            });
        });
        db.transaction(function (tx) {
            tx.executeSql("SELECT MAX(id) as newID FROM PARTICIPANTS", [], function (tr, rs) {
                last_ULid = rs.rows.item(0).newID + 1;
                console.log("UL " + last_ULid);
            });
        });

        db.transaction(function (tr) {
            tr.executeSql('INSERT INTO TO_DO (id, desc, parent_id, done, erased) VALUES (' + last_TDid + ', "' + wsnew_name + '", null, null, null)');
            tr.executeSql('INSERT INTO MATERIALS (id, name, parent_id, erased) VALUES (' + last_MLid + ', "' + wsnew_name + '", null, null)');
            tr.executeSql('INSERT INTO PARTICIPANTS (id, workspaceFK, userFK, active) VALUES (' + last_ULid + ', ' + last_WSid + ', ' + localStorage.getItem("current_user_id") + ', 1)');
            tr.executeSql('INSERT INTO WORKSPACE (id, name, materialListFK, toDoListFK, erased) VALUES (' + last_WSid + ', "' + wsnew_name + '", ' + last_MLid + ', ' + last_TDid + ', 0)');


            window.location.href = window.location.origin + "/edit_workspace.html?workspace=" + last_WSid;
        });
    }
    else {
        alert("Cambiar de nombre! Este ya está usado");
    }
}

function DeleteExtraWorkspace(update_wsID) {
    var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);

    db.transaction(function (tx) {
        tx.executeSql('UPDATE WORKSPACE SET erased = 1 WHERE id=' + update_wsID);
        window.location.href = window.location.origin + "/main.html?email=" + localStorage.getItem("current_user");
    });
}

function DeleteWorkspace() {
    var update_wsID = window.location.search.split('=')[1];
    var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);
  
    db.transaction(function (tx) {
        tx.executeSql('UPDATE WORKSPACE SET erased = 1 WHERE id=' + update_wsID);
        window.location.href = window.location.origin + "/main.html?email=" + localStorage.getItem("current_user");
    });
}

function ChangeActiveStatusto1(participant_ID) {
    var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);
    db.transaction(function (tx) {
        tx.executeSql('UPDATE PARTICIPANTS SET active=1 WHERE id=' + participant_ID);
    });
}

function ChangeActiveStatusto0(participant_ID) {
    var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);
    db.transaction(function (tx) {
        tx.executeSql('UPDATE PARTICIPANTS SET active=0 WHERE id=' + participant_ID);
    });
}

function AddBDParticipantsToList(id_User, active, participant_ID) {
    var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);
    db.transaction(function (tx) {
        var select = "SELECT * FROM USERS WHERE id=" + id_User;
        tx.executeSql(select, [], function (tr, rs) {
            var ul = document.getElementById("dynamic-list-participants");
            var candidate = rs.rows.item(0).email;
            var counter = participant_ID;
            var li = document.createElement("li");
            li.setAttribute('id', counter);
            if (active == 1) li.className = 'item';
            else li.className = 'done';
            li.addEventListener("click", function (e) {
                if (e.target && e.target.matches("li.item")) {
                    ChangeActiveStatusto0(counter);
                    e.target.className = "done";
                } else {
                    //Cuando entra al li.done
                    ChangeActiveStatusto1(counter);
                    e.target.className = "item";
                }
            });
            li.appendChild(document.createTextNode(counter + ". " + candidate));
            ul.appendChild(li);
        });
    });
}

function AddParticipantsToList() {
    var id_workspace = window.location.search.split('=')[1];
    var new_email = document.getElementById("participants_new").value;
    var last_ID = 0;
    var user_id = 0;
    var available = 0;
    var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);
    db.transaction(function (tx) {
        var select = "SELECT MAX(id) as max_id FROM PARTICIPANTS";
        tx.executeSql(select, [], function (tr, rs) {
            last_ID = rs.rows.item(0).max_id;
        });
    });
    db.transaction(function (tx) {
        var select = "SELECT * FROM PARTICIPANTS WHERE userFK= (SELECT id FROM USERS WHERE email='" + new_email + "') AND workspaceFK=" + id_workspace;
        console.log(select);
        tx.executeSql(select, [], function (tr, rs) {
            console.log(rs.rows);
            if (rs.rows.length > 0) {
                alert("Este usuario ya esta agregado");
            } else {
                available = 1;
            }
        });
    });
    db.transaction(function (tx) {
        var select = "SELECT * FROM USERS WHERE email='" + new_email + "'";
        console.log(select);
        tx.executeSql(select, [], function (tr, rs) {
            console.log(rs.rows);
            if (rs.rows.length == 0) {
                alert("Este usuario no existe");
            } else {
                user_id = rs.rows.item(0).id;
                if (available == 1) {
                    var ul = document.getElementById("dynamic-list-participants");
                    var candidate = new_email;
                    var counter = last_ID + 1;
                    var li = document.createElement("li");
                    console.log(available);
                    console.log('INSERT INTO PARTICIPANTS (id, workspaceFK, userFK, active) VALUES (' + counter + ', ' + id_workspace + ', ' + user_id + ', 1)');
                    tx.executeSql('INSERT INTO PARTICIPANTS (id, workspaceFK, userFK, active) VALUES (' + counter + ', ' + id_workspace + ', ' + user_id + ', 1)');

                    li.setAttribute('id', counter);
                    li.className = 'item';
                    li.addEventListener("click", function (e) {
                        if (e.target && e.target.matches("li.item")) {
                            ChangeActiveStatusto0(counter);
                            e.target.className = "done";
                        } else {
                            //Cuando entra al li.done
                            ChangeActiveStatusto1(counter);
                            e.target.className = "item";
                        }
                    });
                    li.appendChild(document.createTextNode(counter + ". " + candidate));
                    ul.appendChild(li);
                }
            }
        });
    });
}

function LessParticipantsToList() {
    var ul = document.getElementById("dynamic-list-participants");
    var candidate = document.getElementById("participants_new");
    var item = document.getElementById(candidate.value);
    var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);

    db.transaction(function (tx) {
        var select = "SELECT * FROM PARTICIPANTS WHERE id=" + candidate.value;
        tx.executeSql(select, [], function (tr, rs) {
            if (rs.rows.length > 0) {
                if (item) {
                    item.className = 'done';
                    tx.executeSql('UPDATE PARTICIPANTS SET active=0 WHERE id=' + candidate.value);
                }
            }
        });
    });
}

function AddBDAlerts() {
    var id_workspace = window.location.search.split('=')[1];
    var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);
    db.transaction(function (tx) {
        var select = "SELECT * FROM ALERT WHERE workspaceFK=" + id_workspace + " AND erased=0";
        console.log(select);
        tx.executeSql(select, [], function (tr, rs) {
            console.log(rs.rows);
            for (var i = 0; i < rs.rows.length; i++) {
                var project = rs.rows.item(i).projectFK;
                var ul = document.getElementById("dynamic-list-alerts-" + project);
                var candidate = rs.rows.item(i).desc;
                var counter = rs.rows.item(i).id;
                var li = document.createElement("li");
                li.setAttribute('id', counter);
                li.className = 'item';
                li.appendChild(document.createTextNode(counter + ". " + candidate));
                ul.appendChild(li);
            }
        });
    });
}

function LessAlertToList() {
    var candidate = document.getElementById("alerts_new");

    var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);
    db.transaction(function (tx) {
        var select = "SELECT * FROM ALERT WHERE id=" + candidate.value;
        tx.executeSql(select, [], function (tr, rs) {
            if (rs.rows.length > 0) {
                var ul = document.getElementById("dynamic-list-alerts-" + rs.rows.item(0).projectFK);
                var item = document.getElementById(candidate.value);
                if (ul) {
                    ul.removeChild(item);
                    db.transaction(function (tx) {
                        tx.executeSql('UPDATE ALERT SET erased=1 WHERE id=' + candidate.value);
                    });
                }
            }
        });
    });
}

function AddAlertToList() {
    var id_workspace = window.location.search.split('=')[1];
    var new_alert = document.getElementById("alerts_new").value;
    var last_ID = 0;
    var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);
    db.transaction(function (tx) {
        var select = "SELECT MAX(id) as max_id FROM ALERT";
        tx.executeSql(select, [], function (tr, rs) {
            last_ID = rs.rows.item(0).max_id;
        });
    });
    db.transaction(function (tx) {
        var project = document.getElementById("project_select").value;
        var ul = document.getElementById("dynamic-list-alerts-"+project);
        var candidate = new_alert;
        var counter = last_ID + 1;
        var li = document.createElement("li");
        console.log('INSERT INTO ALERT (id, desc, workspaceFK, projectFK, erased) VALUES (' + counter + ', "' + candidate + '", ' + id_workspace + ', ' + project + ', 0)');
        tx.executeSql('INSERT INTO ALERT (id, desc, workspaceFK, projectFK, erased) VALUES (' + counter + ', "' + candidate + '", ' + id_workspace + ', ' + project + ', 0)');
        li.setAttribute('id', counter);
        li.className = 'item';
        li.appendChild(document.createTextNode(counter + ". " + candidate));
        ul.appendChild(li);
    });
}

function AddExtraRFI(){
    var id_workspace = window.location.search.split('=')[1];
    window.location.href = window.location.origin + "/new_rfi.html?workspace=" + id_workspace;
}

function AddRFI() {
    var id_workspace = window.location.search.split('=')[1];
    var date = document.getElementById("rfi_date").value;
    var project = document.getElementById("project_select").value;
    var state = document.getElementById("rfi_state").value;
    var last_ID = 0;

    var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);
    db.transaction(function (tx) {
        var select = "SELECT MAX(id) as max_id FROM RFI";
        tx.executeSql(select, [], function (tr, rs) {
            last_ID = rs.rows.item(0).max_id + 1;
        });
    });
    db.transaction(function (tx) {
        console.log('INSERT INTO RFI (id, doc_url, workspaceFK, projectFK, state, created_date) VALUES (' + last_ID + ', "URL_EXTRA", ' + id_workspace + ', ' + project + ', "' + state +'", "' + date + '")');
        tx.executeSql('INSERT INTO RFI (id, doc_url, workspaceFK, projectFK, state, created_date) VALUES (' + last_ID + ', "URL_EXTRA", ' + id_workspace + ', ' + project + ', "' + state + '", "' + date + '")');

        window.location.href = window.location.origin + "/rfi.html?workspace=" + id_workspace;
    });
}

function AddProject() {
    var name = document.getElementById("project_name").value;
    var id_workspace = document.getElementById("workspace_select").value;
    var last_ID = 0;

    if (name) {
        var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);
        db.transaction(function (tx) {
            var select = "SELECT MAX(id) as max_id FROM PROJECT";
            tx.executeSql(select, [], function (tr, rs) {
                last_ID = rs.rows.item(0).max_id + 1;
            });
        });
        db.transaction(function (tx) {
            console.log('INSERT INTO PROJECT (id, name, workspaceFK, imageLocation, erased) VALUES (' + last_ID + ', "' + name + '", ' + id_workspace + ', "URL_EXTRA", 0)');
            tx.executeSql('INSERT INTO PROJECT (id, name, workspaceFK, imageLocation, erased) VALUES (' + last_ID + ', "' + name + '", ' + id_workspace + ', "URL_EXTRA", 0)');

            window.location.href = window.location.origin + "/project.html?workspace=" + id_workspace;
        });
    } else {
        alert("Write a name for the project");
    }
}

function AddDOC() {
    var id_workspace = window.location.search.split('=')[1];
    var date = document.getElementById("doc_date").value;
    var project = document.getElementById("project_select").value;
    var name = document.getElementById("doc_name").value;
    if (!name) {
        alert("Write a name for the new document");
    } else {
        var last_ID = 0;

        var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);
        db.transaction(function (tx) {
            var select = "SELECT MAX(id) as max_id FROM DOCS";
            tx.executeSql(select, [], function (tr, rs) {
                last_ID = rs.rows.item(0).max_id + 1;
            });
        });
        db.transaction(function (tx) {
            console.log('INSERT INTO DOCS (id, name, workspaceFK, projectFK, erased, created_date) VALUES (' + last_ID + ', "' + name + '", ' + id_workspace + ', ' + project + ', 0, "' + date + '")');
            tx.executeSql('INSERT INTO DOCS (id, name, workspaceFK, projectFK, erased, created_date) VALUES (' + last_ID + ', "' + name + '", ' + id_workspace + ', ' + project + ', 0, "' + date + '")');

            window.location.href = window.location.origin + "/doc.html?workspace=" + id_workspace;
        });
    }
}

function AddUser() {
    var id_workspace = window.location.search.split('=')[1];
    var name = document.getElementById("user_name").value;
    var lastname = document.getElementById("user_lastname").value;
    var email = document.getElementById("user_email").value;
    var password = document.getElementById("user_password").value;
    if (name && lastname && email && password) {
        var last_ID = 0;

        var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);
        db.transaction(function (tx) {
            var select = "SELECT MAX(id) as max_id FROM USERS";
            tx.executeSql(select, [], function (tr, rs) {
                last_ID = rs.rows.item(0).max_id + 1;
            });
        });
        db.transaction(function (tx) {
            console.log('INSERT INTO USERS (id, name, lastname, email, password) VALUES (' + last_ID + ', "' + name + '", "' + lastname + '", "' + email + '", "' + password + '")');
            tx.executeSql('INSERT INTO USERS (id, name, lastname, email, password) VALUES (' + last_ID + ', "' + name + '", "' + lastname + '", "' + email + '", "' + password + '")');

            window.location.href = window.location.origin + "/user.html?email=" + localStorage.getItem("current_user");
        });
    } else {
        alert("Fill all the fields");
    }
}

function AddExtraDOC() {
    var id_workspace = window.location.search.split('=')[1];
    window.location.href = window.location.origin + "/new_doc.html?workspace=" + id_workspace;
}

function AddExtraUser() {
    var id_workspace = window.location.search.split('=')[1];
    window.location.href = window.location.origin + "/new_user.html?email=" + localStorage.getItem("current_user");
}

function DeleteDOC(id) {
    var update_wsID = window.location.search.split('=')[1];
    var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);

    db.transaction(function (tx) {
        tx.executeSql('UPDATE DOCS SET erased = 1 WHERE id=' + id);
        location.reload();
    });
}

function DeleteUser(id) {
    var update_wsID = window.location.search.split('=')[1];
    var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);

    if (localStorage.getItem("current_user_id") == id) {
        alert("You can't delete yourself")
    } else {
        db.transaction(function (tx) {
            tx.executeSql('DELETE FROM USERS WHERE id=' + id);
            location.reload();
        });
    }
}

function onChangeSelect(id, status) {
    var id_workspace = window.location.search.split('=')[1];
    var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);
    db.transaction(function (tx) {
        tx.executeSql("UPDATE RFI SET state='" + status + "' WHERE id=" + id);
    });
}

function getSelectWorkpace(id) {
    var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);
    db.transaction(function (tx) {
        var select2 = 'SELECT * FROM WORKSPACE WHERE id=' + id;
        tx.executeSql(select2, [], function (tx, result) {
            if (result.rows.length > 0) {
                if (result.rows.item(0).erased != 1) {
                    var x = document.getElementById("workspace_select");
                    var option = document.createElement("option");
                    option.text = result.rows.item(0).name;
                    option.value = result.rows.item(0).id;
                    x.add(option);
                }
            }
        });
    });
}

function onLoadMain() {
    var email = window.location.search.split('=')[1];
    localStorage.setItem("current_user", email);
    document.getElementById("link_main").href = "./main.html?email=" + localStorage.getItem("current_user");
    document.getElementById("link_user").href = "./user.html?email=" + localStorage.getItem("current_user");
    //document.getElementById("link_users").href = "./new_participants.html?email=" + localStorage.getItem("current_user");
    var id_email = 0;
    var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);
    db.transaction(function (tr) {
        tr.executeSql('SELECT * FROM USERS WHERE EMAIL=? ', [email], function (tr, rs) {
            id_email = rs.rows.item(0).id;
            localStorage.setItem("current_user_id", id_email);
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

function onLoadAlert() {
    var id_workspace = window.location.search.split('=')[1];
    document.getElementById("link_main").href = "./main.html?email=" + localStorage.getItem("current_user");
    document.getElementById("link_participants").href = "./new_participants.html?workspace=" + id_workspace;
    document.getElementById("link_edit").href = "./edit_workspace.html?workspace=" + id_workspace;
    document.getElementById("link_alerts").href = "./alerts.html?workspace=" + id_workspace;
    document.getElementById("link_rfi").href = "./rfi.html?workspace=" + id_workspace;
    document.getElementById("link_docs").href = "./doc.html?workspace=" + id_workspace;
    var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);
    db.transaction(function (tx) {
        var select = "SELECT * FROM PROJECT WHERE workspaceFK=" + id_workspace;
        tx.executeSql(select, [], function (tr, rs) {
            for (var i = 0; i < rs.rows.length; i++) {
                var x = document.getElementById("project_select");
                var option = document.createElement("option");
                option.text = rs.rows.item(i).name;
                option.value = rs.rows.item(i).id;
                x.add(option);

                var ul = document.createElement("ul");
                var h3 = document.createElement("h3");
                var div = document.getElementById("uls-list");
                var id = "dynamic-list-alerts-" + rs.rows.item(i).id;
                h3.innerText = rs.rows.item(i).name + " alerts: ";
                ul.setAttribute('id', id);
                div.appendChild(h3);
                div.appendChild(ul);
            }
            AddBDAlerts();
        });
    });
}

function onLoadEdit() {
    var id_workspace = window.location.search.split('=')[1];
    document.getElementById("link_main").href = "./main.html?email=" + localStorage.getItem("current_user");
    document.getElementById("link_participants").href = "./new_participants.html?workspace=" + id_workspace;
    document.getElementById("link_edit").href = "./edit_workspace.html?workspace=" + id_workspace;
    document.getElementById("link_alerts").href = "./alerts.html?workspace=" + id_workspace;
    document.getElementById("link_rfi").href = "./rfi.html?workspace=" + id_workspace;
    document.getElementById("link_docs").href = "./doc.html?workspace=" + id_workspace;
    var id_todoList = 0;
    var id_materialList = 0;
    document.getElementById("link_main").href = "./main.html?email=" + localStorage.getItem("current_user");
    var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);
    db.transaction(function (tx) {
        var select = "SELECT * FROM WORKSPACE WHERE id=" + id_workspace;
        tx.executeSql(select, [], function (tr, rs) {
            document.getElementById('ws_name').value = rs.rows.item(0).name;
            id_todoList = rs.rows.item(0).toDoListFK;
            id_materialList = rs.rows.item(0).materialListFK;
        });
    });

    db.transaction(function (tx) {
        var select = "SELECT * FROM MATERIALS WHERE parent_id=" + id_materialList + " AND erased=0";
        tx.executeSql(select, [], function (tr, rs) {
            for (var i = 0; i < rs.rows.length; i++) {
                AddBDMaterial(rs.rows.item(i).id);
            }
        });
    });

    db.transaction(function (tx) {
        var select = "SELECT * FROM TO_DO WHERE parent_id=" + id_todoList + " AND erased=0";
        tx.executeSql(select, [], function (tr, rs) {
            for (var i = 0; i < rs.rows.length; i++) {
                AddBDToDo(rs.rows.item(i).id);
            }
        });
    });
}

function onLoadNew() {
    var id_workspace = window.location.search.split('=')[1];
    document.getElementById("link_main").href = "./main.html?email=" + localStorage.getItem("current_user");
    document.getElementById("link_user").href = "./user.html?email=" + localStorage.getItem("current_user");
}

function onLoadParticipants() {
    var id_workspace = window.location.search.split('=')[1];
    document.getElementById("link_main").href = "./main.html?email=" + localStorage.getItem("current_user");
    document.getElementById("link_participants").href = "./new_participants.html?workspace=" + id_workspace;
    document.getElementById("link_edit").href = "./edit_workspace.html?workspace=" + id_workspace;
    document.getElementById("link_alerts").href = "./alerts.html?workspace=" + id_workspace;
    document.getElementById("link_rfi").href = "./rfi.html?workspace=" + id_workspace;
    document.getElementById("link_docs").href = "./doc.html?workspace=" + id_workspace;
    var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);
    db.transaction(function (tx) {
        var select = "SELECT * FROM PARTICIPANTS WHERE workspaceFK=" + id_workspace;
        tx.executeSql(select, [], function (tr, rs) {
            for (var i = 0; i < rs.rows.length; i++) {
                AddBDParticipantsToList(rs.rows.item(i).userFK, rs.rows.item(i).active, rs.rows.item(i).id);
            }
        });
    });
}

function onLoadProject() {
    var id_workspace = window.location.search.split('=')[1];
    document.getElementById("link_main").href = "./main.html?email=" + localStorage.getItem("current_user");
    document.getElementById("link_participants").href = "./new_participants.html?workspace=" + id_workspace;
    document.getElementById("link_edit").href = "./edit_workspace.html?workspace=" + id_workspace;
    document.getElementById("link_alerts").href = "./alerts.html?workspace=" + id_workspace;
    document.getElementById("link_rfi").href = "./rfi.html?workspace=" + id_workspace;
    document.getElementById("link_docs").href = "./doc.html?workspace=" + id_workspace;
    var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);
    db.transaction(function (tx) {
        var select = "SELECT * FROM WORKSPACE WHERE id=" + id_workspace;
        tx.executeSql(select, [], function (tr, rs) {
            console.log(rs.rows);
            document.getElementById('current_site').innerHTML = rs.rows.item(0).name;
        });
    });
    db.transaction(function (tr) {
        var select = "SELECT * FROM PROJECT WHERE workspaceFK=" + id_workspace;
        tr.executeSql(select, [], function (tr, rs) {
            //console.log(rs.rows);
            for (var i = 0; i < rs.rows.length; i++) {
                //console.log(rs.rows.item(i).name);
                GetProjects(rs.rows.item(i).name, rs.rows.item(i).id);
            }
        });
    });
    db.transaction(function (tr) {
        var select = "SELECT * FROM DOCS WHERE workspaceFK=" + id_workspace + " AND erased=0";
        tr.executeSql(select, [], function (tr, rs) {
            for (var i = 0; i < rs.rows.length; i++) {
                var div = document.createElement('div');
                div.className = 'docs_item';
                div.innerHTML = '<a href=""> <img src="images/icon_doc.128.png" alt="Docs Icon"/> </a> <div class="doc_title"><h3>' + rs.rows.item(i).created_date + '</h3><h4>' + rs.rows.item(i).name + '</h4><a href="javascript:DeleteDOC(' + rs.rows.item(i).id + ');"><h4>eliminar</h4></a></div>';
                document.getElementById('docs_option').appendChild(div);
            }
        });
    });
}

function onLoadRFI() {
    var id_workspace = window.location.search.split('=')[1];
    document.getElementById("link_main").href = "./main.html?email=" + localStorage.getItem("current_user");
    document.getElementById("link_participants").href = "./new_participants.html?workspace=" + id_workspace;
    document.getElementById("link_edit").href = "./edit_workspace.html?workspace=" + id_workspace;
    document.getElementById("link_alerts").href = "./alerts.html?workspace=" + id_workspace;
    document.getElementById("link_rfi").href = "./rfi.html?workspace=" + id_workspace;
    document.getElementById("link_docs").href = "./doc.html?workspace=" + id_workspace;
    var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);
    db.transaction(function (tr) {
        var select = "SELECT * FROM RFI WHERE workspaceFK=" + id_workspace;
        tr.executeSql(select, [], function (tr, rs) {
            for (var i = 0; i < rs.rows.length; i++) {
                var div = document.createElement('div');
                div.className = 'rfis_item';
                div.innerHTML = '<a href="" + id_workspace"> <img src="images/icon_rfi.128.png" alt="Docs Icon"/> </a> <div class="rfi_title"><h3>' + rs.rows.item(i).created_date + '</h3><select id="rfi_state_' + rs.rows.item(i).id +'" onchange="onChangeSelect('+ rs.rows.item(i).id +', this.value)"><option value= "PENDIENTE" > PENDIENTE</option><option value="RESUELTO">RESUELTO</option><option value="DENEGADO">DENEGADO</option></select> </div>';
                document.getElementById('docs_option').appendChild(div);
                document.getElementById("rfi_state_" + rs.rows.item(i).id).value = rs.rows.item(i).state;
            }
        });
    });
}

function onLoadNewRFI() {
    var id_workspace = window.location.search.split('=')[1];
    document.getElementById("link_main").href = "./main.html?email=" + localStorage.getItem("current_user");
    document.getElementById("link_participants").href = "./new_participants.html?workspace=" + id_workspace;
    document.getElementById("link_edit").href = "./edit_workspace.html?workspace=" + id_workspace;
    document.getElementById("link_alerts").href = "./alerts.html?workspace=" + id_workspace;
    document.getElementById("link_rfi").href = "./rfi.html?workspace=" + id_workspace;
    document.getElementById("link_docs").href = "./doc.html?workspace=" + id_workspace;
    var d = new Date();
    var m = d.getMonth() + 1;
    document.getElementById("rfi_date").value = d.getDate() + "/" + m + "/" + d.getFullYear();

    var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);
    db.transaction(function (tx) {
        var select = "SELECT * FROM PROJECT WHERE workspaceFK=" + id_workspace;
        tx.executeSql(select, [], function (tr, rs) {
            for (var i = 0; i < rs.rows.length; i++) {
                var x = document.getElementById("project_select");
                var option = document.createElement("option");
                option.text = rs.rows.item(i).name;
                option.value = rs.rows.item(i).id;
                x.add(option);                
            }
        });
    });
}

function onLoadDoc() {
    var id_workspace = window.location.search.split('=')[1];
    document.getElementById("link_main").href = "./main.html?email=" + localStorage.getItem("current_user");
    document.getElementById("link_participants").href = "./new_participants.html?workspace=" + id_workspace;
    document.getElementById("link_edit").href = "./edit_workspace.html?workspace=" + id_workspace;
    document.getElementById("link_alerts").href = "./alerts.html?workspace=" + id_workspace;
    document.getElementById("link_rfi").href = "./rfi.html?workspace=" + id_workspace; 
    document.getElementById("link_docs").href = "./doc.html?workspace=" + id_workspace;
    var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);
    db.transaction(function (tr) {
        var select = "SELECT * FROM DOCS WHERE workspaceFK=" + id_workspace + " AND erased=0";
        tr.executeSql(select, [], function (tr, rs) {
            for (var i = 0; i < rs.rows.length; i++) {
                var div = document.createElement('div');
                div.className = 'rfis_item';
                div.innerHTML = '<a href="" + id_workspace"> <img src="images/icon_rfi.128.png" alt="Docs Icon"/> </a> <div class="doc_title"><h3>' + rs.rows.item(i).created_date + '</h3><h4>' + rs.rows.item(i).name + '</h4><a href="javascript:DeleteDOC(' + rs.rows.item(i).id + ');"><h4>eliminar</h4></a></div>';
                document.getElementById('docs_option').appendChild(div);
            }
        });
    });
}

function onLoadNewDOC() {
    var id_workspace = window.location.search.split('=')[1];
    document.getElementById("link_main").href = "./main.html?email=" + localStorage.getItem("current_user");
    document.getElementById("link_participants").href = "./new_participants.html?workspace=" + id_workspace;
    document.getElementById("link_edit").href = "./edit_workspace.html?workspace=" + id_workspace;
    document.getElementById("link_alerts").href = "./alerts.html?workspace=" + id_workspace;
    document.getElementById("link_rfi").href = "./rfi.html?workspace=" + id_workspace;
    document.getElementById("link_docs").href = "./doc.html?workspace=" + id_workspace;
    var d = new Date();
    var m = d.getMonth() + 1;
    document.getElementById("doc_date").value = d.getDate() + "/" + m + "/" + d.getFullYear();

    var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);
    db.transaction(function (tx) {
        var select = "SELECT * FROM PROJECT WHERE workspaceFK=" + id_workspace;
        tx.executeSql(select, [], function (tr, rs) {
            for (var i = 0; i < rs.rows.length; i++) {
                var x = document.getElementById("project_select");
                var option = document.createElement("option");
                option.text = rs.rows.item(i).name;
                option.value = rs.rows.item(i).id;
                x.add(option);
            }
        });
    });
}

function onLoadUsers() {
    var id_workspace = window.location.search.split('=')[1];
    document.getElementById("link_main").href = "./main.html?email=" + localStorage.getItem("current_user");
    document.getElementById("link_user").href = "./user.html?email=" + localStorage.getItem("current_user");
    var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);
    db.transaction(function (tr) {
        var select = "SELECT * FROM USERS";
        tr.executeSql(select, [], function (tr, rs) {
            for (var i = 0; i < rs.rows.length; i++) {
                var div = document.createElement('div');
                div.className = 'rfis_item';
                div.innerHTML = '<a href="" + id_workspace"> <img src="images/user_icon_128.png" alt="User Icon"/> </a> <div class="doc_title"><h3>' + rs.rows.item(i).name + ' ' + rs.rows.item(i).lastname + '</h3><h4>' + rs.rows.item(i).email + '</h4><a href="javascript:DeleteUser(' + rs.rows.item(i).id + ');"><h4>eliminar</h4></a></div>';
                document.getElementById('docs_option').appendChild(div);
            }
        });
    });
}

function onLoadNewUser() {
    var id_workspace = window.location.search.split('=')[1];
    document.getElementById("link_main").href = "./main.html?email=" + localStorage.getItem("current_user");
    document.getElementById("link_user").href = "./user.html?email=" + localStorage.getItem("current_user");
}

function onLoadNewProject() {
    var id_workspace = window.location.search.split('=')[1];
    document.getElementById("link_main").href = "./main.html?email=" + localStorage.getItem("current_user");
    document.getElementById("link_participants").href = "./new_participants.html?workspace=" + id_workspace;
    document.getElementById("link_edit").href = "./edit_workspace.html?workspace=" + id_workspace;
    document.getElementById("link_alerts").href = "./alerts.html?workspace=" + id_workspace;
    document.getElementById("link_rfi").href = "./rfi.html?workspace=" + id_workspace;
    document.getElementById("link_docs").href = "./doc.html?workspace=" + id_workspace;

    var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);
    db.transaction(function (tx) {
        var select = 'SELECT * FROM PARTICIPANTS WHERE userFK=' + localStorage.getItem("current_user_id") + ' AND active=1';
        tx.executeSql(select, [], function (tx, rs) {
            for (var i = 0; i < rs.rows.length; i++) {
                getSelectWorkpace(rs.rows.item(i).workspaceFK);
            }
        });
    });
}
