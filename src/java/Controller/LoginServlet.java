/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package Controller;

import db.facades.interfaces.remotes.DBFacadeRemote;
import domain.entities.Account;
import domain.enums.Status;
import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Maarten
 */
@WebServlet(name = "LoginServlet", urlPatterns = {"/LoginServlet"})
public class LoginServlet extends HttpServlet {
    
    private DBFacadeRemote db;
    private Account activeAccount;
    
    protected String processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        if(db == null){
            initialiseDatabaseConnection();
        }
        if(activeAccount != null){
            activeAccount = db.findAccount(activeAccount.getUsername());
        }
        HttpSession sess;
        if(request.getSession(false) == null){
            sess = request.getSession(true);
        }
        else{
            sess = request.getSession(false);
        }
        sess.setAttribute("activeAccount", activeAccount);
        String output = "";
        String type = request.getParameter("Type");
        switch(type){
            case "login":
                try{
                    String username = request.getParameter("Username");
                    String password = request.getParameter("Password");

                    boolean[] checkResults = checkInput(username, password);

                    if(checkResults[0] == true){
                        Account acc = db.findAccount(username);
                        acc.setStatus(Status.ONLINE);
                        db.editAccount(acc);
                        this.activeAccount = acc;
                    }
                    output = toLoginXML(checkResults);
                }
                catch (Exception ex) { 
                    ex.printStackTrace();
                }
                break;
            case "check":
                if(activeAccount != null){
                    output = toCheckXML(true,activeAccount.getUsername(), activeAccount.getStatus(),activeAccount.getFriends());
                }
                else{
                    output = toCheckXML(false, null, null,null);
                }
                break;
            case "logout":
                activeAccount = null;
                break;
            case "changeStatus":
                String status = request.getParameter("Status");
                activeAccount = db.findAccount(activeAccount.getUsername());
                switch(status){
                    case "ONLINE":
                        activeAccount.setStatus(Status.ONLINE);
                        break;
                    case "AWAY":
                        activeAccount.setStatus(Status.AWAY);
                        break;
                    case "BUSY":
                        activeAccount.setStatus(Status.BUSY);
                        break;
                    case "OFFLINE":
                        activeAccount.setStatus(Status.OFFLINE);
                        break;
                }
                activeAccount = db.editAccount(activeAccount);
                break;
            case "getActiveAccount":
                activeAccount = db.findAccount(activeAccount.getUsername());
                output = activeAccountXML();
                break;
        }
        sess.setAttribute("activeAccount", activeAccount);
        return output;
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String result = processRequest(request, response);
        response.setContentType("text/xml");
        response.getWriter().write(result);

    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }
    private String toLoginXML(boolean[] checkResults) {
        StringBuilder xmlDoc = new StringBuilder();
        
        xmlDoc.append("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n");
         xmlDoc.append("<root>\n");
        xmlDoc.append("<loggedIn>\n");
        xmlDoc.append(checkResults[0]+"\n");
        xmlDoc.append("</loggedIn>\n");
        
        xmlDoc.append("<errors>\n");
        
        xmlDoc.append("<usernameAndPassword>\n");
        if(checkResults[1]){
            xmlDoc.append("Username is unknown or wrong password is given.\n");
        }
        xmlDoc.append("</usernameAndPassword>\n");
        
        xmlDoc.append("</errors>\n");
        xmlDoc.append("</root>\n");
        
        return xmlDoc.toString();
    }

    private boolean[] checkInput(String username, String password) {
        boolean[] checkResults = new boolean[2];
            
        Arrays.fill(checkResults, false);
        
        Account acc = db.findAccount(username);
        
        if(acc == null){
            checkResults[1]=true;
        }else{
            if(!acc.getPassword().equals(password)){
                checkResults[1]=true;
            }
        }
        
        if(checkResults[1]==false){
            checkResults[0]=true;
        }  
        return checkResults;
    } 

    private String toCheckXML(boolean loggedIn,String username,Status status,List<Account> friends) {
        StringBuilder xmlDoc = new StringBuilder();
        
        xmlDoc.append("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n");
        xmlDoc.append("<root>\n");
        xmlDoc.append("<loggedIn>\n");
        xmlDoc.append(loggedIn).append("\n");
        xmlDoc.append("</loggedIn>\n");
        if(username != null){
            xmlDoc.append("<data>\n");
           
            xmlDoc.append("<username>\n");
            xmlDoc.append(username).append("\n");
            xmlDoc.append("</username>\n");
            
            xmlDoc.append("<status>\n");
            xmlDoc.append(status.toString()).append("\n");
            xmlDoc.append("</status>\n");
            
            xmlDoc.append("<friends>\n");
            Collections.sort(friends,new Comparator<Account>(){

                @Override
                public int compare(Account o1, Account o2) {
                    return o1.getUsername().compareTo(o2.getUsername());
                }
                    
            });
            for(Account a : friends){
                xmlDoc.append("<friend>\n");
                    xmlDoc.append("<username>\n");
                    xmlDoc.append(a.getUsername()).append("\n");
                    xmlDoc.append("</username>\n");
                    
                    xmlDoc.append("<status>\n");
                    xmlDoc.append(a.getStatus().toString()).append("\n");
                    xmlDoc.append("</status>\n");
                    
                xmlDoc.append("</friend>\n");
            }
            xmlDoc.append("</friends>\n");
            
            xmlDoc.append("</data>\n");
        }
        xmlDoc.append("</root>\n");
        return xmlDoc.toString();
    }
    private String activeAccountXML(){
        StringBuilder xmlDoc = new StringBuilder();
        
        xmlDoc.append("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n");
        xmlDoc.append("<root>\n");
        
        xmlDoc.append("<activeAccount>\n");
        xmlDoc.append(activeAccount.getUsername()).append("\n");
        xmlDoc.append("</activeAccount>\n");
        
        xmlDoc.append("</root>\n");
        
        return xmlDoc.toString();
    }
    private void initialiseDatabaseConnection() {
        try{
            Context c = new InitialContext();
            db = (DBFacadeRemote)c.lookup("db.facades.interfaces.remotes.DBFacadeRemote");
            db.init();
        }
        catch (Exception ex) { 
            ex.printStackTrace();
        }
    }
}
