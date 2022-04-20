export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "todolist",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  target: "static",

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/css/main.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxt/postcss8"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "@nuxtjs/auth-next"],
  axios: {
    baseURL: "https://todosnuxt.hasura.app/api/rest", // Used as fallback if no runtime config is provided
  },
  auth: {
    redirect: {
      login: "/login",
    },
    strategies: {
      local: {
        token: {
          property: "login.token",
          global: true,
        },
        user: {
          property: "user",
        },
        endpoints: {
          login: {
            url: "https://todosnuxt.hasura.app/api/rest/login",
            method: "post",
          },
          logout: {
            url: "https://todohmx.herokuapp.com/signout",
            method: "delete",
          },
          user: { url: "https://todohmx.herokuapp.com/user/me", method: "get" },
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
        "postcss-import": true,
      },
    },
  },
};
