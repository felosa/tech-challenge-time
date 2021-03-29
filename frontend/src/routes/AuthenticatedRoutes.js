import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import CurrentSessions from "../components/CurrentSessions";
import NotFound from "../pages/Not-Found";

console.log("esta entrando aqui");

export const AuthenticatedRoutes = ({ isLoggedIn }) => (
  <Router basename="/">
    <Switch>
      <Route exact path={"/"} component={CurrentSessions} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);
