import React from "react";
import { Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

export const UnauthenticatedRoutes = ({ isLoggedIn }) => (
  <>
    <Route exact path={["/"]} component={Login} />
    <Route exact path={["/login"]} component={Login} />
    <Route exact path={["/signup"]} component={Signup} />
  </>
);
