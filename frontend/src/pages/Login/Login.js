import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import { users as usersApi } from "../../api";
import { AuthContext } from "../../context/auth/auth";
import { useAuth } from "../../hooks/useAuth";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { login } = useAuth(AuthContext);
  

  const handleForSubmit = (event) => {
    event.preventDefault();
    const user = { email: email, password: password };
    usersApi
      .login(user)
      .then((response) => {
        login(response);
        setRedirect(true);
        setError("");
      })
      .catch((err) => {
        setError("Usuario o contraseña incorrectos");
      });
  };

  return (
    <div className={""}>
      <form onSubmit={(e) => handleForSubmit(e)}>
        <p>Email</p>
        <input
          required
          variant="outlined"
          size="small"
          type="email"
          placeholder="email"
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
        <button type="submit">ENTRAR</button>
      </form>
    </div>
  );
};