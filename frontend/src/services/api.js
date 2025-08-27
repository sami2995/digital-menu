import axios from "axios";

// Backend URL
const API = axios.create({ baseURL: "process.env.REACT_APP_API_URL" });

export default API;
