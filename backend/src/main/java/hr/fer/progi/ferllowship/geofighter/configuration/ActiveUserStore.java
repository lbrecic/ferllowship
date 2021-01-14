package hr.fer.progi.ferllowship.geofighter.configuration;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import org.springframework.stereotype.Component;

@Component
public class ActiveUserStore {

    private final List<LoggedUser> users = new CopyOnWriteArrayList<>();

    public List<LoggedUser> getUsers() {
        return users;
    }

}
