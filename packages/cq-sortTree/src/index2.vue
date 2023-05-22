<template>
  <div>
    <div class="func-bed">
      <a-button-group>
        <a-button @click="upLevel">升级</a-button>
        <a-button @click="downLevel" type="primary">降级</a-button>
      </a-button-group>
      <a-button-group>
        <a-button>上移</a-button>
        <a-button type="primary">下移</a-button>
      </a-button-group>
    </div>
    <a-table
      v-if="tableShow"
      :columns="columns"
      :data-source="dataList"
      :pagination="false"
      :rowSelection="rowConfig"
      @expandedRowsChange="expandedTable"
      :expandedRowKeys="expandKeysList"
      rowKey="id"
    >
    </a-table>
  </div>
</template>
<script>
import Sortable from 'sortablejs'
import {   Switch as ASwitch,   Table as ATable,   Space as ASpace ,Button as AButton,ButtonGroup as AButtonGroup } from 'ant-design-vue'
 import 'ant-design-vue/es/space/style/index.css'
  import 'ant-design-vue/es/table/style/index.css'
 import 'ant-design-vue/es/switch/style/index.css'
export default {
  name: 'commonTable',
  components: {
    AButtonGroup,
    AButton,
    ASwitch,
    ATable,
    ASpace
  },
  data(){
    return {
      tableShow: true,
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
          width: '12%',
          scopedSlots: { customRender: 'age' }
        },
        {
          title: 'Address',
          dataIndex: 'address',
          width: '30%',
          key: 'address',
          scopedSlots: { customRender: 'address' }
        }
      ],
      dataList: [
        {
          key: 1313123,
          id: 1,
          name: '1',
          age: 60,
          address: 'New York No. 1 Lake Park',
          children: [
            {
              key: 11,
              name: '2',
              age: 42,
              address: 'New York No. 2 Lake Park',
              id: '11'
            },
            {
              key: 12,
              name: '3',
              age: 30,
              address: 'New York No. 3 Lake Park',
              id: '12',
              children: [
                {
                  key: 121,
                  id: '121',
                  name: '4',
                  age: 16,
                  address: 'New York No. 3 Lake Park',
                }
              ],
            },
            {
              key: 13,
              id: '13',
              name: '5',
              age: 72,
              address: 'London No. 1 Lake Park',
              children: [
                {
                  key: 131,
                  id: '131',
                  name: '6',
                  age: 42,
                  address: 'London No. 2 Lake Park',
                  children: [
                    {
                      id: '1311',
                      key: 1311,
                      name: '7',
                      age: 25,
                      address: 'London No. 3 Lake Park',
                    },
                    {
                      id: '1312',
                      key: 1312,
                      name: '8',
                      age: 18,
                      address: 'London No. 4 Lake Park',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          key: 2,
          id: '2',
          name: '9',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
        }
      ],
      selectedRowKeys: [],
      expandKeysList: []
    }
  },
  computed: {
    rowConfig () {
      return {
        checkStrictly:false,
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.tableChange
      }
    }
  },
  methods: {
    upLevel () {
      this.selectedRowKeys.forEach(item => {
        let levelArr = this.getTargeIndex(this.dataList, item.toString())
        let levelItem = {}
        let uplevelItem = {}
        let uplevelIndex = null
        if (levelArr.length > 1) {
          levelArr.forEach((item, index) => {
            item = parseInt(item)
            if (index < levelArr.length - 1) {
              levelItem = index > 0 ? levelItem.children[item] : this.dataList[item]
              if (levelArr.length - 3 >= 0) {
                if (levelArr.length - 3 >= index) {
                  uplevelItem = index > 0 ? uplevelItem.children[item] : this.dataList[item]
                }
                if (levelArr.length - 2 === index) {
                  uplevelIndex = item
                }
              } else {
                uplevelItem = this.dataList
                uplevelIndex = item
              }
            } else {
              let calcItem = JSON.stringify(levelItem.children[item])
              levelItem.children.splice(item, 1)
              if (!levelItem.children.length) {
                delete levelItem.children
              }
              levelItem = calcItem
            }
          })
          if (uplevelItem.children) {
            uplevelItem.children.splice(uplevelIndex + 1, 0, JSON.parse(levelItem))
          } else {
            uplevelItem.splice(uplevelIndex + 1, 0, JSON.parse(levelItem))
          }
        }
      })
      this.dataList = JSON.parse(JSON.stringify(this.dataList))
    },
    downLevel () {
      this.selectedRowKeys.forEach(item => {
        let levelArr = this.getTargeIndex(this.dataList, item.toString())
        let levelItem = {}
        if (levelArr.length > 0) {
          levelArr.forEach((item, index) => {
            item = parseInt(item)
            if (index < levelArr.length - 1) {
              levelItem = index > 0 ? levelItem.children[item] : this.dataList[item]
            } else {
              if (!index) {
                let calcItem = JSON.parse(JSON.stringify(this.dataList[item]))
                if (this.dataList[item - 1]) {
                  if (this.dataList[item - 1].children) {
                    this.dataList[item - 1].children.push(calcItem)
                  } else {
                    this.dataList[item - 1].children = [calcItem]
                  }
                  this.dataList.splice(item, 1)
                } else if (this.dataList[item + 1]) {
                  if (this.dataList[item + 1].children) {
                    this.dataList[item + 1].children.push(calcItem)
                  } else {
                    this.dataList[item + 1].children = [calcItem]
                  }
                  this.dataList.splice(item, 1)
                }
              } else {
                let calcItem =  JSON.parse(JSON.stringify(levelItem.children[item]))
                if (levelItem.children.length > 1) {
                  if (levelItem.children[item - 1]) {
                    if (levelItem.children[item - 1].children) {
                      levelItem.children[item - 1].children.push(calcItem)
                    } else {
                      levelItem.children[item - 1].children = [calcItem]
                    }
                    levelItem.children.splice(item, 1)
                  } else if (levelItem.children[item + 1]) {
                    if (levelItem.children[item + 1].children) {
                      levelItem.children[item + 1].children.push(calcItem)
                    } else {
                      levelItem.children[item + 1].children = [calcItem]
                    }
                    levelItem.children.splice(item, 1)
                  }
                }
              }
            }
          })
        }
      })
      this.dataList = JSON.parse(JSON.stringify(this.dataList))
    },
    tableChange (key) {
      this.selectedRowKeys = key
    },
    expandedTable (keys) {
      if (this.tableShow) {
        this.expandKeysList = keys
      }
      this.refreshTable()
    },
    inintDrag () {
      let sortDom = document.querySelector('.ant-table-tbody')
      let _this = this
      Sortable.create(sortDom, {
        onStart ({ item }) {
          console.log(item);
          let targetRowKey = item.dataset.rowKey
          if (targetRowKey) {
            _this.expandKeysList = _this.expandKeysList.filter(item => item.toString() !== targetRowKey.toString())
          }
        },
        onEnd ({ newIndex, item }) {
          let targetRowKey = item.dataset.rowKey
          let targetArray = []
          let dataListItem = {}
          let targetItem = {}
          let currentRowKey = ''
          let currentArray = []
          let isNext = false
          let notBelong = false
          if (targetRowKey) {
            targetArray = _this.getTargeIndex(_this.dataList, targetRowKey.toString())
            console.log(targetArray);
          }
          if (newIndex > 0) {
            currentRowKey = document.querySelectorAll('.ant-table-row')[newIndex - 1].dataset.rowKey
            if (document.querySelectorAll('.ant-table-row')[newIndex + 1]) {
              currentRowKey = document.querySelectorAll('.ant-table-row')[newIndex + 1].dataset.rowKey
              isNext = true
            }
          }
          targetArray.forEach((item, index) => {
            item = parseInt(item)
            if (index < targetArray.length - 1) {
              if (!index) {
                targetItem = _this.dataList[item]
              } else {
                targetItem = targetItem.children[item]
              }
            } else {
              if (!index) {
                targetItem = JSON.parse(JSON.stringify(_this.dataList[item]))
                if (targetItem.children) {
                  notBelong = _this.judgeBelong(currentRowKey, targetItem.children)
                }
                if (!notBelong) {
                  _this.dataList.splice(item, 1)
                }
              } else {
                let calcItem = JSON.parse(JSON.stringify(targetItem.children[item]))
                if (calcItem.children) {
                  notBelong = _this.judgeBelong(currentRowKey, calcItem.children)
                }
                if (!notBelong) {
                  targetItem.children.splice(item, 1)
                  if (!targetItem.children.length) {
                    delete targetItem.children
                  }
                }
                targetItem = calcItem
              }
            }
          })
          if (!notBelong) {
            if (newIndex > 0) {
              if (currentRowKey) {
                currentArray = _this.getTargeIndex(_this.dataList, currentRowKey.toString())
              }
              currentArray.forEach((item, index) => {
                item = parseInt(item)
                if (index < currentArray.length - 1) {
                  if (!index) {
                    dataListItem = _this.dataList[item]
                  } else {
                    dataListItem = dataListItem.children[item]
                  }
                } else {
                  if (!index) {
                    if (!isNext) {
                      _this.dataList.splice(item + 1, 0 , targetItem)
                    } else {
                      _this.dataList.splice(item, 0 , targetItem)
                    }
                  } else {
                    if (!isNext) {
                      dataListItem.children.splice(item + 1, 0, targetItem)
                    } else {
                      dataListItem.children.splice(item, 0, targetItem)
                    }
                  }
                }
              })
            } else {
              _this.dataList.unshift(targetItem)
            }
          }
          _this.dataList = JSON.parse(JSON.stringify(_this.dataList))
          _this.refreshTable()
        }
      })
    },
    getTargeIndex (list, id, arr = []) {
      return list.reduce((total, item, index) => {
        if (item.id.toString() === id) {
          return [...total, index]
        } else {
          if (item.children && item.children.length) {
            let childArr = this.getTargeIndex(item.children, id, [...arr, index])
            if (childArr.length === [...arr, index].length) {
              childArr = total
            }
            return childArr
          } else {
            return total
          }
        }
      }, arr)
    },
    judgeBelong (key, list = []) {
      return list.find(item => {
        if (item.id.toString() === key) {
          return true
        } else {
          if (item.children && item.children.length) {
            return this.judgeBelong(key, item.children)
          } else {
            return false
          }
        }
      })
    },
    refreshTable () {
      this.tableShow = false
      this.$nextTick(() => {
        this.tableShow = true
        this.$nextTick(() => {
          this.inintDrag()
        })
      })
    }
  },
  mounted () {
    this.inintDrag()
  }
}
</script>
<style lang="less" scoped>
.func-bed{
  padding-bottom: 20px;
  .ant-btn-group{
    margin-left: 10px;
  }
}
</style>