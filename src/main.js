import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import store from './store/ticket-it'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'

const vuetify = createVuetify({
  components,
  directives
})

const app = createApp(App)
app.use(vuetify)
app.use(ToastPlugin)
app.use(router)
app.mount('#app')
app.use(store)
