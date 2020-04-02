import React, { Component } from "react";
import NavBar from "../Components/NavBar";
import APIHandler from "../Api/APIHandler";
import RecipeCardM from "../Components/RecipeCardM";
import "../styles/favorite.css";
//seed the database with User and recipe
//retrieve list of favorite on did mount
//for each favorite call the component recipe card , we want to see a picture title and time to prepare
// add the heart symbole on the click update the favorite array in the user db
// on the click on one favorite we want to be able to see the recipe detail
//adding a carousel to have some recipe proposed based on ""

export default class Favorites extends Component {
  state = {
    //userId: "5e5d459abc53780b88933080", //this will be retrieved from session after login
    listOfFavorites: [],
    isLoggedIn: false
  };

  componentDidMount() {
    if (this.props.user) {
      APIHandler.get(`/favorites/${this.props.user._id}`)
        .then(apiRes => {
          if (apiRes.data)
            this.setState({ listOfFavorites: apiRes.data.favorites });
        })
        .catch(apiErr => console.log(apiErr));

      this.setState({ isLoggedIn: true });
    }
  }

  handleFavorite = (title, id) => {
    //delete a favorite
    const favoriteUpdate = [...this.state.listOfFavorites].filter(
      f => f.title !== title
    );
    this.setState({
      listOfFavorites: favoriteUpdate
    });
    APIHandler.delete(`/favorites/${this.props.user._id}/${id}`, { id })
      .then(apiRes => {})
      .catch(apiErr => console.log(apiErr));
  };
  render() {
    console.log(this.props.user && this.props.user._id, "these are props");
    return (
      <div>
        <NavBar />

        <div className="space"></div>
        <div className="container">
          <div className="favorite-container ">
            {this.state.listOfFavorites.length ? (
              this.state.listOfFavorites.map((recipe, i) => (
                <div key={i} className="favorite-element">
                  <RecipeCardM
                    title={recipe.title}
                    image={recipe.image}
                    readyTime={recipe.readyTime}
                    id={recipe._id}
                    clbk={this.handleFavorite}
                    favorite={true}
                    isLoggedIn={this.state.isLoggedIn}
                  ></RecipeCardM>
                </div>
              ))
            ) : (
              <div>You dont have any favorite </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
