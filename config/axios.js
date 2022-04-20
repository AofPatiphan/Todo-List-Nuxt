import axios from "axios";

const getToken = function () {
  if (process.server) {
    return;
  }
  if (window.$nuxt) {
    return window.$nuxt.$auth.strategy.token.get("local");
  }
};

axios.defaults.baseURL = "https://todosnuxt.hasura.app/api/rest";

axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      console.log("ingetToken");
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default axios;
