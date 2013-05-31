var xHRObjectLogin = new XMLHttpRequest();
var xHRObjectLogout = new XMLHttpRequest();
var xHRObjectChangeStatus = new XMLHttpRequest();
var xHRObjectLoggedInCheck = new XMLHttpRequest();
var xHRObjectGetActiveAccount = new XMLHttpRequest();

function login(){
    var inputUsername = document.getElementById("inputUsername").value;
    var inputPassword =  document.getElementById("inputPassword").value;
    
    var parameters = "Type=login"+"&Username="+inputUsername+"&Password="+inputPassword;
    xHRObjectLogin.open("POST", "LoginServlet", true);
    xHRObjectLogin.onreadystatechange = tryLogin;
    xHRObjectLogin.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xHRObjectLogin.send(parameters);
    
    return false;
}
function logout(){
    var parameters = "Type=logout";
    xHRObjectLogout.open("POST", "LoginServlet", true);
    xHRObjectLogout.onreadystatechange = tryLogout;
    xHRObjectLogout.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xHRObjectLogout.send(parameters);
    
    return false;
}
function changeStatus(status){
    var parameters = "Type=changeStatus"+"&Status="+status;
    xHRObjectChangeStatus.open("POST", "LoginServlet", true);
    xHRObjectChangeStatus.onreadystatechange = tryChangeStatus;
    xHRObjectChangeStatus.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xHRObjectChangeStatus.send(parameters);
    
    return false;
}
function tryLogin(){
    var loggedIn = false;
    if (xHRObjectLogin.readyState === 4) {
        if (xHRObjectLogin.status === 200) {
            var response = xHRObjectLogin.responseXML;
            loggedIn = response.getElementsByTagName("loggedIn")[0].textContent;
            loggedIn = cleanString(loggedIn);
            
            if(loggedIn === "false"){
                var errors = response.getElementsByTagName("errors")[0];
                
                var usernameAndPasswordError = errors.getElementsByTagName("usernameAndPassword")[0].textContent;
                usernameAndPasswordError = cleanString(usernameAndPasswordError);
                
                if(usernameAndPasswordError !== ""){
                    removeErrorMessage("password");
                    showErrorMessage("password",usernameAndPasswordError,"loginErrorMessage");
                }  
            }
            else{
                document.location.href = "";
            }
        }
    }
}
function checkLoggedIn(){
    var parameters = "Type=check";
    xHRObjectLoggedInCheck.open("POST", "LoginServlet", true);
    xHRObjectLoggedInCheck.onreadystatechange = processLoggedInCheck;
    xHRObjectLoggedInCheck.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xHRObjectLoggedInCheck.send(parameters);
    
    switch(document.location.pathname){
        case "/GTWA_Web/AddFriend.html":
            setTimeout("getPotentialFriend()",50);
            break;
        default:
            break;
    }
    
    return false;
}
function getActiveAccount(){
    var parameters = "Type=getActiveAccount";
    xHRObjectGetActiveAccount.open("POST", "LoginServlet", true);
    xHRObjectGetActiveAccount.onreadystatechange = processGetActiveAccount;
    xHRObjectGetActiveAccount.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xHRObjectGetActiveAccount.send(parameters);
    
    return false;
}
function tryLogout(){
    if (xHRObjectLogout.readyState === 4) {
        if (xHRObjectLogout.status === 200) {
            document.location.href = "";
        }
    }
}
function processGetActiveAccount(){
    if (xHRObjectGetActiveAccount.readyState === 4) {
        if (xHRObjectGetActiveAccount.status === 200) {
        }
    }
}
function processLoggedInCheck(){
    var loggedIn = false;
    if (xHRObjectLoggedInCheck.readyState === 4) {
        if (xHRObjectLoggedInCheck.status === 200) {
            var response = xHRObjectLoggedInCheck.responseXML;
            loggedIn = response.getElementsByTagName("loggedIn")[0].textContent;
            loggedIn = cleanString(loggedIn);
            
            if(loggedIn === "true"){
                var errors = response.getElementsByTagName("data")[0];
                
                var username = errors.getElementsByTagName("username")[0].textContent;
                username = cleanString(username);
                
                var status = errors.getElementsByTagName("status")[0].textContent;
                status = cleanString(status);
                
                var friends = new Array();
                var friendsNode = errors.getElementsByTagName("friends")[0];
                var friendNodes = friendsNode.childNodes;
                var j = 0;
                for(var i = 1; i<friendNodes.length;i+=2){
                    var nodes = friendNodes[i].childNodes;
                    friends[j] = new Array(cleanString(nodes[1].textContent) ,cleanString(nodes[3].textContent));
                    j++;
                }
                setLoggedIn(username,status,friends);
            }
            else{
                setLoggedOut();
            }
        }
    }
}
function tryChangeStatus(){
    if (xHRObjectChangeStatus.readyState === 4) {
        if (xHRObjectChangeStatus.status === 200) {
            document.location.href = "";
        }
    }
}
function setLoggedIn(username,status,friends){
    if(document.location.pathname === "/GTWA_Web/Login.html"){
        document.location.href = "Chat.html";
    }
    setLoggedInHtml(username, status,friends);
    
}
function setLoggedOut(){
    switch(document.location.pathname){
        case "/GTWA_Web/Login.html":
            break;
        default:
            document.location.href = "Login.html";
            break;
    }
    setLoggedOutHtml();
}



