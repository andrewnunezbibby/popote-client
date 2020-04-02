import React, { Component } from "react";
import NavBar from "./../Components/NavBar";
import "../styles/home.css";
// import FilterList from "./../components/FilterList";
import HomeSecondSection from "./HomeSecondSection";

import "../styles/home.css";

// import SearchByIngredient from "../components/SearchByIngredient";

export default class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <NavBar />
        <div className="container">
          <div className="marketing">
            <h2>Tell us what you have in your fridge.</h2>
            <h2 id="decale">We will find something to eat for you...</h2>
          </div>
          <div className="arrow-down">
            <a href="#home-second-page">
              <span className="arrow">GET STARTED</span>
            </a>
          </div>
        </div>
        <HomeSecondSection history={this.props.history} />
      </div>
    );
  }
}

/* render() {
    console.log(this.state.ingredientsInDb);
    return (
      <div className="home-container">
        <NavBar />
        
        <div className="container">
          <div className="marketing">
            <h2>Tell us what you have in your fridge</h2>
            <h2 id="decale">we will find something to eat for you...</h2>
          </div>
          <div className="arrow-down">
            <a href="#">
              <span className="arrow">v</span>
            </a>
          </div>
        </div>

        <div className="home-second-page">
          <div className="container">
            <div className="marketing-question">
              <span>Which ingredient do you have ?</span>
            </div>
            <form>
              <div className="search-bar">
                <AutoComplete
                  suggestion={this.state.ingredientsInDb}
                ></AutoComplete>

                <div className="more-filter">
                  <a href="#">
                    <span id="style-span">more filters</span>
                  </a>
                </div>
              </div>
            </form>

            <div className="filter-list">{/* <FilterList/> */
//         <div className="quick-tag-search">
//           <QuickTagSearch />
//         </div>
//       </div>
//     </div>
//   </div>
// );
//   }
// }
