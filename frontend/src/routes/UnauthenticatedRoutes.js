import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "../pages/Login";
import NotFound from "../pages/Not-Found";

export const UnauthenticatedRoutes = ({ isLoggedIn }) => (
  <Router basename="/">
    <Switch>
      <Route exact path={["/", "/login"]} component={Login} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);
