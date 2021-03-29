import { useState, useEffect, useContext } from "react";
import { users as usersAPI } from "../api";
import { AuthContext } from "../context/auth/auth";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("user") || "";
    console.log(token, "token");
    if (token !== "") {
      usersAPI
        .isLogged(token)
        .then((results) => {
          console.log(results, "resultados");
          setUser(results.user);
          setloading(false);
        })
        .catch((err) => {
          console.log(err, "error");
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
    console.log(res.user, "user viene de login");
    setUser(res.user);
  };
  
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  console.log(user, "usuario en hook");

  return {
    user,
    login,
    logout,
    loading,
  };
};
