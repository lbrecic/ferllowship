import React from "react";
import "../styles/Stats.css";

class PersonalStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fightList: [],
      stats: [],
    };
  }

  async componentDidMount() {
    /*  try {
      let res = await fetch("/api/stats/fights");
      let result = await res.json();

      if (result) {
        this.setState({
          fightList: result,
        });
      }
    } catch (e) {}
 */
    try {
      let res = await fetch("/api/stats/personal");
      let result = await res.json();

      if (result) {
        this.setState({
          stats: result,
        });
      }
    } catch (e) {}
  }

  render() {
    return (
      <div className="stats">
        <div className="personal">
          <span>
            Total number of fights:
            {this.state.stats.fightsParticipatedIn}
            <hr/>
          </span>
          

          <br />
          <span>
            Total number of won fights:
            {this.state.stats.fightsWon}
            <hr/>
          </span>
          

          <br />
          <span>
            Total number of lost fights:
            {this.state.stats.fightsLost}
          </span>
          <hr/>

          <br />
          <span>
            Points:
            {this.state.stats.points}
          </span>
          <hr/>

          <br />
          <span>
            Total expirience:
            {this.state.stats.experience}
          </span>
          <hr/>

          <br />
          <span>
            Rank:
            {this.state.stats.rank}
          </span>
          <hr/>

        </div>
        <div className="fights">

        </div>
      </div>
    );
  }
}

export default PersonalStats;
