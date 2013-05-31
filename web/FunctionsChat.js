function submitMessage(){
    
    var newP = document.createElement('p');
    newP.id = "you";
    
    var message = document.getElementById("message").value;
    var newTextNode = document.createTextNode("You : " + message);
    newP.appendChild(newTextNode);
    
    var chatField = document.getElementById("chatField");
    chatField.appendChild(newP);
    
    clearForm()
    
    return false;
}
function clearForm(){
    //?
}