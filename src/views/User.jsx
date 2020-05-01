import React, { Component } from "react";
import NavBar from "./../Components/NavBar";
import "../styles/user.css";
import UserForm from "../Components/UserForm";
import RecipeCardXs from "./../Components/RecipeCardXs";
import APIHandler from "../Api/APIHandler";

export default class User extends Component {
  state = {
    //get the Userid from the session , hardcoded for the moment to test the code
    //userId: "5e5d459abc53780b88933080",
    listOfFavorites: [],
  };

  componentDidMount() {
    if (this.props.user) {
      APIHandler.get(`/favorites/${this.props.user._id}`)
        .then((apiRes) => {
          if (apiRes.data)
            this.setState({ listOfFavorites: apiRes.data.favorites });
        })
        .catch((apiErr) => console.log(apiErr));
    }
  }
  render() {
    return (
      <div className="user-container">
        {/* <NavBar /> */}
        <div className="container">
          <div className="user-space">
            <div className="left-section">
              {/* <div className="title-user">
                                <span>Welcome back FIRSTNAME LASTNAME</span>
                            </div> */}
              <div className="user-favs">
                <h2>My favorites</h2>
                <div className="user-favs-list">
                  <ul>
                    {this.state.listOfFavorites.map((recipe, i) => (
                      <li key={i}>
                        <RecipeCardXs
                          image={recipe.image}
                          title={recipe.title}
                          id={recipe._id}
                        ></RecipeCardXs>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            {this.props.user && (
              <div className="right-section">
                {/* <div className="title-user">
                                Update your user informations
                            </div>     */}
                <div className="form-section">
                  <h2>My account</h2>
                  <UserForm user={this.props.user} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
