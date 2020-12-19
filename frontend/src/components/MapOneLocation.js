import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../styles/MapStyle.css";
import "leaflet/dist/leaflet.css";
import { Card } from "react-bootstrap";

class MapOneLocation extends React.Component {
    constructor(props) {
        super(props);
        this.setShow = this.props.setShow;
        this.location = this.props.location;
        this.state = {
          center: this.props.location.coordinates,
          zoom: 7
        };
      }

  render() {
      return (
          <>
            <button onClick={() => this.setShow(this.location)} 
                    style={{alignSelf:'start', margin:'5px'}}>Close</button>
            <div className="mapContainer">
                <MapContainer center={this.state.center} zoom={this.state.zoom} className="map">

                <TileLayer
                url="https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=JiIiuxyafWjR1SPu3uIu"
                attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                />

                <Marker position={this.location.coordinates}>
                    <Popup>
                    <Card>
                        <Card.Img variant="top" src={this.location.locationPhoto} />
                        <Card.Body>
                        <Card.Title>{this.location.locationName}</Card.Title>
                        <Card.Text>
                            Kategorija: {this.location.category.categoryName}<br />
                            Bodovi: {this.location.category.categoryPoints}<br />
                            Opis: {this.location.locationDesc}
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    </Popup>
                </Marker>

                </MapContainer>
            </div>
        </>
      );
  }
}

export default MapOneLocation;