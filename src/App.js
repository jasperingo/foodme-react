
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import i18n from './locales/i18n';
import { AppProvider } from "./context/AppContext";
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Categories from './pages/Categories';
import './styles/App.css';

function App() {

  i18n.changeLanguage('en');

  return (
    <AppProvider>
      <Router>
        <Header />
        <main className="pb-16 mb-5">
          <Switch>
            <Route path="/login">
              <Login />
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
      </Router>
    </AppProvider>
  );
}

export default App;


