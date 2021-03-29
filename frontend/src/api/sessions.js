import axios from "axios";
import API_NAME from "./base";

class SessionApi {
  constructor() {
    this.service = axios.create({
      baseURL: `${API_NAME}api/sessions`,
      withCredentials: true,
    });
  }

  getAll = ({
    userID = null,
    orderBy = "name",
    orderDir = "asc",
    page = 1,
    perPage = 10,
  } = {}) => {
    return this.service
      .get(``, {
        params: { userID, orderBy, orderDir, page, perPage },
      })
      .then((response) => response.data)
      .catch((err) => console.error(err));
  };

  getActive = ({ userID = null } = {}) => {
    return this.service
      .get(`/active-sessions`, {
        params: { userID },
      })
      .then((response) => response.data)
      .catch((err) => console.error(err));
  };

  startSession = (data) => {
    return this.service
      .post("", data)
      .then((response) => response.data)
      .catch((err) => console.error(err));
  };

  endSession = (data, ID) => {
    return this.service
      .post(`/${ID}`, data)
      .then((response) => response)
      .catch((err) => console.error(err));
  };

  delete = (ID) => {
    return this.service
      .delete(`/${ID}`)
      .then((response) => response.data)
      .catch((err) => console.error(err));
  };
}

const sessions = new SessionApi();
export default sessions;
