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
      let res = await fetch("/api/stats/global");
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
              title: "Rank",
              field: "rank",
              type: "numeric",
              headerStyle: {
                fontSize: 18,
                backgroundColor: "#98AF97",
                zIndex: 0,
                fontFamily: "Arial, Helvetica,sans-serif",
                textAlign: "center",
              },
              cellStyle: {
                textAlign: "center",
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
                  style={{
                    width: 50,
                    borderRadius: "50%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                />
              ),
              headerStyle: {
                fontSize: 18,
                backgroundColor: "#98AF97",
                zIndex: 0,
                textAlign: "center",
              },
              sorting: false,
              cellStyle: {
                alignContent: "right",
              },
            },

            {
              title: "Username",
              field: "username",
              headerStyle: {
                fontSize: 18,
                backgroundColor: "#98AF97",
                zIndex: 0,
                textAlign: "center",
              },
              sorting: false,
              cellStyle: {
                textAlign: "center",
              },
            },
            {
              title: "Points",
              field: "points",
              type: "numeric",
              headerStyle: {
                textAlign: "center",
                backgroundColor: "#98AF97",
                fontSize: 18,
                zIndex: 0,
              },
              //defaultSort: "desc",
              sorting: false,
              cellStyle: {
                textAlign: "center",
              },
            },
          ]}
          data={this.state.playerList}
          title=""
          options={{
            toolbar: false,
            search: false,
            paging: false,
            rowStyle: (rowData) => ({
              fontSize: 18,
              backgroundColor: "#D8E1D9",
              zIndex: 0,
              fontFamily: "Arial, Helvetica,sans-serif",
            }),
            cellStyle: {
              alignContent: "center",
            },
          }}
        />
      </div>
    );
  }
}

export default GlobalStatsTable;
