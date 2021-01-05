package hr.fer.progi.ferllowship.geofighter.security;

import java.util.List;
import java.util.Objects;

import javax.servlet.http.HttpSessionBindingEvent;
import javax.servlet.http.HttpSessionBindingListener;

import org.springframework.stereotype.Component;

@Component
public class LoggedUser implements HttpSessionBindingListener {

    private String username;
    private ActiveUserStore activeUserStore;
    private long lastTimeWhenActive;

    public LoggedUser(String username, ActiveUserStore activeUserStore) {
        this.username = username;
        this.activeUserStore = activeUserStore;
        lastTimeWhenActive = System.currentTimeMillis();
    }

    public LoggedUser() {

    }

    @Override
    public void valueBound(HttpSessionBindingEvent event) {
        List<LoggedUser> users = activeUserStore.getUsers();
        LoggedUser user = (LoggedUser) event.getValue();
        if (user != null && !users.contains(user)) {
            users.add(user);
        }
    }

    @Override
    public void valueUnbound(HttpSessionBindingEvent event) {
        List<LoggedUser> users = activeUserStore.getUsers();
        LoggedUser user = (LoggedUser) event.getValue();
        if (user != null) {
            users.remove(user);
        }
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public ActiveUserStore getActiveUserStore() {
        return activeUserStore;
    }

    public void setActiveUserStore(ActiveUserStore activeUserStore) {
        this.activeUserStore = activeUserStore;
    }

    public long getLastTimeWhenActive() {
        return lastTimeWhenActive;
    }

    public void setLastTimeWhenActive(long lastTimeWhenActive) {
        this.lastTimeWhenActive = lastTimeWhenActive;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LoggedUser that = (LoggedUser) o;
        return username.equals(that.username);
    }

    @Override
    public int hashCode() {
        return Objects.hash(username);
    }

}