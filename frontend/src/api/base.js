const API_NAME =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000/"
    : "deployURL";

export default API_NAME;
