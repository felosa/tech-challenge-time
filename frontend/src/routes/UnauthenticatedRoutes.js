import { Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

export const UnauthenticatedRoutes = () => (
  <>
    <Route exact={true} path="/" render={(props) => <Login {...props} />} />
    <Route
      exact={true}
      path="/signup"
      render={(props) => <Signup {...props} />}
    />
  </>
);
