var xHRObjectGetPotentialFriend = new XMLHttpRequest();
var xHRObjectAddFriends = new XMLHttpRequest();

function loadPageAddFriend(){
     checkLoggedIn();
     getPotentialFriend();
}
function getPotentialFriend(){
    var parameters = "Type=getPotentialFriends";
    xHRObjectGetPotentialFriend.open("POST", "FriendsServlet", true);
    xHRObjectGetPotentialFriend.onreadystatechange = processPotentialFriends;
    xHRObjectGetPotentialFriend.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xHRObjectGetPotentialFriend.send(parameters);
    
    return false;
}
function processPotentialFriends(){
    if (xHRObjectGetPotentialFriend.readyState === 4) {
        if (xHRObjectGetPotentialFriend.status === 200) {
            var response = xHRObjectGetPotentialFriend.responseXML;
            var potFriends = new Array();
            var potFriendsNode = response.getElementsByTagName("potentialFriends")[0];
            var potFriendNodes = potFriendsNode.childNodes;
            var j = 0;
            for(var i = 1; i<potFriendNodes.length;i+=2){
                potFriends[j] = new Array(cleanString(potFriendNodes[i].childNodes[1].textContent) ,
                                            cleanString(potFriendNodes[i].childNodes[3].textContent),
                                            cleanString(potFriendNodes[i].childNodes[5].textContent),
                                            cleanString(potFriendNodes[i].childNodes[7].textContent),
                                            cleanString(potFriendNodes[i].childNodes[9].textContent));
                j++;
            }
            fillAccountList(potFriends);
        }
    }
}
function addFriends(){
    var checkboxes = document.getElementsByClassName("AccountListItemCheckBox");
    var friends = new Array();
    var j = 0;
    for(var i =0;i<checkboxes.length;i++){
        if(checkboxes[i].checked){
            friends[j] = checkboxes[i].value;
            j++;
        }
    }
    var parameters = "Type=addFriends"+"&Friends="+friends;
    xHRObjectAddFriends.open("POST", "FriendsServlet", true);
    xHRObjectAddFriends.onreadystatechange = tryAddFriends;
    xHRObjectAddFriends.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xHRObjectAddFriends.send(parameters);
    
    return false;
}
function tryAddFriends(){
    var added = false;
    if (xHRObjectAddFriends.readyState === 4) {
        if (xHRObjectAddFriends.status === 200) {
            getActiveAccount();
            var response = xHRObjectAddFriends.responseXML;
            added = response.getElementsByTagName("added")[0].textContent;
            added = cleanString(added);
            
            if(added === "true"){
                removeChildrenFromElement("AccountList");
                checkLoggedIn();
                
                removeChildrenFromElement("AddFriendMessage");
                showSuccessMessage("AddFriendMessage","Friends have been added","addFriendMessage");
            }
        }
    }
}