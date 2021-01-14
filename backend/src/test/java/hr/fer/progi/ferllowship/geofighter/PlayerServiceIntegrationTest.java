package hr.fer.progi.ferllowship.geofighter;

import hr.fer.progi.ferllowship.geofighter.dao.AdminRepository;
import hr.fer.progi.ferllowship.geofighter.dao.CartographRepository;
import hr.fer.progi.ferllowship.geofighter.dao.PlayerRepository;
import hr.fer.progi.ferllowship.geofighter.model.Admin;
import hr.fer.progi.ferllowship.geofighter.model.Cartograph;
import hr.fer.progi.ferllowship.geofighter.model.Player;
import hr.fer.progi.ferllowship.geofighter.service.PlayerService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(MockitoJUnitRunner.class)
public class PlayerServiceIntegrationTest {

    @Mock
    private PlayerService playerService;

    @Mock
    private PlayerRepository playerRepository;

    @Mock
    private CartographRepository cartographRepository;

    @Mock
    private AdminRepository adminRepository;

    @Test
    public void getPlayerAuthorityLevelTest() {
        Player player = playerRepository.findByUsername("igrac1");
        Mockito.when(playerService.getAuthorityLevelOfPlayer(player)).thenReturn("player");

        assertEquals("player", playerService.getAuthorityLevelOfPlayer(player));
    }

    @Test
    public void getCartographAuthorityLevelTest() {
        Cartograph cartograph = cartographRepository.findByUsername("kartograf2");
        Mockito.when(playerService.getAuthorityLevelOfPlayer(cartograph)).thenReturn("player");

        assertEquals("player", playerService.getAuthorityLevelOfPlayer(cartograph));
    }

    @Test
    public void getAdminAuthorityLevelTest() {
        Admin admin = adminRepository.findByUsername("admin1");
        Mockito.when(playerService.getAuthorityLevelOfPlayer(admin)).thenReturn("admin");

        assertEquals("admin", playerService.getAuthorityLevelOfPlayer(admin));
    }

    @Test
    public void distanceTest() {
        assertEquals(5503.5539, playerService.distance(30, 30, 60, 90), 0.001);
    }
}
