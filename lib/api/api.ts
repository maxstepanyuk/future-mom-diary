import axios from "axios";

export const nextApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  withCredentials: true, // дозволяє axios працювати з cookie
});
