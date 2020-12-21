import React from "react";
import Loader from "./Loader";
import MaterialTable from "material-table";
import "../styles/GlobalStatsTable.css";
import { faFont } from "@fortawesome/free-solid-svg-icons";

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
          playerRank: 0,
        });
      }
    } catch (e) {}
  }

  render() {
    if (this.state.playerList === undefined) return <Loader />;

    return (
      <div className="table">
        <MaterialTable
          columns={[
            {
              title: "Rang",
              field: "rang",
              type: "numeric",
              headerStyle: {
                backgroundColor: "#98AF97",
                zIndex: 0,
                fontFamily: "Arial, Helvetica,sans-serif",
              },
              sorting: false,
              render: (rowData) => <span> {rowData.tableData.id + 1}</span>,
            },
            {
              field: "photoLink",
              title: "Avatar",
              render: (rowData) => (
                <img
                  src={rowData.photoLink}
                  alt="avatar"
                  style={{ width: 50, borderRadius: "50%" }}
                />
              ),
              headerStyle: {
                backgroundColor: "#98AF97",
                zIndex: 0,
              },
              sorting: false,
            },

            {
              title: "Korisničko ime",
              field: "username",
              headerStyle: {
                backgroundColor: "#98AF97",
                zIndex: 0,
              },
              sorting: false,
            },
            {
              title: "Broj bodova",
              field: "points",
              type: "numeric",
              headerStyle: {
                backgroundColor: "#98AF97",
                zIndex: 0,
              },
              defaultSort: "desc",
              sorting: false,
            },
          ]}
          data={this.state.playerList}
          title="Globalna statistika"
          options={{
            rowStyle: (rowData) => ({
              backgroundColor: "#D8E1D9",
              zIndex: 0,
              fontFamily: "Arial, Helvetica,sans-serif",
            }),
          }}
        />
      </div>
    );
  }
}

export default GlobalStatsTable;
