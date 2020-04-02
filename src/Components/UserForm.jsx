import React, { Component } from "react";
import APIHandler from "../Api/APIHandler";
import "../styles/user-form.css";
import CustomInputFile from "../Components/IconAvatarAdmin";

export default class UserForm extends Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    avatar: "",
    avatarTmp: ""
  };

  componentDidMount() {
    this.setState({
      firstname: this.props.user.firstname,
      lastname: this.props.user.lastname,
      email: this.props.user.email,
      avatar: this.props.user.avatar
    });
  }
  handleSubmit = e => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("firstname", this.state.firstname);
    fd.append("lastname", this.state.lastname);
    fd.append("email", this.state.email);
    fd.append("avatar", this.state.avatar);

    //var newUser = this.state;
    APIHandler.patch(`/users/${this.props.user._id}`, fd)
      .then(apiRes => {
        this.props.setCurrentUser(apiRes.data.currentUser);
        //this.props.history.push("/");
      })
      .catch(apiErr => console.log(apiErr));
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleAvatar = file => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // when the fileReader ends reading image  ...
      const base64String = reader.result;
      // add the actual file to the state + the tmp logo as a preview before upload
      this.setState({ avatar: file, avatarTmp: base64String });
    };
    reader.readAsDataURL(file); // read the file from the local disk
  };

  render() {
    return (
      <div>
        <form onChange={this.handleChange}>
          <label htmlFor="firstname">First Name</label>
          <input
            name="firstname"
            className="input"
            id="firstname"
            type="text"
            defaultValue={this.state.firstname}
          />
          <label htmlFor="lastname">Last Name</label>
          <input
            name="lastname"
            className="input"
            id="lastname"
            type="text"
            defaultValue={this.state.lastname}
          />

          <label htmlFor="email">Email</label>
          <input
            name="email"
            className="input"
            id="email"
            type="email"
            defaultValue={this.state.email}
          />
          <label htmlFor="avatar">Avatar</label>
          <CustomInputFile
            avatar={this.state.avatarTmp || this.state.avatar}
            clbk={e => this.handleAvatar(e.target.files[0])}
          />

          {/* <label htmlFor="password">Password</label>
    <input 
      name="password"
      className="input" 
      id="password" 
      type="password" 
    />

    <label htmlFor="new_password">New password</label>
    <input
      name="new_password"
      className="input"
      id="new_password"
      type="text"
    /> */}
          <button onClick={this.handleSubmit} className="button">
            UPDATE
          </button>
        </form>
      </div>
    );
  }
}
