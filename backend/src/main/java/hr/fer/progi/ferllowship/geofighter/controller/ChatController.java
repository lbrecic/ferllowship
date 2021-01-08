package hr.fer.progi.ferllowship.geofighter.controller;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import hr.fer.progi.ferllowship.geofighter.dto.ReceivedMessageDTO;
import hr.fer.progi.ferllowship.geofighter.dto.SentMessageDTO;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/message")
    public void sendMessage(@Payload SentMessageDTO sentMessage) {
        ReceivedMessageDTO receivedMessage = new ReceivedMessageDTO(
            sentMessage.getFrom(),
            sentMessage.getMessage(),
            new SimpleDateFormat("HH:mm").format(new Date())
        );
        simpMessagingTemplate.convertAndSendToUser(sentMessage.getTo(), "/queue/reply", receivedMessage);
    }

}
