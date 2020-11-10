package hr.fer.progi.ferllowship.geofighter;

import java.io.IOException;
import java.util.Map;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@RestController
public class RegisterController {

	@PostMapping(path = "/register")
	public void doRegister(
			@RequestPart("username") String username,
			@RequestPart("password") String password,
			@RequestPart("email") String email,
			@RequestPart("picture") MultipartFile picture) throws IOException {
		
		Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
			"cloud_name", "ferllowship",
			"api_key", "558424752216417",
			"api_secret", "Mcj9aGAcqmKi6Zx4OXNcV9Cy5KI"
		));
		
		@SuppressWarnings("rawtypes")
		Map result = cloudinary.uploader().upload(picture.getBytes(), ObjectUtils.emptyMap());
		System.out.println(result.get("url"));
	}
	
	@GetMapping(path = "/mail")
	public void doRegister() throws IOException, AddressException, MessagingException {
        String from = "ferllowship";
        String mailPassword = "ferllowship1!";
        String to = "lukas.basic@fer.hr";
        String subject = "Potvrdi svoju GeoFighter registraciju.";
        String body = "Klikni ovdje kako bi potvrdio registraciju:\n";

        sendFromGMail(from, mailPassword, to, subject, body);
    }

    private static void sendFromGMail(String from, String mailPassword, String to, String subject, String body) throws AddressException, MessagingException {
        Properties props = System.getProperties();
        String host = "smtp.gmail.com";
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.user", from);
        props.put("mail.smtp.password", mailPassword);
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.auth", "true");

        Session session = Session.getDefaultInstance(props);
        MimeMessage message = new MimeMessage(session);

        message.setFrom(new InternetAddress(from));
        message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
        message.setSubject(subject);
        message.setText(body);
        
        Transport transport = session.getTransport("smtp");
        transport.connect(host, from, mailPassword);
        transport.sendMessage(message, message.getAllRecipients());
        transport.close();
    }
	
}
