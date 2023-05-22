<!--
 * @Author: chen qi
 * @Date: 2023-03-20 17:23:31
 * @LastEditors: chen qi
 * @LastEditTime: 2023-04-17 16:54:34
 * @Description: ~
-->
<template>
  <div class="">
    <div
      class="w-200px h-200px border-1px"
      @dragenter="dragenter"
      @dragover="dragover"
      @drop="drop"
    >
      <input
        type="file"
        name=""
        id=""
        @change="change"
        class="w-200px h-200px opacity-0 hidden"
      />
    </div>
  </div>
</template>

<script setup name="CqUpload" lang="ts">
import SparkMD5 from 'spark-md5'
import axios from 'axios'
import { ref } from 'vue'
const alreadyUpload = ref(0)
const cancelList = []
const CancelToken = axios.CancelToken
// 配置
const option = {
  size: 1024 * 20 //20kB 切片大小，可以调大点
}
const dragenter = (e) => {
  e.preventDefault()
}

const dragover = (e) => {
  e.preventDefault()
}

const drop = (e) => {
  e.preventDefault()
  console.dir(e)
  console.dir(e.dataTransfer.files.length)
  console.dir(e.dataTransfer.files[0])
  console.log('e', e.dataTransfer.getData('1'))
}

const change = async (e) => {
  // 单文件上传
  const file = e.target.files[0]
  console.log(file)
  // 文件名
  const filename = file.name.split('.')[0]
  // 切片
  const chunkList = getChunkList(file, option.size)

  // 文件hash
  const hash = await getFileHash(chunkList)

  // 上传之前先获取，有没有上传过
  const res = await axios.get('/api/alreadyFile', {
    params: { filename },
    cancelToken: new CancelToken((c) => {
      cancelList.push(c)
    })
  })
  console.log(res)
  alreadyUpload.value = res.data.length
  if (res.data.length !== chunkList.length) {
    for (let index = 0; index < chunkList.length; index++) {
      const item = chunkList[index]
      let formData = new FormData()
      formData.append('filename', filename)
      formData.append('hash', String(item.hash))
      formData.append('chunk', item.file)
      if (res.data.indexOf(index) === -1) {
        axios({
          method: 'post',
          url: '/api/upload',
          data: formData,
          cancelToken: new CancelToken(function executor(c) {
            cancelList.push(c)
          })
        })
          .then((res) => {
            alreadyUpload.value = alreadyUpload.value + 1
          })
          .catch(() => {})
      } else {
        continue
      }
    }
  }
}

const getChunkList = (
  file: File,
  size: number
): { hash: number; file: Blob }[] => {
  const chunkList = []
  for (let i = 0; i < file.size / size; i++) {
    chunkList.push({
      hash: i,
      file: file.slice(i * size, (i + 1) * size)
    })
  }
  return chunkList
}

/**
 * @description:
 * @param {*} chunkList
 * @return {*}
 * @author: chen qi
 */
const getFileHash = (chunkList: { index: number; file: Blob }[]) => {
  const spark = new SparkMD5()
  return new Promise((resolve) => {
    const _read = (i) => {
      if (i >= chunkList.length) {
        resolve(spark.end())
        return
      }
      const blob = chunkList[i].file
      const reader = new FileReader()
      reader.onload = (e) => {
        spark.append(e.target.result)
        _read(i + 1)
      }
      reader.readAsArrayBuffer(blob)
    }
    _read(0)
  })
}
</script>

<style lang="" scoped></style>
