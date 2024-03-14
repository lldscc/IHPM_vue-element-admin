<template>
  <!-- 对话框组件 visible属性控制显示隐藏  -->
  <el-dialog
    title="新增部门"
    :visible="showDialog"
    @close="close"
  >
    <!-- 表单
      model 绑定数据对象 rules 表单验证规则 ref整个form的实例

    -->
    <el-form ref="addDept" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" placeholder="2-10个字符" style="width: 80%;" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" placeholder="2-10个字符" style="width: 80%;" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="managerId">
        <!-- el-select选择器
        v-model的值为当前被选中的el-option的 value 属性值
        label为el-option的显示内容-->
        <el-select v-model="formData.managerId" placeholder="选择负责人" style="width: 40%;">
          <el-option
            v-for="item in managerList"
            :key="item.id"
            :label="item.username"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" type="textarea" :rows="4" placeholder="20-100字符" />
      </el-form-item>
      <el-form-item>
        <el-row type="flex" justify="center">
          <el-col>
            <el-button type="primary">提交</el-button>
          </el-col>
          <el-col>
            <el-button>取消</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog></template>

<script>
import { getDepartment } from '@/api/department'
import { getManagerList } from '@/api/department'
export default {
  // 通过props接收父组件传递的值
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 定义新增部门的数据类型
      formData: {
        code: '', // 部门编码
        introduce: '', // 部门介绍
        managerId: '', // 部门负责人id
        name: '', // 部门名称
        pid: '' // 上级部门id
      },
      // 表单验证的规则
      /**
       *trigger: 触发方式 blur失去焦点 change改变
       *
      */
      rules: {
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
          // 自定义验证规则 => 通过validator函数验证=>部门编码的重复校验
          { trigger: 'blur', validator: async(rule, value, callback) => {
            // value: 当前输入的值 调用获取部门列表的接口，看是否有重复的部门编码，数组方法some
            const result = await getDepartment()
            if (result.some(item => item.code === value)) {
              callback(new Error('该部门编码已存在'))
            } else {
              callback() // 校验通过
            }
          } }],

        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 20 到 100 个字符', trigger: 'blur' }],

        managerId: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }],

        name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
          // 自定义验证规则 => 部门名称的重复校验
          { trigger: 'blur', validator: async(rule, value, callback) => {
            const result = await getDepartment()
            if (result.some(item => item.name === value)) {
              callback(new Error('该部门名称已存在'))
            } else {
              callback()
            }
          } }
        ]
      },
      managerList: []
    }
  },
  created() {
    // 获取部门负责人列表
    this.getManagerList()
  },
  methods: {
    close() {
      // 通过$emit触发父组件的事件 子传父
      this.$emit('update:showDialog', false)
    },
    // 负责人数据
    async getManagerList() {
      this.managerList = await getManagerList()
    }
  }

}
</script>

<style>

</style>
