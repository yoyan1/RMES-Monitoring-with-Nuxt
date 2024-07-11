// https://nuxt.com/docs/api/configuration/nuxt-config
import {resolve} from 'path'
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', "@nuxt/icon", "nuxt-vuefire"],
  alias: {
    "@": resolve(__dirname, "/")
  },
  vuefire: {
    // auth: {
    //   enabled: true
    // },
    config: {
      
      // there could be other properties depending on the project
    },
  },
})