import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { CurrentSessions } from "../pages/CurrentSessions/CurrentSessions";
import FinishedSessions from "../pages/FinishedSessions";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import { AuthContext } from "../context/auth/auth";
import Nav from "../components/Nav";

export const PrivateRoute = ({ path, component, exact }) => {
  const { user } = useContext(AuthContext);
  return user ? (
    <Route path={path} exact={exact} component={component} />
  ) : (
    <Redirect to="/" />
  );
};

const Routes = () => {
  const { user } = useContext(AuthContext);
  return (
    <Router basename="/">
      {user ? <Nav /> : null}
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute
          exact
          path="/current-sessions"
          component={CurrentSessions}
        />
        <PrivateRoute
          exact
          path="/finished-sessions"
          component={FinishedSessions}
        />

        <Route exact path="/signup" component={Signup} />
        {/* <Route exact path={['/', '/login']} component={Login} />
      <PrivateRoute exact path="/list" component={UserList} />
      <PrivateRoute exact path="/detail" component={Detail} />
      <Route path="*" component={NotFound} /> */}
      </Switch>
    </Router>
  );
};

export default Routes;
