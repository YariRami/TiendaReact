import React from "react";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import CardList from "./components/CardList/CardList";

//REACT-ROUTER-DOM
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//PAGES
import HomePage from "./pages/HomePage/HomePage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import DetailPage from "./pages/DetailPage/DetailPage";


const App = () => { {
    return(
      <Router>
        
      <div className="App">
        <NavBar/>
        <Routes>
          <Route  path="/" element={<HomePage/>} />
          <Route  path="/category" element={<CategoryPage/>} />
          <Route  path="/detail/:id" element={<DetailPage/>} />
      </Routes>
      </div>

      <CardList/>
      </Router>
    )
  }
}

export default App;