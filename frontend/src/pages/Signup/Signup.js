import React, { useState } from "react";
import { users as usersApi } from "../../api";

export const Signup = ({ user = null, reloadUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleForSubmit = (event) => {
    event.preventDefault();
    const user = { email: email, password: password };
    usersApi
      .signup(user)
      .then((response) => {
        localStorage.setItem("user", response.token);
        reloadUser(response.user);
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
        <button type="submit">CREATE</button>
      </form>
    </div>
  );
};
