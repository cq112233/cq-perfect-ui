/*
 * @Author: chen qi
 * @Date: 2023-03-13 22:39:10
 * @LastEditors: chen qi
 * @LastEditTime: 2023-03-25 23:42:10
 * @Description: ~
 */
/// <reference types="vite/client" />

declare module "*.vue" {
  import {ComponentOptions} from "vue";
  const componentOptions:ComponentOptions
  export default componentOptions
 }
 
 declare interface Window {
  _cqDragTargeting: any
}