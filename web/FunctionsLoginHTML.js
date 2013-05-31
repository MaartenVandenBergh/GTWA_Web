function setLoggedInHtml(username,status,friends){
    removeChildrenFromElement("headerControls");
    
    fillHeaderContols(username, status, friends);
    
}
function setLoggedOutHtml(){
    removeChildrenFromElement("headerControls");
    addButton("Login","document.location.href='Login.html'", "headerControls");
    addButton("Registrate","document.location.href='Registration.html'", "headerControls");
}
function createFriendListItem(username,status){
    var li = document.createElement("li");
    
    var a = document.createElement("a");
    a.setAttribute("tabindex", "-1");
    a.setAttribute("href","");
    
    //MasterHeaderControlsFriendListItem
    var MasterHeaderControlsFriendListItem = document.createElement("div");
    MasterHeaderControlsFriendListItem.setAttribute("class", "MasterHeaderControlsFriendListItem");
    MasterHeaderControlsFriendListItem.setAttribute("id", username);
    
    //MasterHeaderControlsFriendListItemText
    var MasterHeaderControlsFriendListItemText = document.createElement("div");
    MasterHeaderControlsFriendListItemText.setAttribute("class","MasterHeaderControlsFriendListItemText");
    
    var MasterHeaderControlsFriendListItemTextTEXT = document.createTextNode(username);
    MasterHeaderControlsFriendListItemText.appendChild(MasterHeaderControlsFriendListItemTextTEXT);
    
    MasterHeaderControlsFriendListItem.appendChild(MasterHeaderControlsFriendListItemText);
    
    //Span
    var span = document.createElement("span"); 
    
    if(status === "ONLINE"){
        var spanTEXT = document.createTextNode("Online");
        span.setAttribute("class", "badge badge-success");
        span.appendChild(spanTEXT);
    }
    else if(status === "AWAY"){
        var spanTEXT = document.createTextNode("Away");
        span.setAttribute("class", "badge badge-warning");
        span.appendChild(spanTEXT);
    }
    else if(status === "BUSY"){
        var spanTEXT = document.createTextNode("Busy");
        span.setAttribute("class", "badge badge-important");
        span.appendChild(spanTEXT);
    }
    else if(status === "OFFLINE"){
        var spanTEXT = document.createTextNode("Offline");
        span.setAttribute("class", "badge");
        span.appendChild(spanTEXT);
    }
    MasterHeaderControlsFriendListItem.appendChild(span);
    
    a.appendChild(MasterHeaderControlsFriendListItem);
    li.appendChild(a);
    
    return li;
}
function fillHeaderContols(username,status,friends){
    var div = document.getElementById("headerControls");
    div.appendChild(createMasterHeaderControlsFriendList(friends));
    div.appendChild(createMasterHeaderControlsUser(username,status));
}
function createMasterHeaderControlsFriendList(friends){
    var masterHeaderControlsFriendList = document.createElement("div");
    masterHeaderControlsFriendList.setAttribute("class", "btn-group masterHeaderControlsFriendList");
    
    var link = document.createElement("a");
    link.setAttribute("class", "btn dropdown-toggle");
    link.setAttribute("data-toggle", "dropdown");
    link.setAttribute("href", "");
    
    var masterHeaderControlsFriendListButtonTEXT = document.createTextNode("Friends");
    link.appendChild(masterHeaderControlsFriendListButtonTEXT);
    
    masterHeaderControlsFriendList.appendChild(link);
    
    var ul = document.createElement("ul");
    ul.setAttribute("class", "dropdown-menu");
    
    for(var i = 0;i<friends.length;i++){
        ul.appendChild(createFriendListItem(friends[i][0],friends[i][1]));
    }
    if(friends.length === 0){
        li = document.createElement("li");
    
        var p = document.createElement("p");
        p.setAttribute("class","muted friendListItemWhenEmpty");

        var pTEXT = document.createTextNode("empty");
        p.appendChild(pTEXT);

        li.appendChild(p);

        ul.appendChild(li);
    }
    
    var li = document.createElement("li");
    li.setAttribute("class", "divider");
    
    ul.appendChild(li);
    
    li = document.createElement("li");
    
    var a = document.createElement("a");
    a.setAttribute("class", "text");
    a.setAttribute("href","AddFriend.html");
    
    var aTEXT = document.createTextNode("Add friend");
    a.appendChild(aTEXT);
    
    li.appendChild(a);
    
    ul.appendChild(li);
    
    masterHeaderControlsFriendList.appendChild(ul);
    
    return masterHeaderControlsFriendList;
}
function createMasterHeaderControlsUser(username, status){
    var masterHeaderControlsUser = document.createElement("div");
    masterHeaderControlsUser.setAttribute("class", "btn-group masterHeaderControlsUser");
    
    var link = document.createElement("a");
    link.setAttribute("class", "btn dropdown-toggle");
    link.setAttribute("data-toggle", "dropdown");
    link.setAttribute("href", "");
    
    var masterHeaderControlsUserText = document.createElement("div");
    masterHeaderControlsUserText.setAttribute("class", "masterHeaderControlsUserText");
    
    var masterHeaderControlsUserTextTEXT = document.createTextNode(username);
    masterHeaderControlsUserText.appendChild(masterHeaderControlsUserTextTEXT);
    
    link.appendChild(masterHeaderControlsUserText);
    
    var span = document.createElement("span");
    span.setAttribute("class", "badge badge-success");

    if(status === "ONLINE"){
        var spanTEXT = document.createTextNode("Online");
        span.setAttribute("class", "badge badge-success");
        span.appendChild(spanTEXT);
    }
    else if(status === "AWAY"){
        var spanTEXT = document.createTextNode("Away");
        span.setAttribute("class", "badge badge-warning");
        span.appendChild(spanTEXT);
    }
    else if(status === "BUSY"){
        var spanTEXT = document.createTextNode("Busy");
        span.setAttribute("class", "badge badge-important");
        span.appendChild(spanTEXT);
    }
    else if(status === "OFFLINE"){
        var spanTEXT = document.createTextNode("Offline");
        span.setAttribute("class", "badge");
        span.appendChild(spanTEXT);
    }
    
    link.appendChild(span);
    
    masterHeaderControlsUser.appendChild(link);
    
    var ul = document.createElement("ul");
    ul.setAttribute("class", "dropdown-menu masterHeaderControlsUserList");
    
    ul.appendChild(createStatusItem("Online"));
    ul.appendChild(createStatusItem("Away"));
    ul.appendChild(createStatusItem("Busy"));
    ul.appendChild(createStatusItem("Offline"));
    
    var li = document.createElement("li");
    li.setAttribute("class", "divider");
    
    ul.appendChild(li);
    
    li = document.createElement("li");
    
    var a = document.createElement("a");
    a.setAttribute("class", "text");
    a.setAttribute("onclick", "logout();");
    
    var aTEXT = document.createTextNode("Logout");
    a.appendChild(aTEXT);
    
    li.appendChild(a);
    
    ul.appendChild(li);
    
    masterHeaderControlsUser.appendChild(ul);
    
    return masterHeaderControlsUser;
}
function createStatusItem(status){
    var li = document.createElement("li");
    
    var a = document.createElement("a");
    a.setAttribute("tabindex","-1");
    
    var span = document.createElement("span");
    if(status==="Online"){
        span.setAttribute("class", "label label-success");
        a.setAttribute("onclick","changeStatus('ONLINE');");
    }
    if(status==="Away"){
        span.setAttribute("class", "label label-warning");
        a.setAttribute("onclick","changeStatus('AWAY');");
    }
    if(status==="Busy"){
        span.setAttribute("class", "label label-important");
        a.setAttribute("onclick","changeStatus('BUSY');");
    }
    if(status==="Offline"){
        span.setAttribute("class", "label");
        a.setAttribute("onclick","changeStatus('OFFLINE');");
    } 
    
    var spanTEXT = document.createTextNode(status);
    span.appendChild(spanTEXT);
    
    a.appendChild(span);
    li.appendChild(a);
    
    return li;
}