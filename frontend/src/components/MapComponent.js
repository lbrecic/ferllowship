import React, { Component, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "../styles/MapStyle.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Card } from "react-bootstrap";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

function SelectedLocationMarker() {
  const [position, setPosition] = useState(null);
  
  const map = useMapEvents({
    click: (e) => {
      setPosition(e.latlng);
      localStorage.setItem("selectedLocation", JSON.stringify(e.latlng));
    }
  });

  const deleteClick = () => {
    setPosition(null);
    localStorage.removeItem("selectedLocation");
  };

  return position === null ? null : (
    <Marker position={position}>
      <Popup>
        <p>lat: {position.lat}</p>
        <p>lng: {position.lng}</p>
        <button className="btn" onClick={deleteClick}>Obriši</button>
      </Popup>
    </Marker>
  );
}

class MapComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      center: { lat: 45.127804527473224, lng: 16.045532226562504 },
      zoom: 7,
      data: []
    };
  }

  async componentDidMount() {
    try {
      let res = await fetch('/api/location/requests?status=0');
      let result = await res.json();
      if (result) {
        this.setState({
          data: result
        });
      }
    } catch (e) {
        console.log(e);
    }
  }

  render() {
    const { center, zoom, data } = this.state;
    return (
      <>
        <div className="mapContainer">
          <MapContainer center={center} zoom={zoom} className="map">

            <TileLayer
              url="https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=JiIiuxyafWjR1SPu3uIu"
              attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
            />

            {data.map((value, index) => {
                return (
                  <Marker position={value.coordinates}>
                    <Popup>
                      <Card>
                        <Card.Img variant="top" src={value.locationPhoto} />
                        <Card.Body>
                          <Card.Title>{value.locationName}</Card.Title>
                          <Card.Text>
                            Kategorija: {value.category.categoryName}<br />
                            Bodovi: {value.category.categoryPoints}<br />
                            Opis: {value.locationDesc}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Popup>
                  </Marker>
                );
            })}

            <SelectedLocationMarker />

          </MapContainer>
        </div>
      </>
    );
  }

}

export default MapComponent;
