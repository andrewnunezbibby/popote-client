import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import apiHandler from "../Api/APIHandler";

export default class RecipeCard extends Component {
  state = { isLiked: true };

  handleClickonFavorite = (title, id) => {
    this.setState({ isLiked: !this.state.isLiked });

    this.props.clbk(title, id);
  };

  render() {
    return (
      <div className="recipe-card">
        <img src={this.props.image} alt={this.props.image} />
        <h3>{this.props.title}</h3>
        <p>{this.props.readyTime}</p>
        {this.state.isLiked && (
          <button
            onClick={() =>
              this.handleClickonFavorite(this.props.title, this.props.id)
            }
          >
            <FontAwesomeIcon icon={faHeart} />
          </button>
        )}
      </div>
    );
  }
}
