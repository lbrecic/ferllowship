package hr.fer.progi.ferllowship.geofighter.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class ActiveUserStore {

    private final List<String> users = new ArrayList<>();

    public List<String> getUsers() {
        return users;
    }

}
