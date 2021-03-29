import { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../../context/auth/auth";
import "./Nav.css";

export const Nav = () => {
  const [redirect, setRedirect] = useState(false);
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/"></Redirect>;
  }

  return (
    <div className="nav-container">
      <Link to="/current-sessions">Current Sessions</Link>
      <Link to="/finished-sessions">My Sessions</Link>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};
