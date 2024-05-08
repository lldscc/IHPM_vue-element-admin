<template>
  <!-- element-ui级联组件 -->
  <el-cascader
    :value="value"
    size="mini"
    :options="treeData"
    :props="props"
    separator="-"
    @change="changeValue"
  />
</template>
<script>
import { getDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils'
export default {
  data() {
    return {
      treeData: [], // 赋值给 级联组件的options
      props: {
        value: {
          type: Number,
          default: null
        },
        label: 'name'
      }
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    async getDepartment() {
      this.treeData = transListToTreeData(await getDepartment(), 0) // 将组织架构的数据 转化树形赋值给treeData
      console.log(this.treeData)
    },
    changeValue(list) {
      if (list.length > 0) {
        this.$emit('input', list[list.length - 1]) // 选中的最后一个节点
      } else {
        this.$emit('input', null) // 如何长度为0,值为空,未选中
      }
    }
  }
}
</script>
