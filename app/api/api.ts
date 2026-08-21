import axios from 'axios';

export const serverApi = axios.create({
  baseURL: 'https://lehlehka.b.goit.study',
  withCredentials: true,
});
