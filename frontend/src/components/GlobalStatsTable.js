import React from "react";
import Loader from "./Loader";
import MaterialTable from "material-table";
import "../styles/GlobalStatsTable.css";


class GlobalStatsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerList: [],
    };
  }

  async componentDidMount() {
    try {
      let res = await fetch("/api/allPlayers");
      let result = await res.json();

      if (result) {
        this.setState({
          playerList: result,
        });
      }
    } catch (e) {}
  }

  render() {
    // if (this.state.playerList === undefined) return <Loader />;

    return (
      <div className="table">
        <MaterialTable
          columns={[
            { title: "Rang", field: "rang", type : "numeric"},
            { title: "Korisničko ime", field: "username" },
            { title: "Broj bodova", field: "points", type: "numeric" },
          ]}
          data={
              this.state.playerList
          }
          title="Globalna statistika"
        />
      </div>
    );
  }
}

export default GlobalStatsTable;
