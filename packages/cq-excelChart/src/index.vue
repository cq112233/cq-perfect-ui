<!--
 * @Author: chen qi
 * @Date: 2023-08-11 14:50:00
 * @LastEditors: chen qi
 * @LastEditTime: 2023-08-11 15:09:21
 * @Description: ~
-->
<template>
  <div class='table'>
  </div>
</template>

<script setup name='cq-excelChart' lang='ts'>
import { onMounted } from "vue";
import { excelTable } from "../lib";
onMounted(()=>{
  const table = excelTable.init(document.querySelector('.table'))
  table.setOption({})
})
</script>

<style lang="less" scoped>
.table {
  width:200px;
  height:200px;
}
</style>
