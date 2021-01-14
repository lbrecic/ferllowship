import React from "react";
import Navigation from "./Navigation";
import "../styles/tailwind.css";
import "../styles/App.css";
import "../styles/Header.css";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import search_icon from "../utils/search_icon.png";

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

async function load(change = false) {
  if(change === true) {
    await sleep(200);
    window.location.reload();
  }
}

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      queryResult: [],
      redirect: false,
      searchBox: false,
      searchBoxVal: ""
    };
  }

  async componentDidMount() {
    try {
      let res = await fetch('/api/allPlayers');
      let result = await res.json();

      if (result) {
        this.setState({
            users: this.state.users.concat(result)
        });
      }
    } catch (e) {
    }

    try {
      let res = await fetch('/api/allCartographs');
      let result = await res.json();

      if (result) {
        this.setState({
            users: this.state.users.concat(result)
        });
      }
    } catch (e) {
    }

    try {
      let res = await fetch('/api/allAdmins');
      let result = await res.json();

      if (result) {
        this.setState({
            users: this.state.users.concat(result)
        }, () => {
          let index = 0;
          this.state.users.map((user) => {
            if (user.username === localStorage.username)
              this.state.users.splice(index, 1);
            index++;
          })
        });
      }
    } catch (e) {
    }
  }

  async doLogout() {
    try {
      let res = await fetch("/api/logout", {
        method: "post",
      });

      if (res.ok) {
        this.setState({
          redirect: true
        });
        localStorage.removeItem("isLoggedIn");
      } else {
        toast("Error occured.");
      }
    } catch (e) {
      toast("Error occured.");
    }
  }

  filterUsers() {
    this.tmpList = [];
    this.state.users.map((user) => {
      if (user.username.toLowerCase().startsWith(this.state.searchBoxVal.toLowerCase()))
        this.tmpList.push(user);
    });
    this.setState({
      queryResult: this.tmpList
    }, () => console.log(this.state.queryResult));
  }

  removeQuery() {
    this.setState({
      queryResult: []
    });
  }

  setInputValueSearch(val) {
    this.setState({
      searchBoxVal: val,
    }, () => {
      if (this.state.searchBoxVal && this.state.searchBoxVal.length > 0) {
          this.filterUsers();
      } else if (this.state.searchBoxVal.length === 0) {
          this.removeQuery();
      }
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    } else {
      return (
        <header className="absolute w-full bg-white background-color header">
          <div className="flex justify-between items-center border-b p-3">
            <Link to="/home">
              <span className="logo-title-light">GeoFighter</span>
            </Link>
            <div className="flex justify-between items-center">
              <div className="searchDropdown">
                {this.state.searchBox === true &&
                  <div className="searchBox">
                    <input className="searchBoxInput"
                      type="text"
                      placeholder="Search users"
                      value={this.state.searchBoxVal}
                      onChange={(e) =>this.setInputValueSearch(e.target.value)}>
                    </input>
                  </div>
                }
                <div className="searchDropdown-content">
                  {this.state.searchBox === true &&
                  this.state.queryResult.map((user) => (
                      <Link to={`/profile/${user.username}`}>
                          <div key={user.username}
                              className="z-10 text-center text-sm usernames p-3  box-shadow cursor-pointer"
                              onClick={() => load(true)}  
                          >
                              {user.username}
                          </div>
                      </Link>
                  ))}
                </div>
              </div>
              <div className="searchBoxToggle"
                  onClick={() => this.setState({searchBox: !this.state.searchBox})}>
                <img className="searchIcon" src={search_icon}></img>
              </div>
              <div className="logoutButton">
                <button className="btnLogout" onClick={() => this.doLogout()}>
                  Log out
                </button>
              </div>
              <Navigation />
            </div>
          </div>
        </header>
      );
    }
  }
}

export default Header;
