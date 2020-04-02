import React, { Component } from "react";
import NavBar from "../Components/NavBar";
import APIHandler from "../Api/APIHandler";
import RecipeCardM from "../Components/RecipeCardM";
import "../styles/recipes.css";
// when you are loggedIn we retrieve the full list of recipe , we should be able to see the one already in our favorite
// only for the one that are not in favorite we should be able to add them  add sign visible for the one that are not in favorite
// if not logged in we see the list of recipes without the favorite icone

export default class Recipes extends Component {
  state = {
    //userId: "5e5d459abc53780b88933080", //this will be retrieved from session after login
    recipes: [],
    favoritesRecipes: [],
    isLoggedIn: false
  };

  componentDidMount() {
    this.setState({ recipes: this.props.location.state.recipes });
    if (this.props.user) {
      APIHandler.get(`/favorites/${this.props.user._id}`)
        .then(apiRes => {
          if (apiRes.data) {
            this.setState({ favoritesRecipes: apiRes.data.favorites });
            if (this.state.favoritesRecipes.length > 0) this.recreateRecipe();
          }
        })
        .catch(apiErr => console.log(apiErr));
    }
    if (this.props.user) this.setState({ isLoggedIn: true });
  }

  //need to create function that is searching in the recipes favorites and update the array with recipes to know if its in the favorite
  //a new field Infavorite should be created with a false value
  recreateRecipe = () => {
    var RecipeswithFavoriteState = [];
    var allRecipes = this.state.recipes;
    var favoriteRecipes = this.state.favoritesRecipes;

    allRecipes.map(function(recipe, index) {
      var found = false;

      for (let i = 0; i < favoriteRecipes.length; i++) {
        var recipeToAdd = recipe;
        if (recipe._id === favoriteRecipes[i]._id) found = true;
      }
      if (found) recipeToAdd.favorite = true;
      else recipeToAdd.favorite = false;
      RecipeswithFavoriteState.push(recipeToAdd);
    });

    this.setState({ recipes: RecipeswithFavoriteState });
  };

  handleFavorite = (title, id, action) => {
    var recipescopy = [...this.state.recipes];
    this.state.recipes.map(function(recipe, index) {
      if (recipe._id === id) {
        var recipeTochange = recipe;
        recipeTochange.favorite = !recipe.favorite;
        recipescopy[index] = recipeTochange;
      }
    });

    this.setState({ recipes: recipescopy });
    //only if we are loggin
    // we can add a recipe to our favorite from the recipes page
    if (action === "delete") {
      APIHandler.delete(`/favorites/${this.props.user._id}/${id}`, { id })
        .then(apiRes => {})
        .catch(apiErr => console.log(apiErr));
    } else if (action === "add") {
      APIHandler.patch(`/favorites/${this.props.user._id}/${id}`, { id })
        .then(apiRes => {})
        .catch(apiErr => console.log(apiErr));
    }
    //faire un setstate pour voir celui au favori
  };

  render() {
    console.log("render", this.state.isLoggedIn);
    return (
      <div>
        <NavBar />
        <div className="space"></div>
        <div className="container">
          <div className="recipes-container">
            {this.state.recipes.map((recipe, i) => (
              <div key={i} className="recipes-element">
                <RecipeCardM
                  title={recipe.title}
                  image={recipe.image}
                  readyTime={recipe.readyTime}
                  id={recipe._id}
                  isLoggedIn={this.state.isLoggedIn}
                  favorite={recipe.favorite}
                  clbk={this.handleFavorite}
                ></RecipeCardM>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
