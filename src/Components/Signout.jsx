import React, { useContext } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import APIHandler from "../Api/APIHandler";
import UserContext from "../auth/UserContext";
import { withRouter } from "react-router-dom";

export default withRouter(function IconSignout(props) {
  const userContext = useContext(UserContext);
  const { setCurrentUser } = userContext;

  const handleSignout = () =>
    APIHandler.post("/auth/signout").finally(() => {
      props.history.push("/");
      // setCurrentUser(null);
    });

  return (
    <span className="link link-span" onClick={handleSignout}>
      SIGNOUT
    </span>
  );
});
