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
            Ukupan broj borbi:
            {this.state.stats.fightsParticipatedIn}
            <hr/>
          </span>
          

          <br />
          <span>
            Ukupan broj pobijeđenih borbi:
            {this.state.stats.fightsWon}
            <hr/>
          </span>
          

          <br />
          <span>
            Ukupan broj izgubljenih borbi:
            {this.state.stats.fightsLost}
          </span>
          <hr/>

          <br />
          <span>
            Broj bodova:
            {this.state.stats.points}
          </span>
          <hr/>

          <br />
          <span>
            Ukupno iskustvo:
            {this.state.stats.experience}
          </span>
          <hr/>

          <br />
          <span>
            Rang:
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
