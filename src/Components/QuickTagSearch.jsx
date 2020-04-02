import React, { Component } from "react";
import "./../styles/quick-tag-search.css";
import APIHandler from "../Api/APIHandler";

export default class QuickTagSearch extends Component {
  state = {
    isToggle: false,
    tags: [],
    selectedTags: [],
    selected: "not-selected"
  };
  searchForRecipe = tag => {
    APIHandler.get("/tags/tagname/" + tag)
      .then(apiRes => {
        console.log(apiRes);
        this.props.history.push("/recipes", {
          recipes: apiRes.data
        });
      })
      .catch(apiErr => console.log(apiErr));
  };

  handleClick = (e, tagname) => {
    this.searchForRecipe(e.currentTarget.innerText);
  };

  componentDidMount() {
    APIHandler.get("/tags")
      .then(apiRes => {
        this.setState({ tags: apiRes.data.apiRes });
      })
      .catch(apiErr => console.error(apiErr));
  }

  render() {
    return (
      <>
        <h2>Quick search</h2>
        <div className="tag-list">
          <ul>
            {this.state.tags.map((tag, i) => (
              <li
                key={i}
                className={this.state.selected}
                onClick={this.handleClick}
              >
                {tag.name}
              </li>
            ))}
          </ul>
        </div>
        <button className="btn-tag">QUICK SEARCH</button>
      </>
    );
  }
}
