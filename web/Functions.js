var cObject = new XMLHttpRequest();

function submitMessage(){
    
    var newP = document.createElement('p');
    newP.id = "you";
    
    var message = document.getElementById("message").value;
    var newTextNode = document.createTextNode("You : " + message);
    newP.appendChild(newTextNode);
    
    var chatField = document.getElementById("chatField");
    chatField.appendChild(newP);
    
    return false;
}
function getOnlineStatus(){
    cObject.open("GET", "LoginManageController", true);
    cObject.onreadystatechange = getStatus;
    cObject.send(null);
}
function getStatus(){
    if(cObject.readyState == 4){
        if(cObject.status == 200){
            var response = cObject.responseText;
            
            var statusDiv = document.getElementById("LoginBox");
            var statusPara = statusDiv.childNodes[3];
            if(statusPara == null){
                statusPara = document.createElement('p');
                statusPara.id = "OnlineStatus";

                var statusText = document.createTextNode(response);
                statusPara.appendChild(statusText);
                statusDiv.appendChild(statusPara);
            }
            else{
                var statusText = document.createTextNode(response);
                statusPara.removeChild(statusPara.childNodes[0]);
                statusPara.appendChild(statusText);
                
            }
        }
    }
}
function getFriends(){
    cObject.open("GET", "FriendsController", true);
    cObject.onreadystatechange = getFriends;
    cObject.send(null);
}
function getFriendsTable(){
     if(cObject.readyState == 4){
        if(cObject.status == 200){
            var serverResponse = xHROBject.responseXML;
            var friendsXML = serverResponse.getElementsByTagName("friend")
            var naam = friendsXML[0].textContent;
            
            var friendsDiv = document.getElementById("friends");
            var friendsTable = friendsDiv.childNodes[0];
            
            if(friendsTable != null){
                friendsDiv.removeChild(friendsDiv.removeChild[0]);
            }
                friendsTable = document.createElement('table');
                friendsTable.id = "friendsTable";
                
                var friendHeader1 = "Voornaam";
                var friendHeader2 = "Option";
                var friendsTableHeaders = document.createElement('th');
                friendsTableHeaders.appendChild(friendHeader1).appendChild(friendsHeader2);
                
                friendsTable.appendChild(friendsTableHeaders);
                
                for(var i = 0; i < 6;i++){
                    var friendsTableRow = document.createElement('tr');
                    
                    var friendsTableRowItem1 = document.createElement('td');
                    friendsTableRowItem1.appendChild(document.createTextNode(friendsXML[i].textContent));
                    var friendsTableRowItem2 = document.createElement('td');
                    friendsTableRowItem2.appendChild(document.createTextNode("BUTTON"));
                    
                    friendsTableRow.appendChild(friendsTableRowItem1).append(friendsTableRowItem2);
                    
                    friendsTable.appendChild(friendsTableRow);
 
                }
                
                friendsTable.appendChild(friendsTableHeaders + friendsTableRows);
                friendsDiv.appendChild(friendsTable);
                

        }
     }
}


