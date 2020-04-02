import React, { Component } from "react";
import tesseract from "../Tesseract/test.js";
import Loader from "../Components/Loader.jsx";
import APIHandler from "../Api/APIHandler";

export default class scanTicket extends Component {
  state = {
    uploadFile: [],
    ScanDocuments: [],
    loading: false,
    //this will be taken from the ingredient database
    ingredientsInDb: "",
    //todo need to add the field Ingredientchecked to true .
    matchIngredients: []
  };

  componentDidMount() {
    APIHandler.get("/ingredients")
      .then(apiRes => {
        this.setState({ ingredientsInDb: apiRes.data });
      })
      .catch(apiErr => console.log(apiErr));
  }
  handleChange = event => {
    if (event.target.files[0]) {
      var uploads = [];
      for (var key in event.target.files) {
        if (!event.target.files.hasOwnProperty(key)) continue;
        let file = event.target.files[key];
        uploads.push(URL.createObjectURL(file));
      }
      this.setState({
        uploadFile: uploads
      });
    } else {
      this.setState({
        uploadFile: []
      });
    }
  };

  scanText = () => {
    this.setState({ loading: true });
    let uploads = this.state.uploadFile;

    tesseract
      .getTextFromImage(uploads[0])
      .then(text => {
        var documents = [];
        for (let i = 0; i < text.words.length; i++) {
          documents.push(text.words[i].text);
        }
        this.setState({ ScanDocuments: documents });
        this.setState({ loading: false });
        this.findIngredientsInDb(documents);
      })
      .catch(error => {
        console.log(error);
        this.setState({ ScanDocuments: [] });
        this.setState({ loading: false });
      });
  };

  findIngredientsInDb = documents => {
    const ingredientsInDb = this.state.ingredientsInDb;
    const ingredientsFoundInTicket = documents;
    var matchIngredientsCopy = [...this.state.matchIngredients];

    ingredientsFoundInTicket.map(function(ingredient, i) {
      for (let i = 0; i < ingredientsInDb.length; i++) {
        if (
          ingredientsInDb[i].name.toUpperCase() === ingredient.toUpperCase() ||
          ingredientsInDb[i].name.toUpperCase() ===
            ingredient + "s".toUpperCase()
        ) {
          var ingredientToAdd = {
            id: ingredientsInDb[i]._id,
            name: ingredientsInDb[i].name,
            image: ingredientsInDb.image,
            ingredientChecked: true
          };
          matchIngredientsCopy.push(ingredientToAdd);
          /*copy[index] = ingredientToAdd;
          index++;*/
        }
      }
    });

    this.setState({
      matchIngredients: matchIngredientsCopy
    });
  };

  handleCheckboxChange = (event, i) => {
    const copy = [...this.state.matchIngredients];
    copy[i].ingredientChecked = event.target.checked;
    this.setState({ matchIngredients: copy });
  };
  searchForRecipes = e => {
    e.preventDefault();

    var ingredientsTosend = [];
    for (let i = 0; i < this.state.matchIngredients.length; i++) {
      if (this.state.matchIngredients[i].ingredientChecked)
        ingredientsTosend.push(this.state.matchIngredients[i].name);
    }

    APIHandler.get("/recipes/ingredients", {
      ingredients: ingredientsTosend
    })
      .then(apiRes => {
        this.props.history.push("/recipes", {
          recipes: apiRes.data
        });
      })
      .catch(apiErr => console.log(apiErr));
  };
  render() {
    return (
      <div className="scanTicket-section">
        <div className="scanTicket-left">
          <h2> Scan your groceries ticket to search for recipes </h2>
          <div className="upload-btn-wrapper">
            <label className="fileUploaderContainer">
              Upload your ticket
              <input
                type="file"
                id="fileUploader"
                onChange={this.handleChange}
                multiple
              />
            </label>
          </div>

          <div>
            {this.state.uploadFile.map((value, index) => {
              return (
                <img
                  key={index}
                  src={value}
                  width="200px"
                  alt="TicketPreview"
                />
              );
            })}
          </div>
          {this.state.loading && <Loader></Loader>}
          {!this.state.loading && (
            <button className="button" onClick={this.scanText}>
              {" "}
              Get ingredients
            </button>
          )}
        </div>
        {this.state.matchIngredients.length && (
          <div className="scanTicket-right">
            {this.state.matchIngredients.map((ingredient, i) => (
              <div key={i} className="scan-found-ingredients">
                <label className="checkbox-container">
                  {ingredient.name}
                  <input
                    id={ingredient.id}
                    type="checkbox"
                    value={ingredient.name}
                    checked={this.state.matchIngredients[i].ingredientChecked}
                    onChange={e => this.handleCheckboxChange(e, i)}
                  ></input>
                  <span className="checkmark"></span>
                </label>
                <img src={ingredient.image} alt={ingredient.name + i} />
              </div>
            ))}
            <button onClick={e => this.searchForRecipes(e)} className="button">
              {" "}
              Search For recipes
            </button>
          </div>
        )}
      </div>
    );
  }
}
