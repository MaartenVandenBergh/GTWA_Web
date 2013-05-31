var xHRObject = new XMLHttpRequest();

function registrate(){
    var inputUsername = document.getElementById("inputUsername").value;
    var inputPassword =  document.getElementById("inputPassword").value;
    var inputRepeatPassword = document.getElementById("inputRepeatPassword").value;
    var inputName = document.getElementById("inputName").value;
    var inputSurname = document.getElementById("inputSurname").value;
    var inputEmail = document.getElementById("inputEmail").value;   
    
    var parameters = "Username="+inputUsername+"&Password="+inputPassword+"&RepeatPassword="+inputRepeatPassword+"&Name="+inputName+"&Surname="+inputSurname+"&Email="+inputEmail;
    
    xHRObject.open("POST", "RegistrationServlet", true);
    xHRObject.onreadystatechange = tryRegistration;
    xHRObject.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xHRObject.send(parameters);

    return false;
}
function tryRegistration(){
    var registrated = false;
    if (xHRObject.readyState === 4) {
        if (xHRObject.status === 200) {
            var response = xHRObject.responseXML;
            
            registrated = response.getElementsByTagName("registrated")[0].textContent;
            registrated = cleanString(registrated);

            if(registrated === "false"){
                var errors = response.getElementsByTagName("errors")[0];

                var usernameError = errors.getElementsByTagName("username")[0].textContent;
                usernameError = cleanString(usernameError);
                var repeatPasswordError = errors.getElementsByTagName("repeatPassword")[0].textContent;
                repeatPasswordError = cleanString(repeatPasswordError);
                var emailError = errors.getElementsByTagName("email")[0].textContent;
                emailError = cleanString(emailError);

                if(!usernameError === ""){
                    removeErrorMessage("username");
                    showErrorMessage("username",usernameError);
                }   
                if(!repeatPasswordError === ""){
                    removeErrorMessage("repeatPassword");
                    showErrorMessage("repeatPassword",repeatPasswordError);
                } 
                if(!emailError === ""){
                    removeErrorMessage("email");
                    showErrorMessage("email",emailError);
                }  
            }
            else{
                document.location.href = "Login.html";
            }
        }
    }
}