package hr.fer.progi.ferllowship.geofighter.model;

import java.util.UUID;

import javax.persistence.*;

@Entity
@Table(name = "path")
public class ShortestPath {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "path_id", updatable = false, nullable = false)
	private UUID pathId;
	
	@Column
	private Integer distance;
	
	@OneToOne(targetEntity = Location.class, fetch = FetchType.EAGER)
	@JoinColumn(name = "location_id")
	private Location location;
	
	public ShortestPath() {}
	
	public ShortestPath(Integer distance, Location location) {
		this.distance = distance;
		this.location = location;
	}

	public UUID getPathId() {
		return pathId;
	}

	public Integer getDistance() {
		return distance;
	}

	public void setDistance(Integer distance) {
		this.distance = distance;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}
}
