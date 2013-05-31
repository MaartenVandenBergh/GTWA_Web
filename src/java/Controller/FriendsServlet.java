/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package Controller;

import db.facades.interfaces.remotes.DBFacadeRemote;
import domain.entities.Account;
import domain.entities.Country;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
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
@WebServlet(name = "FriendsServlet", urlPatterns = {"/FriendsServlet"})
public class FriendsServlet extends HttpServlet {
    
    private DBFacadeRemote db;
    
    protected String processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String output = "";
        String type = request.getParameter("Type");
        HttpSession session = request.getSession(false);
        Account  activeAccount = (Account)session.getAttribute("activeAccount");
        if(db == null){
            initialiseDatabaseConnection();
        }
        switch(type){
            case "getPotentialFriends":
                List <Account> potentialFriends = db.findAllAccounts();
                List <Account> friendAccounts = activeAccount.getFriends();
                
                friendAccounts.add(activeAccount);
                
                potentialFriends.removeAll(friendAccounts);
                Collections.sort(potentialFriends,new Comparator<Account>(){

                    @Override
                    public int compare(Account o1, Account o2) {
                        return o1.getUsername().compareTo(o2.getUsername());
                    }
                    
                });
                
                output = potentialFriendsXML(potentialFriends);
                break;
            case "addFriends":
                String newFriendsString = request.getParameter("Friends");
                String[] newFriends = newFriendsString.split(",");
                Boolean added = false;
                try{
                    for(int i =0;i<newFriends.length;i++){
                        Account friend = db.findAccount(newFriends[i]);
                        db.friendTwoAccounts(activeAccount, friend);
                    }
                    added = true;
                }
                catch(Exception e){            
                    System.out.println("!!!!!ERROR:"+e);
                }
                output = addfriendsXML(added);
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

    private void initialiseDatabaseConnection() {
        try{
            Context c = new InitialContext();
            db = (DBFacadeRemote)c.lookup("db.facades.interfaces.remotes.DBFacadeRemote");
            }
        catch (Exception ex) { 
            ex.printStackTrace();
        }
    }

    private String potentialFriendsXML(List<Account> potentialFriends) {
        StringBuilder xmlDoc = new StringBuilder();
        
        xmlDoc.append("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n");
        xmlDoc.append("<root>\n");
        xmlDoc.append("<potentialFriends>\n");
        
        for(Account a : potentialFriends){
            xmlDoc.append("<potentialFriend>\n");
                xmlDoc.append("<username>\n");
                xmlDoc.append(a.getUsername()).append("\n");
                xmlDoc.append("</username>\n");
                 
                //info
                xmlDoc.append("<surname>\n");
                xmlDoc.append(a.getSurname()).append("\n");
                xmlDoc.append("</surname>\n");
                
                xmlDoc.append("<name>\n");
                xmlDoc.append(a.getName()).append("\n");
                xmlDoc.append("</name>\n");
                
                xmlDoc.append("<dateOfBirth>\n");
                DateFormat format = new SimpleDateFormat("dd/MM/yyyy");
                Date d = a.getDateOfBirth().getTime();
                xmlDoc.append(format.format(d)).append("\n");
                xmlDoc.append("</dateOfBirth>\n");
                
                xmlDoc.append("<country>\n");
                xmlDoc.append(a.getCountry().getName()).append("\n");
                xmlDoc.append("</country>\n");

            xmlDoc.append("</potentialFriend>\n");
        }
        
        xmlDoc.append("</potentialFriends>\n");
        xmlDoc.append("</root>\n");
        
        return xmlDoc.toString();
    }

    private String addfriendsXML(Boolean added) {
        StringBuilder xmlDoc = new StringBuilder();
        
        xmlDoc.append("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n");
        xmlDoc.append("<root>\n");
        xmlDoc.append("<added>\n");
        xmlDoc.append(added);
        xmlDoc.append("</added>\n");
        xmlDoc.append("</root>\n");
        
        return xmlDoc.toString();
    }
}
