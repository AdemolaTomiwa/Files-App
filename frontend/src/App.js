import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/style.css';
import HomePage from './screens/HomePage';

class App extends Component {
   render() {
      return (
         <Router>
            <div className="container">
               <Routes>
                  <Route path="/" element={<HomePage />} />
               </Routes>
            </div>
         </Router>
      );
   }
}

export default App;
