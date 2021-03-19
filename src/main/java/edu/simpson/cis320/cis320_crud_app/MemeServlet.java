package edu.simpson.cis320.cis320_crud_app;

import javax.imageio.ImageIO;
import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;

@WebServlet(name = "memeServlet", value = "/meme")
public class MemeServlet extends HttpServlet {
    private final static Logger log = Logger.getLogger(MemeServlet.class.getName());

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        log.log(Level.INFO, "Meme servlet");

        ServletContext context = getServletContext();
        InputStream imageStream = context.getResourceAsStream("WEB-INF/classes/buxton_all_image.jpg");
        BufferedImage image = ImageIO.read(imageStream);

        // Modify image
        Graphics g = image.getGraphics();

        // Write to Image
        String fontName = "Comic Sans MS";
        int fontsize = 25;
        int fontStyle = Font.BOLD;
        Font font = new Font(fontName, fontStyle, fontsize);
        g.setFont(font);

        Color myColor = new Color(220, 3, 23);
        g.setColor(myColor);

        String message = request.getParameter("message");
        if (message == null){
            message = "Simpson Storm x";
        }

        g.drawString(message, 5, 100);

        // Hello
        response.setContentType("image/jpg");
        OutputStream out = response.getOutputStream();
        ImageIO.write(image, "JPG", out);
    }


}