/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package Controller;

import db.facades.DBFacadeMain;
import db.facades.interfaces.remotes.DBFacadeRemote;
import domain.entities.Account;
import domain.entities.Country;
import domain.enums.Status;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;
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
@WebServlet(name = "RegistrationServlet", urlPatterns = {"/RegistrationServlet"})
public class RegistrationServlet extends HttpServlet {
    
    static final long serialVersionUID = 1L;
    private DBFacadeRemote db;
    
    protected String processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String output = "";
        try{
            Context c = new InitialContext();
            db = (DBFacadeRemote)c.lookup("db.facades.interfaces.remotes.DBFacadeRemote");
            db.init();
            
            String username = request.getParameter("Username");
            String password = request.getParameter("Password");
            String repeatPassword = request.getParameter("RepeatPassword");
            String name = request.getParameter("Name");
            String surname = request.getParameter("Surname");
            String email = request.getParameter("Email");
            
            boolean[] checkResults = checkInput(username, password, repeatPassword,email);
            
            if(checkResults[0] == true){
                Account a = new Account();
                a.setUsername(username);
                a.setPassword(password);
                a.setName(name);
                a.setSurname(surname);
                a.setEmailAddress(email);
                a.setStatus(Status.OFFLINE);
                
                this.db.createAccount(a);
            }
       
            output = toXML(checkResults);
        }
        catch (Exception ex) { 
            ex.printStackTrace();
        }
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

    private String toXML(boolean[] checkResults) {
        StringBuffer xmlDoc = new StringBuffer();
        
        xmlDoc.append("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n");
         xmlDoc.append("<root>\n");
        xmlDoc.append("<registrated>\n");
        xmlDoc.append(checkResults[0]+"\n");
        xmlDoc.append("</registrated>\n");
        
        xmlDoc.append("<errors>\n");
        
        xmlDoc.append("<username>\n");
        if(checkResults[1]){
            xmlDoc.append("Username already used.\n");
        }
        xmlDoc.append("</username>\n");
        
        xmlDoc.append("<repeatPassword>\n");
        if(checkResults[2]){
            xmlDoc.append("Passwords don't match.\n");
        }
        xmlDoc.append("</repeatPassword>\n");
        
        xmlDoc.append("<email>\n");
        if(checkResults[3]){
            xmlDoc.append("Emailadress already used.\n");
        }
        xmlDoc.append("</email>\n");
        
        xmlDoc.append("</errors>\n");
         xmlDoc.append("</root>\n");
        
        return xmlDoc.toString();
    }

    private boolean[] checkInput(String username, String password, String repeatPassword, String email) {
        boolean[] checkResults = new boolean[4];
            
        Arrays.fill(checkResults, false);
        
        List<Account> accounts = db.findAllAccounts();
        for(int i = 0;i<accounts.size();i++){
            if(accounts.get(i).getUsername().equals(username)){
                checkResults[1] = true;
            }
            if(accounts.get(i).getEmailAddress().equals(email)){
                checkResults[3] = true;
            }
        }
        
        if(!password.equals(repeatPassword)){
            checkResults[2] = true;
        }
        
        if(checkResults[1]==false && checkResults[2]==false && checkResults[3]==false){
            checkResults[0]=true;
        }  
        return checkResults;
    }
}
