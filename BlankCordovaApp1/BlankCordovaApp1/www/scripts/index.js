// Si quiere una introducción sobre la plantilla En blanco, vea la siguiente documentación:
// http://go.microsoft.com/fwlink/?LinkID=397704
// Para depurar código al cargar la página en cordova-simulate o en dispositivos o emuladores Android: inicie la aplicación, establezca puntos de interrupción 
// y ejecute "window.location.reload()" en la Consola de JavaScript.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);
        db.transaction(populateDB, errorCB, successCB);
        db.transaction(populateDB_material, errorCB, successCB);
        db.transaction(populateDB_toDo, errorCB, successCB);
        db.transaction(populateDB_participants, errorCB, successCB);
        db.transaction(populateDB_workspace, errorCB, successCB);
    };

    function populateDB(tx) {
        tx.executeSql('DROP TABLE IF EXISTS USERS');
        tx.executeSql('CREATE TABLE IF NOT EXISTS USERS (id unique, name, lastname, email, password)');
        tx.executeSql('INSERT INTO USERS (id, name, lastname, email, password) VALUES (1, "User", "Test","test","123")');
        tx.executeSql('INSERT INTO USERS (id, name, lastname, email, password) VALUES (2, "User", "Test Extra","test-extra","123")');
    }
    function populateDB_material(tx) {
        //MATERIAL
        tx.executeSql('DROP TABLE IF EXISTS MATERIALS');
        tx.executeSql('CREATE TABLE IF NOT EXISTS MATERIALS (id unique, name, parent_id, erased)');
        tx.executeSql('INSERT INTO MATERIALS (id, name, parent_id, erased) VALUES (1, "WS_1", null, null)');
        tx.executeSql('INSERT INTO MATERIALS (id, name, parent_id, erased) VALUES (2, "WS_2", null, null)');
        tx.executeSql('INSERT INTO MATERIALS (id, name, parent_id, erased) VALUES (3, "WS_3", null, null)');
        tx.executeSql('INSERT INTO MATERIALS (id, name, parent_id, erased) VALUES (4, "WS_4", null, null)');
        tx.executeSql('INSERT INTO MATERIALS (id, name, parent_id, erased) VALUES (5, "material A", 1, 0)');
        tx.executeSql('INSERT INTO MATERIALS (id, name, parent_id, erased) VALUES (6, "material B", 1, 0)');
        tx.executeSql('INSERT INTO MATERIALS (id, name, parent_id, erased) VALUES (7, "material C", 2, 0)');
        tx.executeSql('INSERT INTO MATERIALS (id, name, parent_id, erased) VALUES (8, "material D", 2, 0)');
        tx.executeSql('INSERT INTO MATERIALS (id, name, parent_id, erased) VALUES (9, "material E", 3, 0)');
        tx.executeSql('INSERT INTO MATERIALS (id, name, parent_id, erased) VALUES (10, "material F", 4, 0)');
        tx.executeSql('INSERT INTO MATERIALS (id, name, parent_id, erased) VALUES (11, "material G", 4, 0)');
    }

    function populateDB_toDo(tx) {
        //TO DO
        tx.executeSql('DROP TABLE IF EXISTS TO_DO');
        tx.executeSql('CREATE TABLE IF NOT EXISTS TO_DO (id unique, desc, parent_id, done)');
        tx.executeSql('INSERT INTO TO_DO (id, desc, parent_id, done) VALUES (1, "WS_1", null, null)');
        tx.executeSql('INSERT INTO TO_DO (id, desc, parent_id, done) VALUES (2, "WS_2", null, null)');
        tx.executeSql('INSERT INTO TO_DO (id, desc, parent_id, done) VALUES (3, "WS_3", null, null)');
        tx.executeSql('INSERT INTO TO_DO (id, desc, parent_id, done) VALUES (4, "WS_4", null, null)');
        tx.executeSql('INSERT INTO TO_DO (id, desc, parent_id, done) VALUES (5, "to do A", 1, 0)');
        tx.executeSql('INSERT INTO TO_DO (id, desc, parent_id, done) VALUES (6, "to do B", 1, 1)');
        tx.executeSql('INSERT INTO TO_DO (id, desc, parent_id, done) VALUES (7, "to do C", 2, 1)');
        tx.executeSql('INSERT INTO TO_DO (id, desc, parent_id, done) VALUES (8, "to do D", 2, 0)');
        tx.executeSql('INSERT INTO TO_DO (id, desc, parent_id, done) VALUES (9, "to do E", 3, 0)');
        tx.executeSql('INSERT INTO TO_DO (id, desc, parent_id, done) VALUES (10, "to do F", 4, 1)');
        tx.executeSql('INSERT INTO TO_DO (id, desc, parent_id, done) VALUES (11, "to do G", 4, 1)');
    }

    function populateDB_participants(tx) {
        //PARTICIPANTS
        tx.executeSql('DROP TABLE IF EXISTS PARTICIPANTS');
        tx.executeSql('CREATE TABLE IF NOT EXISTS PARTICIPANTS (id unique, workspaceFK, userFK, active)');
        tx.executeSql('INSERT INTO PARTICIPANTS (id, workspaceFK, userFK, active) VALUES (1, 1, 1, 1)');
        tx.executeSql('INSERT INTO PARTICIPANTS (id, workspaceFK, userFK, active) VALUES (2, 2, 1, 1)');
        tx.executeSql('INSERT INTO PARTICIPANTS (id, workspaceFK, userFK, active) VALUES (3, 2, 2, 1)');
        tx.executeSql('INSERT INTO PARTICIPANTS (id, workspaceFK, userFK, active) VALUES (4, 3, 1, 1)');
        tx.executeSql('INSERT INTO PARTICIPANTS (id, workspaceFK, userFK, active) VALUES (5, 3, 2, 1)');
        tx.executeSql('INSERT INTO PARTICIPANTS (id, workspaceFK, userFK, active) VALUES (6, 4, 2, 1)');
    }
    function populateDB_workspace(tx) {
        //WORKSPACE
        tx.executeSql('DROP TABLE IF EXISTS WORKSPACE');
        tx.executeSql('CREATE TABLE IF NOT EXISTS WORKSPACE (id unique, name, materialListFK, toDoListFK, userListFK)');
        tx.executeSql('INSERT INTO WORKSPACE (id, name, materialListFK, toDoListFK, userListFK) VALUES (1, "WS_1", 1, 1, 1)');
        tx.executeSql('INSERT INTO WORKSPACE (id, name, materialListFK, toDoListFK, userListFK) VALUES (2, "WS_2", 2, 2, 2)');
        tx.executeSql('INSERT INTO WORKSPACE (id, name, materialListFK, toDoListFK, userListFK) VALUES (3, "WS_3", 3, 3, 3)');
        tx.executeSql('INSERT INTO WORKSPACE (id, name, materialListFK, toDoListFK, userListFK) VALUES (4, "WS_4", 4, 4, 4)');
    }


    // Transaction error callback
    //
    function errorCB(tx, err) {
        alert("Error processing SQL: " + err);
    }
    
    // Transaction success callback
    //
    function successCB() {
    }

    
})();

