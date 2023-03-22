/*
 * @Author: chen qi
 * @Date: 2023-03-13 22:39:10
 * @LastEditors: chen qi
 * @LastEditTime: 2023-03-21 23:43:24
 * @Description: ~
 */
import { createApp } from 'vue'
import './style.css'
import vueRouter from './router/index'
import App from './App.vue'
import x from '../packages/index'
import 'virtual:windi.css'
import '@surely-vue/table/dist/index.css'

createApp(App).use(vueRouter).use(x).mount('#app')