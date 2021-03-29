import { useState, useEffect, useContext } from "react";
import { users as usersAPI } from "../api";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("user") || "";
    if (token !== "") {
      usersAPI
        .isLogged(token)
        .then((results) => {
          setUser(results.user);
          setloading(false);
        })
        .catch((err) => {
          setUser("");
          setloading(false);
        });
    } else {
      setloading(false);
    }
  }, []);

  const login = (res) => {
    if (res.token === undefined) return;
    localStorage.setItem("user", res.token);
    setUser(res.user);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return {
    user,
    login,
    logout,
    loading,
  };
};
