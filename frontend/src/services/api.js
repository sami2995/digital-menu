import axios from "axios";

// Backend URL
const API = axios.create({ baseURL: "http://localhost:5000" });

export default API;
