import React, { useState, useEffect } from "react";
import { Link, BrowserRouter as Router, Switch } from "react-router-dom";
import { users as usersAPI } from "../../api";
import { AuthProvider } from "../../context/auth/auth";
import { useAuth } from "../../hooks/useAuth";
import { AuthenticatedRoutes } from "../../routes/AuthenticatedRoutes";
import { UnauthenticatedRoutes } from "../../routes/UnauthenticatedRoutes";
import "./App.css";

export function App() {
  const { user, login, logout, loading } = useAuth();
  console.log(user, "user");
  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <div className="App">
      <AuthProvider value={{ user, login }}>
        <Switch>
          {user ? (
            <>
              <button
                onClick={() => {
                  logout();
                }}
              >
                Log out
              </button>
              <Link to="/">TRACK</Link>
              <Link to="/finished-sessions">FInished</Link>
              <AuthenticatedRoutes></AuthenticatedRoutes>
            </>
          ) : (
            <UnauthenticatedRoutes></UnauthenticatedRoutes>
          )}
        </Switch>
      </AuthProvider>
    </div>
  );
}
