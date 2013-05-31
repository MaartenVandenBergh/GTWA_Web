function showErrorMessage(elementId,errorMessage, messageId){
    var errorDiv = document.createElement("div");
    errorDiv.setAttribute("class","alert alert-error");
    errorDiv.setAttribute("id",messageId);
    
    var errorTextNode = document.createTextNode("Error: " + errorMessage);
    errorDiv.appendChild(errorTextNode);
    
    var div = document.getElementById(elementId);
    div.appendChild(errorDiv);
}
function showSuccessMessage(elementId,successMessage,messageId){
    var successDiv = document.createElement("div");
    successDiv.setAttribute("class","alert alert-success");
    successDiv.setAttribute("id",messageId);
    
    var successTextNode = document.createTextNode("Succes: " + successMessage);
    successDiv.appendChild(successTextNode);
    
    var div = document.getElementById(elementId);
    div.appendChild(successDiv);
}
function removeErrorMessage(elementId){
    var div = document.getElementById(elementId);
    var nodeList = div.childNodes;
    var node = nodeList.item(nodeList.length-1);
    div.removeChild(node);
}
function cleanString(string){
    return string.replace(/(\r\n|\n|\r)/gm,"");
}
function removeChildrenFromElement(elementId){
    var div = document.getElementById(elementId);
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}
function addButton(text,onclick, parentId){
    var loginButton = document.createElement("button");
    loginButton.setAttribute("class", "btn");
    loginButton.setAttribute("type", "button");
    loginButton.setAttribute("class", "btn");
    loginButton.setAttribute("onclick", onclick);
    
    var loginButtonText = document.createTextNode(text);
    loginButton.appendChild(loginButtonText);
    
    var div = document.getElementById(parentId);
    div.appendChild(loginButton);
}
function createTable(tableData){
    var table = document.createElement("table");
    
    //Headers
    var thead = document.createElement("thead");
    table.appendChild(thead);
    
        var trh = document.createElement("tr");
        thead.appendChild(trh);

            for(var i=0;i<tableData[0].length;i++){
                var th = document.createElement("th");
                trh.appendChild(th);

                var thTEXT = document.createTextNode(tableData[0][i]);
                th.appendChild(thTEXT);
            }
    //Body
    var tbody = document.createElement("tbody");
    table.appendChild(tbody);
    
        var trd = document.createElement("tr");
        tbody.appendChild(trd);
        
            for(var i = 0;i<tableData[1].length;i++){
                var td = document.createElement("td");
                trd.appendChild(td);

                var tdTEXT = document.createTextNode(tableData[1][i]);
                td.appendChild(tdTEXT);
            }
    return table;
}