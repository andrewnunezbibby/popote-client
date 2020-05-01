import React, { Component } from "react";
import APIHandler from "../Api/APIHandler";
import "../styles/autocomplete.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default class AutoComplete extends Component {
  state = {
    activeSuggestion: 0,
    filteredSuggestions: [],
    showSuggestions: false,
    userInput: "",
    suggestions: "",
    ingredientsToSearch: [],
    recipesFound: []
  };
  static defaultProperty = {
    suggestions: []
  };

  onChange = e => {
    const userInput = e.currentTarget.value;

    const filteredSuggestions = this.props.suggestion.filter(
      suggestion =>
        suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: "" /*e.currentTarget.innerText*/
    });
    var copyingredientsToSearch = [...this.state.ingredientsToSearch];
    copyingredientsToSearch.push(e.currentTarget.innerText);
    this.setState({ ingredientsToSearch: copyingredientsToSearch });
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    } else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  removeFromListIngredient = e => {
    e.preventDefault();

    var copyingredientsToSearch = [...this.state.ingredientsToSearch];

    const filtered = copyingredientsToSearch.filter(
      ingredient =>
        ingredient.toLowerCase() === e.currentTarget.name.toLowerCase()
    );

    this.setState({ ingredientsToSearch: filtered });
  };

  searchForRecipe = e => {
    e.preventDefault();

    APIHandler.get("/recipes/ingredients", {
      ingredients: this.state.ingredientsToSearch
    })
      .then(apiRes => {
        if (apiRes.data.length === 0) alert("no recipes found");
        this.props.history.push("/recipes", {
          recipes: apiRes.data
        });
      })
      .catch(apiErr => console.log(apiErr));
    this.setState({ userInput: "" });
  };

  render() {
    let suggestionsListComponent;
    if (this.state.showSuggestions && this.state.userInput) {
      if (this.state.filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
            {this.state.filteredSuggestions.map((suggestion, index) => {
              return (
                <li key={index} onClick={this.onClick}>
                  {suggestion.name}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>No suggestions!</em>
          </div>
        );
      }
    } //suggestionsListComponent;
    return (
      <React.Fragment>
        <div className="auto-complete-container">
          <div className="input-and-btn">
            <input
              type="text"
              onChange={this.onChange}
              onKeyDown={this.onKeyDown}
              value={this.state.userInput}
            />
            <button className="btn-search" onClick={this.searchForRecipe}>
              SEARCH
            </button>
          </div>

          {suggestionsListComponent}
          <div>
            <ul>
              {this.state.ingredientsToSearch.map((ingredient, i) => (
                <li key={i}>
                  {ingredient}
                  <button
                    onClick={this.removeFromListIngredient}
                    name={ingredient}
                  >
                    delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
