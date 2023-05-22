/*
 * @Author: chen qi
 * @Date: 2023-03-13 22:39:10
 * @LastEditors: chen qi
 * @LastEditTime: 2023-04-18 10:02:12
 * @Description: ~
 */
import { createApp } from 'vue'
import './style.css'
import vueRouter from './router/index'
import App from './App.vue'
import x from '../packages/index'
import 'virtual:windi.css'
import STable from '@surely-vue/table';
import '@surely-vue/table/dist/index.css'
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';

createApp(App).use(vueRouter).use(Antd).use(STable).use(x).mount('#app')