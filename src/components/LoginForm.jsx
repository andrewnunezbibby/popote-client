import React, { useState, useContext } from "react";
import "./../styles/login.css";
import APIHandler from "./../Api/APIHandler";
import UserContext from "../auth/UserContext";
import { Link, withRouter } from "react-router-dom";

export default withRouter(function LoginForm(props) {
  const [email, setEmail] = useState("admin@popote.io");
  const [password, setPassword] = useState("12345");
  // const userContext = useContext(UserContext);
  // const { setCurrentUser } = userContext;

  const submitForm = async e => {
    e.preventDefault();
    try {
      const apiRes = await APIHandler.post("/auth/login", { email, password });
      // setCurrentUser(apiRes.data.currentUser);
      // console.log(userContext);
      props.history.push("/");
    } catch (err) {
      // setCurrentUser(null);
    }
  };

  return (
    <div className="form-area">
      <div className="container">
        <form onSubmit={submitForm}>
          <label htmlFor="email">Email address</label>
          <input
            name="email"
            className="input"
            id="email"
            type="email"
            defaultValue={email}
            onChange={e => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            name="password"
            className="input"
            id="password"
            type="password"
            defaultValue={password}
            onChange={e => setPassword(e.target.value)}
          />
          <span>
            No account yet ? <a href="/signup">Create one</a>
          </span>
          <button className="btn-create">CONNECT</button>
        </form>
      </div>
    </div>
  );
});
