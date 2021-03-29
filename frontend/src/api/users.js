import axios from "axios";
import API_NAME from "./base";

class AuthApi {
  constructor() {
    this.service = axios.create({
      baseURL: `${API_NAME}api/users`,
      withCredentials: true,
    });
  }

  signup = (user) => {
    return this.service
      .post("/", user)
      .then((response) => response.data)
      .catch((err) => console.error(err));
  };

  login = (user) => {
    return this.service
      .post("/login", user)
      .then((response) => response.data)
      .catch((err) => console.error(err));
  };

  isLogged = (token) => {
    return this.service
      .get(`/isLogged/${token}`)
      .then((response) => response.data)
      .catch((err) => console.error(err));
  };
}

const users = new AuthApi();
export default users;
