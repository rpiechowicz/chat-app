import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import install from './build'

const app = createApp(App)

app.use(router)
app.use(install)
app.mount('#app')
