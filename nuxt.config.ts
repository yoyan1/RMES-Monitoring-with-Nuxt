// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', "@nuxt/icon", "nuxt-vuefire"],
  vuefire: {
    config: {
      apiKey: "AIzaSyANm3upeIbvRZ2sEOfUQjt9iSTGgR2jnHg",
      authDomain: "rmes-monitoring-system.firebaseapp.com",
      projectId: "rmes-monitoring-system",
      storageBucket: "rmes-monitoring-system.appspot.com",
      messagingSenderId: "610369031733",
      appId: "1:610369031733:web:57a4a5ece2c9fa3c982b7c",
      measurementId: "G-BRZNQNTLP1"
      // there could be other properties depending on the project
    },
  },
})