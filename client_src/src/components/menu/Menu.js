import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {
  constructor() {
    super();
    this.state = {
      firstName: JSON.parse(localStorage.getItem("state")).firstName,
      intervalID: null
    }

  }
  componentWillMount() {
    this.setState({ intervalID: setInterval(() => { this.setState({ firstName: JSON.parse(localStorage.getItem("state")).firstName }) }, 1000) })
  }
  componentWillUnmount() {
    clearInterval(this.state.intervalID);
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
          <a className="navbar-brand">GoalReacher</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div id="navbarNavDropdown" className="navbar-collapse collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/goals">Goals</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/daily">Daily Routine</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/manageProfile">Manage Profile</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/motivation">Motivation</Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li> */}
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link">Welcome, {this.state.firstName}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/" onClick={() => { localStorage.removeItem("state"); }}>Log out</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

export default Menu;