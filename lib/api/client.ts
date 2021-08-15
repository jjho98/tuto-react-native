import axios from "axios";

const client = axios.create({
  baseURL: "http://3.21.28.114",
  withCredentials: true,
});

export default client;
