import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./../styles/navbar.css";
import { useAuth } from "../auth/useAuth";
import Signout from "../Components/Signout";
import UserContext from "../auth/UserContext";
import logo from "../images/logo.png";

export default function NavBar() {
  useAuth();
  const { currentUser } = useContext(UserContext);

  return (
    <>
      {currentUser ? (
        <div className="navbar">
          <div className="container">
            <NavLink exact to="/" activeClassName="is-active">
              <img src={logo} width="80px" height="90px" />
            </NavLink>
            <div className="menu">
              <NavLink
                to="/search"
                exact
                className="link"
                activeClassName="is-active"
              >
                SEARCH
              </NavLink>

              <NavLink
                to="/favorites"
                exact
                className="link"
                activeClassName="is-active"
              >
                FAVORITES
              </NavLink>

              <NavLink
                to="/scanticket"
                className="link"
                activeClassName="is-active"
              >
                SCAN YOUR TICKET
              </NavLink>
              <NavLink
                to={`/user/${currentUser._id}`}
                className="link"
                activeClassName="is-active"
              >
                MY PROFILE
              </NavLink>
              <Signout />
            </div>
            <div>
              <img
                className="image-navbar"
                src={currentUser.avatar}
                alt={currentUser.avatar}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="navbar">
          <div className="container">
            <NavLink exact to="/" activeClassName="is-active">
              <img src={logo} width="80px" height="90px" />
            </NavLink>
            <div className="menu">
              <NavLink
                to="/search"
                exact
                className="link"
                activeClassName="is-active"
              >
                SEARCH
              </NavLink>
              <NavLink
                to="/scanticket"
                className="link"
                activeClassName="is-active"
              >
                SCAN YOUR TICKET
              </NavLink>
              <NavLink to="/login" className="link" activeClassName="is-active">
                LOG IN
              </NavLink>
              <NavLink
                to="/signup"
                className="link"
                activeClassName="is-active"
              >
                SIGN UP
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
