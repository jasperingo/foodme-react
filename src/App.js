
import React from 'react';
import { Switch, Route } from "react-router-dom";
import i18n from './locales/i18n';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Cart from './pages/Cart';
import UserAccount from './pages/UserAccount';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import TermsOfService from './pages/TermsOfService';
import Categories from './pages/Categories';
import SearchHistory from './pages/SearchHistory';
import Register from './pages/Register';
import './styles/App.css';


function App() {

  i18n.changeLanguage('en');

  return (
    <>
      <Header />
      <main className="pb-20">
        <Switch>
          <Route path="/terms-of-service">    
            <TermsOfService />
          </Route>
          <Route path="/contact-us">    
            <ContactUs />
          </Route>
          <Route path="/about-us">    
            <AboutUs />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/search">
            <SearchHistory />
          </Route>
          <Route path="/account">
            <UserAccount />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/categories">
            <Categories />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </main>
      <Footer />
    </>
  );
}

export default App;


