package hr.fer.progi.ferllowship.geofighter.configuration;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class ActiveUserStore {

    private final List<LoggedUser> users = new ArrayList<>();

    public List<LoggedUser> getUsers() {
        return users;
    }

}
