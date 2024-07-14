import axios from "axios";

const base_url = "https://todo-list-backend-kappa.vercel.app";

export const register = (data) => axios.post(`${base_url}/registeruser`, data);

export const login = (data) => axios.post(`${base_url}/login`, data)
