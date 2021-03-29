import { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../../context/auth/auth";
import "./Nav.css";

export const Nav = () => {
  const [loginRedirect, setLoginRedirect] = useState(false);
  const { logout } = useContext(AuthContext);

  if (loginRedirect) {
    <Redirect to="/"></Redirect>;
  }
  return (
    <div className="nav-container">
      <Link to="/">Current Sessions</Link>
      <Link to="/finished-sessions">My Sessions</Link>
      <button
        onClick={() => {
          logout();
          setLoginRedirect(true);
        }}
      >
        Log out
      </button>
    </div>
  );
};
