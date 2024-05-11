<template>
  <div class="container">
    <div class="app-container">
      <!-- 管理内容 -->
      <div class="role-operate">
        <el-button size="small " type="primary" @click="showDialog=true">添加角色</el-button>
      </div>
      <!-- table 组件 -->
      <el-table :data="rolelist">

        <el-table-column label="序号" width="200" highlight-current-row="true" align="center" prop="id">
          <!-- 自定义插槽 -->
          <template v-slot="{ row }">
            <!-- 条件判断 是否显示行内编辑-->
            <el-input v-if="row.isEdit" v-model="row.editRow.name" size="mini" />
            <span v-else>{{ row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="角色" width="200" align="center" prop="name" />

        <el-table-column label="启用" width="200" align="center" prop="state">
          <!-- 自定义结构 {{ ？？？ }}  启用列-->
          <template v-slot="{ row }">
            <!-- 条件判断 是否显示行内编辑 -->
            <el-switch v-if="row.isEdit" v-model="row.editRow.state" :active-value="1" :inactive-value="0" />
            <span v-else>  {{ row.state === 1 ? "已启用" : row.state === 0 ? "未启用" : "无" }} </span>
          </template>
        </el-table-column>

        <el-table-column label="描述" align="center" prop="description">
          <!-- 自定义插槽 -->
          <template v-slot="{ row }">
            <!-- 条件判断 是否显示行内编辑-->
            <el-input v-if="row.isEdit" v-model="row.editRow.description" type="textrea" />
            <span v-else>{{ row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <!-- 放置操作按钮 -->
          <!-- template中使用 v-slot解构其中的数据 -->
          <template v-slot="{ row }">
            <!-- 条件渲染：点击编辑，三个按钮变成确认与取消按钮 -->
            <template v-if="row.isEdit">
              <el-button size="mini" type="primary" @click="btnEditOK(row)">确认</el-button>
              <el-button size="mini" type="text" @click="row.isEdit = false">取消</el-button>
            </template>
            <template v-else>
              <el-button size="mini" type="text" @click="btnPermission(row.id)">分配权限</el-button>
              <el-button size="mini" type="text" @click="btnEditRow(row)">编辑</el-button>
              <!-- Popconfirm 气泡确认框 -->
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="deleteRow(row.id)"
              >
                <el-button slot="reference" size="mini" type="text" style="margin-left: 10px;">删除</el-button>
              </el-popconfirm>

            </template>
          </template>
        </el-table-column>

      </el-table>

      <!-- 分页组件 -->
      <el-row type="flex" style="height:60px" align="middle" justify="center">
        <!-- 放置分页组件 total：总数量  page-size：每页显示条目个数  current-page：当前页数  current-change方法：currentPage 改变时会触发-->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="pageParams.total"
          :page-size="pageParams.pagesize"
          :current-page="pageParams.page"
          @current-change="changePage"
        />
      </el-row>
    </div>

    <!-- 添加角色-弹层组件Dialog 表单from-->
    <!-- ???::visible.sync="showDialog" @close="btnCancel" -->
    <el-dialog title="新增角色" width="500px" :visible.sync="showDialog" @close="btnCancel">
      <!-- 绑定数据校验 -->
      <el-form ref="roleForm" label-width="100px" :model="roleForm" :rules="rules">
        <!-- 校验字段 prop="name" -->
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name" style="width:300px" size="mini" />
        </el-form-item>
        <el-form-item label="启动">
          <!-- active-value="1" 和 inactive-value="0" 是 <el-switch> 组件中的两个属性，它们指定了开关在开启和关闭状态时所对应的值。 -->
          <el-switch v-model="roleForm.state" size="mini" :active-value="1" :inactive-value="0" />
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="roleForm.description" type="textarea" :rows="3" style="width:300px" size="mini" />
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="space-between" style="width:300px">
            <el-button type="primary" size="small" @click="btnOK">确定</el-button>
            <el-button size="mini" @click="btnCancel">取消</el-button>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 权限弹层 -->
    <el-dialog :visible.sync="showPermissionDialog" title="分配权限">
      <!-- default-checked-keys的属性是设置当前选中的节点，但是必须配合node-key属性，因为permIds变量中存储的都是id，必须el-tree组件知道key是哪个字段，所以设置node-key="id" -->
      <el-tree
        ref="permTree"
        node-key="id"
        :data="permissionData"
        :props="{ label: 'name' }"
        show-checkbox
        default-expand-all
        :default-checked-keys="permIds"
      />
      <!-- 更改权限 确认取消 -->
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button type="primary" size="mini" @click="btnPermissionOK">确定</el-button>
          <el-button size="mini" @click="showPermissionDialog = false">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
// 获取请求方法
import { getRoleList, addRole, updateRole, delRole, getRoleDetail, assignPerm } from '@/api/role'
import { getPermissionList } from '@/api/permission'
import { transListToTreeData } from '@/utils/index'
export default {
  name: 'Role',
  data() {
    return {
      rolelist: [],
      // 分页数据
      pageParams: {
        page: 1, // 第几页
        pagesize: 5, // 每页多少条
        total: 0 // 总条数
      },
      showDialog: false, // 控制弹层显示隐藏

      /**
       * 2.新增角色
       * **/
      // 新增角色弹窗表单的数据
      roleForm: {
        name: '',
        description: '',
        state: 0 // 默认启用 关闭 0 ； 打开1
      },
      // 新增角色的表单规则
      rules: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        description: [{ required: true, message: '请输入角色描述', trigger: 'blur' }]
      },

      /**
       * 3.分配权限
       * **/
      // 弹层
      showPermissionDialog: false,
      // 所有角色权限数据
      permissionData: [],
      // 角色拥有的权限数据
      permIds: [],
      // 记录角色id
      currentRoleId: null

    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 获取角色列表
    async getRoleList() {
      const { rows, total } = await getRoleList(this.pageParams) // 参数：page 当前页码数；pagesize 每页多少条
      this.rolelist = rows // 每条赋值给表格数据
      // 总数据赋值给分页数据
      this.pageParams.total = total
      // 针对每一行数据添加一个编辑标记,(行内编辑功能)
      this.rolelist.forEach(item => {
        // item.isEdit = false // 添加一个属性，用来标记是否处于编辑状态
        // 有数据响应式的问题 添加的动态属性 不具备响应式特点
        // 使用this.$set(目标对象，属性名称，初始值) 可以针对目标对象添加对象 响应式
        this.$set(item, 'isEdit', false)
        // 数据缓存
        this.$set(item, 'editRow', {
          name: item.name,
          description: item.description,
          state: item.state
        })
      })
    },
    // 分页的功能
    changePage(page) {
      this.pageParams.page = page
      this.getRoleList()
    },

    // 添加角色弹窗-确认业务
    btnOK() {
      this.$refs.roleForm.validate(async isOK => {
        if (isOK) {
          // 调用新增角色接口
          await addRole(this.roleForm)
          this.$message.success('新增角色成功')
          this.getRoleList()
          this.btnCancel()
        }
      })
    },
    // 添加角色弹窗-取消业务
    btnCancel() {
      this.$refs.roleForm.resetFields() // 重置表单数据
      this.showDialog = false // 关闭弹层
    },
    // 编辑业务
    btnEditRow(row) {
      // 改变行的编辑状态
      row.isEdit = true
      // 编辑时，将当前行的数据缓存
      row.editRow.name = row.name
      row.editRow.description = row.description
      row.editRow.state = row.state
    },
    // 编辑-确认业务
    async btnEditOK(row) {
      if (row.editRow.name && row.editRow.description) {
        // 缓存的数据是最新的数据
        await updateRole({ ...row.editRow, id: row.id }) // ...延展运算符：将对象中的属性展开
        // 更新成功
        this.$message.success('更新角色成功')
        // 更新显示的数据
        // row.name = row.editRow.name // 误判
        // ？？？
        // Object.assign(target, source)
        Object.assign(row, {
          ...row.editRow,
          isEdit: false // 退出编辑模式
        }) // 规避eslint的误判
      } else {
        this.$message.error('请填写完整信息')
      }
    },
    // 删除业务
    async deleteRow(id) {
      // console.log(id)
      await delRole(id)
      this.$message.success('删除成功')
      // 删除成功后，重新获取数据
      // 如果是最后一页的最后一条数据，删除后，页码数减1
      if (this.rolelist.length === 1) this.pageParams.page--
      this.getRoleList()
    },
    /**
     * 分配权限
     */
    // 1.显示权限数据
    async btnPermission(id) {
      // console.log(this.permissionData)
      this.currentRoleId = id
      const { permIds } = await getRoleDetail(id)
      this.permIds = permIds
      // console.log(this.permIds)
      // 获取数据转化成树形
      this.permissionData = transListToTreeData(await getPermissionList(), 0)
      this.showPermissionDialog = true
    },
    // 2.更改权限 确认按钮
    async btnPermissionOK() {
      await assignPerm({
        id: this.currentRoleId,
        permIds: this.$refs.permTree.getCheckedKeys()
      })
      this.$message.success('角色分配权限成功')
      this.showPermissionDialog = false
    }
  }
}
</script>
<style scoped>
.role-operate {
  padding: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>
