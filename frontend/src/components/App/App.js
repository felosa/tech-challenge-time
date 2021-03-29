import React, { useState, useEffect } from "react";
import { Switch } from "react-router-dom";
import { AuthProvider } from "../../context/auth/auth";
import { useAuth } from "../../hooks/useAuth";
import { AuthenticatedRoutes } from "../../routes/AuthenticatedRoutes";
import { UnauthenticatedRoutes } from "../../routes/UnauthenticatedRoutes";
import Nav from "../Nav";
import "./App.css";

export function App() {
  const { user, login, loading, logout } = useAuth();

  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <div className="App">
      <AuthProvider value={{ user, login, logout }}>
        <Switch>
          {user ? (
            <>
              <Nav></Nav>
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
