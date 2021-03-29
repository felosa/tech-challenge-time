import React, { useState, useEffect } from "react";
import { users as usersAPI } from "../../api";
import { AuthenticatedRoutes } from "../../routes/AuthenticatedRoutes";
import { UnauthenticatedRoutes } from "../../routes/UnauthenticatedRoutes";
import "./App.css";

export function App() {
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("user") || "";
    console.log(token, "token");
    if (token !== "") {
      usersAPI
        .isLogged(token)
        .then((results) => {
          console.log(results, "resultados");
          // fetchPendingStudents(results.user.id);
          setUser(results.user);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err, "error");
          setUser("");
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div>Loading</div>;
  }
  return (
    <div className="App">
      {user ? (
        <AuthenticatedRoutes></AuthenticatedRoutes>
      ) : (
        <UnauthenticatedRoutes></UnauthenticatedRoutes>
      )}
    </div>
  );
}
