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
    try {
      let res = await fetch("/api/stats/personal");
      let result = await res.json();

      if (result) {
        this.setState({
          stats: result,
        });
      }
    } catch (e) {}
    try {
      let res = await fetch("/api/stats/fights");
      let result = await res.json();

      if (result) {
        this.setState({
          fightList: result,
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
            <hr />
          </span>

          <br />
          <span>
            Total number of won fights:
            {this.state.stats.fightsWon}
            <hr />
          </span>

          <br />
          <span>
            Total number of lost fights:
            {this.state.stats.fightsLost}
          </span>
          <hr />

          <br />
          <span>
            Points:
            {this.state.stats.points}
          </span>
          <hr />

          <br />
          <span>
            Total expirience:
            {this.state.stats.experience}
          </span>
          <hr />

          <br />
          <span>
            Rank:
            {this.state.stats.rank}
          </span>
          <hr />
        </div>
        <div className="fights">
          <table>
            <tr className="tableHeader">
              <th>Date played:</th>
              <th>Duration:</th>
              <th>Result:</th>
              <th>Opponent:</th>
            </tr>
            {this.state.fightList.map((fight) => (
              <tr className="tableStats">
                <th>{new Date(fight.start * 1000).toLocaleDateString()}</th>
                <th>{new Date(fight.duration * 1000).toISOString().substr(11, 8)}</th>
                {fight.winner.username === localStorage.username && 
                <th className="winner">You won</th>
                }
                {fight.loser.username === localStorage.username && 
                <th className="loser">You lost</th>}
                {fight.winner.username !== localStorage.username && 
                <th>{fight.winner.username}</th>
                }
                {fight.loser.username !== localStorage.username && 
                <th>{fight.loser.username}</th>
                }
                <th ></th>
              </tr>
            ))}
          </table>
          
        </div>
      </div>
    );
  }
}

export default PersonalStats;
