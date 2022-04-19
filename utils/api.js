import axios from "axios";
const getToken = function () {
  if (process.server) {
    return;
  }
  if (window.$nuxt) {
    return window.$nuxt.$auth.strategy.token.get("local");
  }
};

export async function request(method, url, data, auth = false) {
  const headers = {};
  if (auth) {
    headers["auth-token"] = getToken();
  }
  try {
    // call api
    const res = await axios({
      method,
      url,
      data,
      headers,
    });
    return res;
  } catch (error) {
    return error;
  }
}