// PERSONALIZE

//CHECK FOR USER
function validateLoginForm() {
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value;
    var alerta_username = document.getElementById("username_alert");
    var alerta_password = document.getElementById("password_alert");
    var userpass_alert = document.getElementById("userpass_alert");

    if (username == "") {
        alerta_username.setAttribute('style', 'display:block;');
    } else {
        alerta_username.setAttribute('style', 'display:none;');
        if (password == "") {
            alerta_password.setAttribute('style', 'display:block;');
        } else {
            alerta_password.setAttribute('style', 'display:none;');
            var db = window.openDatabase("Database", "1.0", "Zairon_db062018", 200000);
            db.transaction(function (tr) {
                tr.executeSql('SELECT EMAIL, PASSWORD FROM USERS WHERE EMAIL=?', [username], function (tr, rs) {
                    if (rs.rows.length > 0) {
                        //IF USERNAME AND PASSWORD MATCH
                        if (username == rs.rows.item(0).email && password == rs.rows.item(0).password) {
                            window.location.href = window.location.origin + "/main.html?email=" + rs.rows.item(0).email;
                        } else {
                            userpass_alert.setAttribute('style', 'display:block;');
                        }
                    } else {
                        userpass_alert.setAttribute('style', 'display:block;');
                    }
                });
            });
        }
    }   
    if (password == "") {
        alerta_password.setAttribute('style', 'display:block;');
    }     
}



document.addEventListener('keypress', function (e) { 
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
        validateLoginForm();
    }
});