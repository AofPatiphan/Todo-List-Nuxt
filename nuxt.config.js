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
  modules: ["@nuxtjs/axios", "@nuxtjs/auth-next", "@nuxtjs/apollo"],
  axios: {
    baseURL: "https://todosnuxt.hasura.app/api/rest", // Used as fallback if no runtime config is provided
  },
  apollo: {
    clientConfigs: {
      default: "~/apollo/client-configs/default.js",
    },
  },
  // apollo: {
  //   clientConfigs: {
  //     default: {
  //       httpEndpoint: "https://todosnuxt.hasura.app/v1/graphql",
  //     },
  //     wsEndpoint: {
  //       wsEndpoint: "ws://todosnuxt.hasura.app/v1/graphql",
  //     },
  //   },
  // },

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
            url: "http://localhost:3000/api/signout",
            method: "delete",
          },
          user: {
            url: "http://localhost:3000/api/user/me",
            method: "get",
          },
        },
      },
    },
  },

  serverMiddleware: [
    {
      path: "api",
      handler: "~/server/api",
    },
  ],

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
