package edu.simpson.cis320.cis320_crud_app;

import com.sun.tools.sjavac.Log;

import java.io.*;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

@WebServlet(name = "NameListEdit", value = "/api/name_list_edit")

public class NameListEdit extends HttpServlet {
    private final static Logger log = Logger.getLogger(NameListEdit.class.getName());

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

        // Log info as a check
        log.log(Level.INFO, "Object id: "+person.getId());
        log.log(Level.INFO, "Object firstName: "+person.getFirst());
        log.log(Level.INFO, "Object lastName: "+person.getLast());
        log.log(Level.INFO, "Object email: "+person.getEmail());
        log.log(Level.INFO, "Object phone: "+person.getPhone());
        log.log(Level.INFO, "Object birthdate: "+person.getBirthday());

        // Send something back to the client. Really, we should send a JSON, but
        // we'll keep things simple.
        out.println("Object id1: "+person.getId());
        out.println("Object firstName1: "+person.getFirst());
        out.println("Object lastName1: "+person.getLast());
        out.println("Object email1: "+person.getEmail());
        out.println("Object phone1: "+person.getPhone());
        out.println("Object birthdate1: "+person.getBirthday());

        PersonDAO.addPerson(person);

    }
}
