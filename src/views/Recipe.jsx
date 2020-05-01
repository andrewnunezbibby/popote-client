import React, { Component } from "react";
import NavBar from "../Components/NavBar";
import RecipeCardXL from "../Components/RecipeCardXL";
import APIHandler from "../Api/APIHandler";
import ReviewForm from "../Components/ReviewForm";
import Reviews from "../Components/Reviews";
import "./../styles/rating.css";

export default class Recipe extends Component {
  state = {
    recipe: "",
    reviews: [],
  };

  componentDidMount() {
    APIHandler.get(`/recipe/${this.props.match.params.id}`)
      .then((apiRes) => {
        this.setState({ recipe: apiRes.data });
      })
      .catch((apiErr) => console.log(apiErr));

    APIHandler.get(`/reviews/${this.props.match.params.id}`)
      .then((apiRes) => {
        this.setState({ reviews: apiRes.data.dbRes });
      })
      .catch((apiErr) => console.log(apiErr));
  }

  addNewReview = (review) => {
    const copy = [...this.state.reviews];
    copy.push(review);
    this.setState({ reviews: copy });
  };

  render() {
    return (
      <div>
        {/* <NavBar /> */}
        <RecipeCardXL recipe={this.state.recipe} />
        <div className="review-area">
          <div className="container">
            <div className="review-area">
              <ReviewForm
                clbk={this.addNewReview}
                ratingCount={this.state.recipe.ratingCount}
                recipeRating={this.state.recipe.rating}
                recipeId={this.props.match.params.id}
              />
              <Reviews reviews={this.state.reviews} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
