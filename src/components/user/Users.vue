<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" @clear="getUserList" clearable>
          <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
        </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table
        :border="true"
        :stripe="true"
        :data="userList"
        style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮件"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="编辑用户" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除用户" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="delUser(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="setRole(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>

    <!-- 添加用户对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClose">
      <!-- 内容主题区 -->
      <el-form
        label-width="80px"
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="addForm.checkPass"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogClose">取 消</el-button>
        <el-button type="primary" @click="addUser" :loading="isAddLoading">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户 -->
    <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClose">
      <el-form
        label-width="80px"
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogClose">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分配角色 -->
    <el-dialog
      title="分配角色"
      :visible.sync="setRoleDialogVisible"
      width="50%"
      @close="setRoleClose">
      <div>
        <p>当前的用户： {{ currentUser.username }}</p>
        <p>当前的角色： {{ currentUser.role_name }}</p>
        <p>分配新角色：
          <el-select v-model="selectRoleId" placeholder="请选择">
            <el-option
              v-for="item in rolesList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id">
            </el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleClose">取 消</el-button>
        <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { userList, roleListData } from '../serverData'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.addForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validateMobile = (rule, value, callback) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}/
      if (value === '') {
        callback(new Error('请输入手机号!'))
      } if (regMobile.test(value)) {
        callback()
      } else {
        callback(new Error('请确认手机号'))
      }
    }
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      userList: [],
      total: 0,
      addDialogVisible: false,
      isAddLoading: false,
      addForm: {
        username: '',
        password: '',
        checkPass: '',
        email: '',
        mobile: ''
      },
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '用户名的长度不少于3个字符且不多于12个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '用户名的长度不少于6个字符且不多于18个字符', trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '用户名的长度不少于6个字符且不多于18个字符', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' }
        ]
      },
      editDialogVisible: false,
      editForm: {},
      editFormRules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' }
        ]
      },
      setRoleDialogVisible: false,
      currentUser: {},
      rolesList: [],
      selectRoleId: ''
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      // 请求获取用户列表
      // const {data: res} = await this.$http.get('users', { parms: this.queryInfo })
      const res = userList
      if (res.meta.status !== 200) return this.$message.error('获取用户失败')
      this.userList = res.data.users
      this.queryInfo.pagenum = res.data.pagenum
      this.total = res.data.total
    },
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    handleCurrentChange (newPage) {
      // 监听页码值
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    async userStateChanged (event) {
      // 监听switch
      const { data: res } = await this.$http.put(`users/${event.id}/state/${event.mg_state}`)
      if (res.meta.status !== 200) {
        event.mg_state = !event.mg_state
        return this.$message.error('更新用户状态失败...')
      }
      this.$message.success('更新成功...')
    },
    addDialogClose () {
      this.addDialogVisible = false
      this.$refs.addFormRef.resetFields()
    },
    addUser () {
      // 添加新用户
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return this.$message.error('表单校验失败')
        this.isAddLoading = true
        const { data: res } = await this.$http.post('users', this.addForm)
        if (res.meta.status !== 201) {
          return this.$message.error('添加用户失败!')
        }
        this.$message.success('添加用户成功')
        this.isAddLoading = false
        this.addDialogVisible = false
        this.addDialogClose()
        this.getUserList()
      })
    },
    async showEditDialog (userInfo) {
      // // 方式一: 根据id查询用户信息
      // const { data: res } = await this.$$http.get(`users/${userInfo.id}`)
      // if (res.meta.status !== 200) return this.$message.error('用户获取失败!')
      // this.editForm = res.data
      // 方式二: 直接填充用户信息
      this.editForm = userInfo
      this.editDialogVisible = true
    },
    editDialogClose () {
      this.editDialogVisible = false
      this.$refs.editFormRef.resetFields()
    },
    editUserInfo () {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return this.$message.error('修改信息不合法!!')
        const { data: res } = await this.$http.put(`users/${this.editForm.id}`, { email: this.editForm.email, mobile: this.editForm.mobile })
        if (res.meta.status !== 200) return this.$message.error('更新失败')
        this.editDialogClose()
        this.userList()
        this.$message.success('更新成功...')
      })
    },
    delUser (userInfo) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.delete(`users/${userInfo.id}`)
        if (res.meta.status !== 200) return this.$message.error('删除失败...')
        else return this.$message.success('删除成功!')
      }).catch(() => {
        return this.$message.info('已取消删除')
      })
    },
    async setRole (userInfo) {
      // 分配角色
      this.currentUser = userInfo
      // 获取所有角色列表
      // const {data: res} = await this.$http.get('roles')
      // if (res.meta.status !== 200) return this.$message.error("获取角色列表失败")
      const res = roleListData
      this.rolesList = res.data
      console.log(this.rolesList)
      this.setRoleDialogVisible = true
    },
    setRoleClose () {
      this.currentUser = {}
      this.selectRoleId = ''
      this.setRoleDialogVisible = false
    },
    async saveRoleInfo () {
      if (!this.selectRoleId) return this.$message.error('请选择新角色')
      const { data: res } = await this.$http.put(`users/${this.currentUser.id}/role`, { rid: this.selectRoleId })
      if (res.meta.status !== 200) return this.$message.error('更新角色失败')
      this.setRoleClose()
      return this.$message.success('分配成功')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
