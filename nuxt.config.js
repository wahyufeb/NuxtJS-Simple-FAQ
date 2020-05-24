export default {
  mode: "spa",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    "bootstrap-vue/nuxt",
    "@nuxtjs/axios"
    // "@nuxtjs/auth"
  ],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  axios: {
    baseURL: "http://localhost:4000"
  }
  // auth
  // auth: {
  //   strategies: {
  //     local: {
  //       endpoints: {
  //         login: {
  //           url: "/auth/login",
  //           method: "post",
  //           propertyName: "data.token"
  //         },
  //         user: {
  //           url: "/auth/admin/data",
  //           method: "get",
  //           propertyName: "data"
  //         }
  //       },
  //       tokenRequired: true,
  //       tokenType: "bearer"
  //     }
  //   },
  //   redirect: {
  //     login: "/login",
  //     logout: "/login",
  //     home: "/admin"
  //   },
  //   watchLoggedIn: true,
  //   rewriteRedirects: false,
  //   resetOnError: true
  // }
};
