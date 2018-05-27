// Si quiere una introducción sobre la plantilla En blanco, vea la siguiente documentación:
// http://go.microsoft.com/fwlink/?LinkID=397704
// Para depurar código al cargar la página en cordova-simulate o en dispositivos o emuladores Android: inicie la aplicación, establezca puntos de interrupción 
// y ejecute "window.location.reload()" en la Consola de JavaScript.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        /*// Controlar la pausa de Cordova y reanudar eventos
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova se ha cargado. Haga aquí las inicializaciones que necesiten Cordova.
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');*/
    };

    function onPause() {
        // TODO: esta aplicación se ha suspendido. Guarde el estado de la aplicación aquí.
    };

    function onResume() {
        // TODO: esta aplicación se ha reactivado. Restaure el estado de la aplicación aquí.
    };
})();

// PERSONALIZE
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

            //IF USERNAME AND PASSWORD MATCH
            if (username == "test" && password == "123") {
                window.location.href = window.location.origin + "/main.html";
            } else {
                userpass_alert.setAttribute('style', 'display:block;');
            }
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