import axios from "axios";
import { APIKeyInterceptor } from "./Interceptors";
import { API_SEARCH } from "./URL";
const getInstance = () => {
  const instance = axios.create({
    baseURL: "https://content.guardianapis.com/",
    timeout: 120000,
  });

  instance.interceptors.request.use(APIKeyInterceptor.addAPIKey);

  return instance;
};

const API = {
  instance: getInstance(),
  switchServer: () => {
    API.instance = getInstance();
  },

  search: (params: any) => {
    return API.instance.get(API_SEARCH, { params });
  },

  detail: (id: string, params?: any) => {
    return API.instance.get(`${id}`, { params });
  },
};

export default API;
