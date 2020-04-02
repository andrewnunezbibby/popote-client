import React, { Component } from "react";
import ScanTicket from "../Components/ScanTicket";
import NavBar from "../Components/NavBar";
import "../styles/scanTicket.css";

export default class SearchRecipeWithScanTicket extends Component {
  render() {
    return (
      <div>
        <NavBar></NavBar>
        <div className="space"></div>
        <ScanTicket history={this.props.history}></ScanTicket>
      </div>
    );
  }
}
