import React, { Component } from "react";
import NavBar from "../Components/NavBar";
import APIHandler from "../Api/APIHandler";
import IconAvatarImage from "./../icon/IconAvatarImage";
import "./../styles/signup.css";

export default class Signup extends Component {
  state = {
    avatar: "",
    tmpAvatar: "",
    firstname: "Pierre",
    lastname: "Turtle",
    email: "admin@popote.io",
    password: "12345"
  };

  handleSubmit = async e => {
    e.preventDefault();

    const fd = new FormData();
    // create a form data (programatic form, to send the file as binary)
    fd.append("email", this.state.email);
    fd.append("password", this.state.password);
    fd.append("firstname", this.state.firstname);
    fd.append("lastname", this.state.lastname);
    fd.append("avatar", this.state.avatar);

    try {
      await APIHandler.post("/auth/signup", fd);
      console.log("ok");

      this.props.history.push("/login");
    } catch (err) {
      console.error(err);
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleImage = e => {
    // console.log("Signup@handle image", e.target.files[0]);
    this.setState({ avatar: e.target.files[0] }, () => {
      const reader = new FileReader();
      reader.onloadend = () => {
        // when the fileREader ends  ...
        const baseString = reader.result; // get the image as a base64 encoded string
        this.setState({ tmpAvatar: baseString }); // set the tmp avatar as an image source before upload
      };
      reader.readAsDataURL(this.state.avatar); // read the file from the local disk
    });
  };

  render() {
    const { email, password, lastname, firstname, tmpAvatar } = this.state;
    return (
      <>
        <NavBar />
        <div className="form-area">
          <div className="container">
            <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
              <label htmlFor="firstname">First name</label>
              <input
                name="firstname"
                className="input-signin"
                id="firstname"
                type="text"
                defaultValue={firstname}
              />
              <label htmlFor="name">Last name</label>
              <input
                name="lastname"
                className="input-signin"
                id="name"
                type="text"
                defaultValue={lastname}
              />

              <label htmlFor="email">Email address</label>
              <input
                name="email"
                className="input"
                id="email"
                type="email"
                defaultValue={email}
              />

              <label htmlFor="password">Password</label>
              <input
                name="password"
                className="input"
                id="password"
                type="password"
                defaultValue={password}
              />
              {/* <label className="label" htmlFor="avatar">
                                avatar
                            </label> */}

              <div className="avatar-session">
                <label className="label" htmlFor="avatar">
                  Avatar
                </label>
                <IconAvatarImage avatar={tmpAvatar} clbk={this.handleImage} />
              </div>
              <span>
                Already an account ? <a href="/login">Sign in</a>
              </span>
              <button className="btn-signin">SIGN UP</button>
            </form>
          </div>
        </div>
      </>
    );
  }
}
