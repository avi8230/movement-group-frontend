import axios from "axios";

axios.defaults.withCredentials = true; // Allow sending cookies (JWT)

export default axios;
