import { Component } from "react";
import Header from "../components/Header";
import MapComponent from "../components/MapComponent";
import AddLocation from "../components/AddLocation"


class MapPage extends Component {
   
  render(){
    return (
      <>
      <Header/>
      <AddLocation/>
      </>
      
    )
  }
}

export default MapPage;
