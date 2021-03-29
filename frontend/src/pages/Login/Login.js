import React, { useState } from "react";
import { Redirect } from "react-router";
import { users as usersApi } from "../../api";

export const Login = ({ user = null, reloadUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleForSubmit = (event) => {
    event.preventDefault();
    const user = { email: email, password: password };
    usersApi
      .login(user)
      .then((response) => {
        localStorage.setItem("user", response.token);
        console.log(localStorage.getItem("user"));
        // reloadUser(response.user);
        setRedirect(true);
        setError("");
      })
      .catch((err) => {
        setError("Usuario o contraseña incorrectos");
      });
  };


  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div className={""}>
      <form onSubmit={(e) => handleForSubmit(e)}>
        <p>Usuario</p>
        <input
          required
          variant="outlined"
          size="small"
          type="email"
          placeholder="Usuario"
          value={email}
          onChange={(newValue) => setEmail(newValue.target.value)}
        ></input>
        <p>Password</p>
        <input
          required
          type="password"
          placeholder="*********"
          value={password}
          onChange={(newValue) => setPassword(newValue.target.value)}
        ></input>
        <button type="submit">
          ENTRAR
        </button>
      </form>
    </div>
  );
};
