function fillAccountList(potFriends){
    var div = document.getElementById("AccountList");
    for(var i = 0;i<potFriends.length;i++){
        div.appendChild(createAccountListitem(potFriends[i]));
    }
}
function createAccountListitem(friend){
    //AccountListItem
    var AccountListItem = document.createElement("div");
    AccountListItem.setAttribute("class", "AccountListItem");
    
    AccountListItem.appendChild(createAccountListItemInfo(friend));
    AccountListItem.appendChild(createAccountListItemCheckBoxContainer(friend[0]));
    
    return AccountListItem;
}
function createAccountListItemInfo(friend){
    var AccountListItemInfo = document.createElement("div");
    AccountListItemInfo.setAttribute("class", "AccountListItemInfo");
    
        var AccountListItemInfoUsernameContainer = document.createElement("div");
        AccountListItemInfoUsernameContainer.setAttribute("class","AccountListItemInfoUsernameContainer");
        
    AccountListItemInfo.appendChild(AccountListItemInfoUsernameContainer);

            var AccountListItemInfoUsername = document.createElement("div");
            AccountListItemInfoUsername.setAttribute("class","AccountListItemInfoUsername");
            
        AccountListItemInfoUsernameContainer.appendChild(AccountListItemInfoUsername);
            
            var AccountListItemInfoUsernameTEXT = document.createTextNode(friend[0]);
            AccountListItemInfoUsername.appendChild(AccountListItemInfoUsernameTEXT);
        
        var tableData = new Array();
        tableData[0] = new Array("Surname","Name", "Date of birth","Country");
        tableData[1] = new Array(friend[1],friend[2],friend[3],friend[4]);
        
        var table = createTable(tableData);
        table.setAttribute("class", "AccountListItemInfoTable");
        
    AccountListItemInfo.appendChild(table);
    
    return AccountListItemInfo;
}
function createAccountListItemCheckBoxContainer(username){
    var AccountListItemCheckBoxContainer = document.createElement("div");
    AccountListItemCheckBoxContainer.setAttribute("class","AccountListItemCheckBoxContainer");
    
    var label = document.createElement("label");
    label.setAttribute("class", "checkbox AccountListItemCheckBoxLabel");
    
    AccountListItemCheckBoxContainer.appendChild(label);
    
    var AccountListItemCheckBox = document.createElement("input");
    AccountListItemCheckBox.setAttribute("class","AccountListItemCheckBox");
    AccountListItemCheckBox.setAttribute("type","checkbox");
    AccountListItemCheckBox.setAttribute("value",username);
    
    label.appendChild(AccountListItemCheckBox);
    
    return AccountListItemCheckBoxContainer;
}