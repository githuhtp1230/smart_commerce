import axios from "axios";

const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_SMART_COMMERCE_API,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default httpRequest;
