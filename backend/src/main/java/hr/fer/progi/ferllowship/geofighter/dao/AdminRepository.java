package hr.fer.progi.ferllowship.geofighter.dao;

import java.util.UUID;

import hr.fer.progi.ferllowship.geofighter.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;

import hr.fer.progi.ferllowship.geofighter.model.Admin;

public interface AdminRepository extends JpaRepository<Admin, UUID> {

    Admin findByUsername(String username);

}
