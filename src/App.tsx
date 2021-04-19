import React from "react";
import { Route, Switch } from "react-router-dom";
import "./assets/scss/style.scss";
import Header from './components/header'
import Main from "./components/main";
import Favorites from "./components/main/favorites";

const App: React.FC = () => {
  return (
    <div className='wrapper'>
        <Header/>
        <Switch>
          <Route exact path='/' component={ Main }/>
          <Route path='/favorites' component={ Favorites }/>
          <Route path='*' component={ Main } />
        </Switch>
    </div>
  );
};

export default App;
