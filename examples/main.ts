import { createApp } from 'vue'
import './style.css'
import vueRouter from './router/index'
import App from './App.vue'

createApp(App).use(vueRouter).mount('#app')