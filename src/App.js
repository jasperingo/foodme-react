
import React, { useEffect } from 'react';
import { useLocation } from "react-router";
import { Switch, Route } from "react-router-dom";
import i18n from './locales/i18n';
import { useAppContext } from "./context/AppContext";
import { NAVIGATED, NAVIGATED_FROM_SEARCH } from "./context/AppActions";
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Cart from './pages/Cart';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import TermsOfService from './pages/TermsOfService';
import Categories from './pages/Categories';
import SearchHistory from './pages/SearchHistory';
import Register from './pages/Register';
import './styles/App.css';


function App() {

  i18n.changeLanguage('en');

  const { dispatch } = useAppContext();

  let location = useLocation();

  useEffect(() => {
    if (['/', '/categories', '/cart', '/search'].indexOf(location.pathname) < 0) {
      dispatch({
        type: NAVIGATED,
        payload: false
      });
    } else {
      dispatch({
        type: NAVIGATED,
        payload: true
      });
    }

    if (location.pathname === '/search') {
      dispatch({
        type: NAVIGATED_FROM_SEARCH,
        payload: true
      });
    } else {
      dispatch({
        type: NAVIGATED_FROM_SEARCH,
        payload: false
      });
    }

  }, [location, dispatch]);

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


