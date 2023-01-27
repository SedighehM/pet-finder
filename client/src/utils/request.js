import axios from "axios";

const baseUrl = "http://localhost:4545/pet-finder";

//create an axios request to use in other services
const service = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
});
export default service;
