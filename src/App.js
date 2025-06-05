import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Collection from './collection.js';
import OpenPack from "./openpack.js";

function App() {
  return (
    <Router>
       <Routes>
        <Route path="/" element={
          <div className="page">
            <h2>poketcg</h2>
            <div className="section">
                <Link to="/openpack">
                open a pack
                <img src="https://www.riffleshuffle.com/cdn/shop/products/as-min_0a9c5129-8b20-45af-9140-1d3416d94c87_960x.png?v=1638564098" alt="packimg"/>
                </Link>
            </div>
            <div className="section">
                <Link to="/collection"> my collection</Link>
            </div>
          </div> 
          } 
        />
        <Route path="/collection" element={<Collection />} />
        <Route path="/openpack" element={<OpenPack />} />
      </Routes>
    </Router>
  );
}

export default App;
