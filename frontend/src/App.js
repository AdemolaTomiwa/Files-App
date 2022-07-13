import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './store';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import './css/style.css';
import HomePage from './screens/HomePage';
import LoginPage from './screens/LoginPage';
import RegisterPage from './screens/RegisterPage';
import LandingPage from './screens/LandingPage';
import FilePage from './screens/FilePage';
import Footer from './components/Footer';
import CreateFilePage from './screens/CreateFilePage';
import AddFieldPage from './screens/AddFieldPage';
import AllFilesPage from './screens/AllFilesPage';
import PhotosPage from './screens/PhotosPage';
import SearchPage from './screens/SearchPage';
import UserButton from './components/UserButton';
import ProfilePage from './screens/ProfilePage';

class App extends Component {
   render() {
      return (
         <Provider store={store}>
            <Router>
               <Header />
               <div className="container">
                  <Routes>
                     <Route path="/" element={<HomePage />} />
                     <Route path="/register" element={<RegisterPage />} />
                     <Route path="/login" element={<LoginPage />} />
                     <Route path="/landing" element={<LandingPage />} />
                     <Route path="/files" element={<AllFilesPage />} />
                     <Route path="/files/:id" element={<FilePage />} />
                     <Route path="/createfile" element={<CreateFilePage />} />
                     <Route path="/addfield/:id" element={<AddFieldPage />} />
                     <Route path="/photos" element={<PhotosPage />} />
                     <Route path="/search" element={<SearchPage />} />
                     <Route path="/search/:keyword" element={<SearchPage />} />
                     <Route path="/profile" element={<ProfilePage />} />
                  </Routes>
               </div>
               <UserButton />
               <Footer />
            </Router>
         </Provider>
      );
   }
}

export default App;
