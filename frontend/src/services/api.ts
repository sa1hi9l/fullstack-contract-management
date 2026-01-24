import axios from "axios";

export const api = axios.create({
  baseURL: "https://fullstack-contract-management.onrender.com",
  headers: {
    "Content-Type": "application/json"
  }
});
