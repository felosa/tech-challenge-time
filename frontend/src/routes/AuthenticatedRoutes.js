import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { CurrentSessions } from "../pages/CurrentSessions/CurrentSessions";
import FinishedSessions from "../pages/FinishedSessions";

console.log("esta entrando aqui");

export const AuthenticatedRoutes = () => (
  <>
    <Route
      exact={true}
      path="/"
      render={(props) => <CurrentSessions {...props} />}
    />
    <Route
      exact={true}
      path="/finished-sessions"
      render={(props) => <FinishedSessions {...props} />}
    />
  </>
);
