import { Route } from "react-router-dom";
import { CurrentSessions } from "../pages/CurrentSessions/CurrentSessions";
import FinishedSessions from "../pages/FinishedSessions";

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
