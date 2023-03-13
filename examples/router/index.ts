/*
 * @Author: chen qi
 * @Date: 2023-03-13 23:39:37
 * @LastEditors: chen qi
 * @LastEditTime: 2023-03-13 23:49:46
 * @Description: ~
 */

import {  createRouter,createWebHashHistory } from 'vue-router'
import Home from '../components/Home.vue'
import About from '../components/About.vue'

export default createRouter({
  history:createWebHashHistory(),
  routes:[
    { path: '/', component:Home  },
    { path: '/about', component: About },
  ]
})