import login from "./js/login.js"
import register from "./js/register.js"

var acitveForm = 1;
var i = 0;
var username = "";
if(username == ""){
    showForm();
}
else{
    document.getElementById("userForm").innerHTML = `<h1>Hello ${username}!</h1>`;
}

function showForm(){
    if(acitveForm == 1){
        login.showLogin();
        document.getElementById("changeForm").addEventListener("click", showForm);
        acitveForm = 2;
        i++;
    }
    else if(acitveForm == 2){
        register.showRegister();
        document.getElementById("changeForm").addEventListener("click", showForm);
        acitveForm = 1;
        i++;
    }
}