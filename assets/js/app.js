"use strict";

function checkToken() {
    if (sessionStorage["access_token"] == undefined) {
        console.log("Token does not exist");
        document.getElementById("modal-message").innerHTML = "You are not logged in";
        $('#exampleModal').modal('show');
        setTimeout(function () {
            window.location.href = "/login.html";
        }, 2000);
    }
};

function logout() {
    sessionStorage.removeItem("access_token");
    document.getElementById("modal-message").innerHTML = "Logging out";
    $('#exampleModal').modal('show')
    setTimeout(function () {
        window.location.href = "/login.html";
    }, 1000);
};

$(document).ready(function () {
    checkToken();
});