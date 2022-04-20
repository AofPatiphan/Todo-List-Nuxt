export const getToken = function () {
  if (process.server) {
    return;
  }
  if (window.$nuxt) {
    return window.$nuxt.$auth.strategy.token.get("local");
  }
};
