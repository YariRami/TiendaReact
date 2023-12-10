import React from "react";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import Header from "./components/Header/Header";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";

class App extends React.Component {
  render() {
    return(
      <div className="App">
        <NavBar/>
        <ItemListContainer/>
        <h1>New Moon Skin</h1>
      </div>
    )
  }
}

export default App;