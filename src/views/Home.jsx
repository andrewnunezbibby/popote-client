import React, { Component } from "react";
import NavBar from "./../Components/NavBar";
import "../styles/home.css";
// import FilterList from "./../components/FilterList";
import HomeSecondSection from "./HomeSecondSection";

import "../styles/home.css";
import { Link } from "react-router-dom";

// import SearchByIngredient from "../components/SearchByIngredient";

export default class Home extends Component {
  render() {
    return (
      <div className="container">
        <div className="marketing">
          <h2>Tell us what you have in your fridge.</h2>
          <h2 id="decale">We'll find something to eat for you...</h2>
        </div>
        <div className="arrow-down">
          <Link to="/search" history={this.props.history}>
            <span className="arrow">GET STARTED</span>
          </Link>
        </div>
      </div>
    );
  }
}
