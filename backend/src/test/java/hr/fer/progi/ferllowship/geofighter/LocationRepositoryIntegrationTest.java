package hr.fer.progi.ferllowship.geofighter;

import hr.fer.progi.ferllowship.geofighter.dao.CategoryRepository;
import hr.fer.progi.ferllowship.geofighter.dao.LocationRepository;
import hr.fer.progi.ferllowship.geofighter.model.Location;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@DataJpaTest
public class LocationRepositoryIntegrationTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Test
    public void findByLocationName() {
        Location cakovec = new Location("Cakovec", "", "", "", categoryRepository.findByCategoryName("Grad"));
        entityManager.persist(cakovec);
        entityManager.flush();

        Location location = locationRepository.findByLocationName(cakovec.getLocationName());

        assertEquals(cakovec.getLocationName(), location.getLocationName());
    }
}
