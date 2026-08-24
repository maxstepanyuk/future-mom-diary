import axios from "axios";

export const nextApi = axios.create({
  baseURL: `/api`,
  withCredentials: true, // дозволяє axios працювати з cookie
});
