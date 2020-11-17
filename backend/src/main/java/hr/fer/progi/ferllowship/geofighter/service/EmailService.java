package hr.fer.progi.ferllowship.geofighter.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
	
    @Autowired
    private JavaMailSender javaMailSender;
	
	@Async
	public void sendEmail(String to, String from, String subject, String text) {
		SimpleMailMessage mailMessage = new SimpleMailMessage();
		mailMessage.setTo(to);
		mailMessage.setFrom(from);
		mailMessage.setSubject(subject);
		mailMessage.setText(text);
		
		javaMailSender.send(mailMessage);
	}
	
}
