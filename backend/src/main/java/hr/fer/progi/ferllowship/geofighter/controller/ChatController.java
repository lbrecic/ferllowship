package hr.fer.progi.ferllowship.geofighter.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import hr.fer.progi.ferllowship.geofighter.dto.ChatMessageDTO;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/message")
    public void sendMessage(ChatMessageDTO message) {
        messagingTemplate.convertAndSendToUser(message.getTo(), "/queue/reply", message);
    }

}
