package hr.fer.progi.ferllowship.geofighter;

import hr.fer.progi.ferllowship.geofighter.dao.PlayerRepository;
import hr.fer.progi.ferllowship.geofighter.model.Player;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@DataJpaTest
public class PlayerRepositoryIntegrationTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private PlayerRepository playerRepository;

    @Test
    public void findByUsernameTest() {
        Player igrac5 = new Player("igrac5", "igrac", "igrac5@fer.hr", "");
        entityManager.persist(igrac5);
        entityManager.flush();

        Player player = playerRepository.findByUsername(igrac5.getUsername());

        assertEquals(igrac5.getUsername(), player.getUsername());
    }

}
