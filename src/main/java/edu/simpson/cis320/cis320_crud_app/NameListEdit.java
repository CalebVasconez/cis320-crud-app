package edu.simpson.cis320.cis320_crud_app;

import com.sun.tools.sjavac.Log;

import java.io.*;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

@WebServlet(name = "NameListEdit", value = "/api/name_list_edit")

public class NameListEdit extends HttpServlet {
    private final static Logger log = Logger.getLogger(NameListEdit.class.getName());

    private Pattern firstnameValidationPattern;
    private Pattern lastnameValidationPattern;
    private Pattern emailValidationPattern;
    private Pattern phoneValidationPattern;
    private Pattern phone2ValidationPattern;
    private Pattern birthdateValidationPattern;
    private Pattern birthdate2ValidationPattern;

    public NameListEdit() {
        // --- Compile and set up all the regular expression patterns here ---
        firstnameValidationPattern = Pattern.compile("^[A-Za-z]{1,20}$");
        lastnameValidationPattern = Pattern.compile("^[A-Za-z]{1,20}$");
        emailValidationPattern = Pattern.compile("^[a-z.]+@+[a-z.]+.+[A-Za-z]{1,3}$");
        phoneValidationPattern = Pattern.compile("^[0-9]{1,10}$");
        phone2ValidationPattern = Pattern.compile("^[0-9]+[0-9]+[0-9]+-+[0-9]+[0-9]+[0-9]+-+[0-9]+[0-9]+[0-9]+[0-9]+$");
        birthdateValidationPattern = Pattern.compile("^[0-9]+[0-9]+[0-9]+[0-9]+-+[0-9]+[0-9]+-+[0-9]+[0-9]+$");
        birthdate2ValidationPattern = Pattern.compile("^[0-1]+[0-9]+[/]+[0-3]+[0-9]+[/]+[0-9]+[0-9]+[0-9]+[0-9]+$");
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        log.log(Level.INFO, "Hello World");

        // You can output in any format, text/JSON, text/HTML, etc. We'll keep it simple
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();

        // Open the request for reading. Read in each line, put it into a string.
        // Yes, I think there should be an easier way.
        java.io.BufferedReader in = request.getReader();
        String requestString = new String();
        for (String line; (line = in.readLine()) != null; requestString += line);

        // Log the string we got as a request, just as a check
        log.log(Level.INFO, requestString);

        // Great! Now we want to parse the object, and pop it into our business object. Field
        // names have to match. That's the magic.
        Jsonb jsonb = JsonbBuilder.create();
        Person person = jsonb.fromJson(requestString, Person.class);

        out.println("Object id1: "+person.getId());
        out.println("Object firstName1: "+person.getFirst());
        out.println("Object lastName1: "+person.getLast());
        out.println("Object email1: "+person.getEmail());
        out.println("Object phone1: "+person.getPhone());
        out.println("Object birthdate1: "+person.getBirthday());

        Matcher fn = firstnameValidationPattern.matcher(person.getFirst());
        Matcher ln = lastnameValidationPattern.matcher(person.getLast());
        Matcher em = emailValidationPattern.matcher(person.getEmail());
        Matcher ph = phoneValidationPattern.matcher(person.getPhone());
        Matcher ph2 = phone2ValidationPattern.matcher(person.getPhone());
        Matcher bd = birthdateValidationPattern.matcher(person.getBirthday());
        Matcher bd2 = birthdate2ValidationPattern.matcher(person.getBirthday());

        out.println("Object id2: "+person.getId());
        out.println("Object firstName2: "+person.getFirst());
        out.println("Object lastName2: "+person.getLast());
        out.println("Object email2: "+person.getEmail());
        out.println("Object phone2: "+person.getPhone());
        out.println("Object birthdate2: "+person.getBirthday());

        if (!fn.find()) {
            out.println("There is an error with your first name!");
            return;
        }
        if (!ln.find()) {
            out.println("There is an error with your last name!");
            return;
        }
        if (!em.find()) {
            out.println("There is an error with your email!");
            return;
        }
        if (!ph.find() && !ph2.find()) {
            out.println("There is an error with your phone number!");
            return;
        }
        if (!bd.find() && !bd2.find()) {
            out.println("There is an error with your birthdate!");
            return;}

        // Log info as a check
        log.log(Level.INFO, "Object id: "+person.getId());
        log.log(Level.INFO, "Object firstName: "+person.getFirst());
        log.log(Level.INFO, "Object lastName: "+person.getLast());
        log.log(Level.INFO, "Object email: "+person.getEmail());
        log.log(Level.INFO, "Object phone: "+person.getPhone());
        log.log(Level.INFO, "Object birthdate: "+person.getBirthday());

        // Send something back to the client. Really, we should send a JSON, but
        // we'll keep things simple.
        out.println("Object id3: "+person.getId());
        out.println("Object firstName3: "+person.getFirst());
        out.println("Object lastName3: "+person.getLast());
        out.println("Object email3: "+person.getEmail());
        out.println("Object phone3: "+person.getPhone());
        out.println("Object birthdate3: "+person.getBirthday());

        PersonDAO.addPerson(person);

    }
}
