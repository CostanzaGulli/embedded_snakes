/*!

=========================================================
* Paper Kit React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Firebase, { FirebaseContext } from './components/Firebase';

// styles
import "assets/css/bootstrap.min.css";
import "assets/scss/paper-kit.scss";
import "assets/demo/demo.css";
// pages
import Index from "views/Index.js";
import App from "views/App.js"
import LandingPage from "views/LandingPage.js";
import ProfilePage from "views/ProfilePage.js";
import TeamView from "views/TeamView.js"


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route 
        path="/documentation" 
        render={props => <Index {...props} />} 
      />
      <Route
        path="/index"
        render={props => <LandingPage {...props} />}
      />
      <Route
        path="/team"
        render={props => <TeamView {...props} />}
      />
      <Route
        path="/profile"
        render={props => <ProfilePage {...props} />}
      />
      <Route 
        path="/app" 
        render={props => <App {...props} />}
      />
      <Redirect to="/index" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
