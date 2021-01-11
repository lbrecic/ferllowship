package hr.fer.progi.ferllowship.geofighter.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import hr.fer.progi.ferllowship.geofighter.dto.FightMessageDTO;

@Controller
public class FightController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/play")
    public void playCard(FightMessageDTO message) {
        messagingTemplate.convertAndSendToUser(message.getOpponent(), "/queue/opponent", message);
    }

}
