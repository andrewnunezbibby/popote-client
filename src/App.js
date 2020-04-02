import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./views/Home";
import Recipes from "./views/Recipes";
import Recipe from "./views/Recipe";
import Favorites from "./views/Favorites";
import User from "./views/User";
import Login from "./views/Login";
import Signup from "./views/Signup";
import NotFound from "./views/NotFound";
import tesseract from "./Tesseract/test.js";
import spoonacular from "./Api/APISpoonacular.js";
import HomeSecondSection from "./views/HomeSecondSection";
import { browserHistory } from "react-router";
import WithUser from "./views/WithUser";
//auth
import { useState, useEffect, useContext } from "react";
import { useAuth } from "./auth/useAuth";
import UserContext from "./auth/UserContext";
import { ProtectedRoute } from "./auth/ProtectedRoute";

import "./App.css";
import SearchRecipeWithScanTicket from "./views/SearchRecipeWithScanTicket";

function App() {
  const { isLoading, currentUser: toto } = useAuth();
  const [navMobileStatus, setNavMobileStatus] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [currentUser, setCurrentUser] = useState(toto || null);

  const UserContextValue = {
    currentUser,
    setCurrentUser
  };
  /*var sp = new spoonacular();
  //get all recipes that contains cheese restrict to 2 results
  sp.searchRecipesByIngredient("cheese", 2);

  //search for recipe detail return the first one need to see how to get the value persistent
  sp.searchRecipeDetail("cheese", 2, 1);

  //search all recipe by diet ex vegetarian
  sp.searchRecipeByDiet("vegetarian", 2);

  //search all the recipes that would be similar to the favorite based on the Id of the favorite one
  //sp.searchRecipeSimilarTofavorite("1034053", 2);*/

  //tesseract.getTextFromImage();
  return (
    <UserContext.Provider value={UserContextValue}>
      {isLoading ? null : (
        <div className="App">
          <Switch>
            <Route
              exact
              path="/recipes"
              render={props => (
                <WithUser {...props} component={Recipes}></WithUser>
              )}
            />
            <Route
              path="/favorites"
              render={props => (
                <WithUser {...props} component={Favorites}></WithUser>
              )}
            />
            <Route
              exact
              path="/user/:id"
              render={props => (
                <WithUser {...props} component={User}></WithUser>
              )}
            />

            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/scanticket" component={SearchRecipeWithScanTicket} />
            <Route path="/recipe/:id" component={Recipe} />
            <Route path="/signout" component={Home} />
            <Route path="/search" component={HomeSecondSection} />
            <Route exact path="/" component={Home} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      )}
    </UserContext.Provider>
  );
}

export default App;
