import axios from "axios";

const client = axios.create({
  baseURL: "http://3.36.73.112/api",
  withCredentials: true,
});

export default client;
