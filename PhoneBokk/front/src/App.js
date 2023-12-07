import Signup from './components/signup';
import Signin from './components/signin';
import Header from './components/header';
import Contact from './components/contact'

import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {

  return (
    <div className="App">
     <Router>
      <Header />
      <Switch>
        <Route exact path='/'>
          <Signin />
          </Route> 
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path='/contact'>
          <Contact />
        </Route>
      </Switch>
     </Router>
    </div>
  );
}

export default App;
