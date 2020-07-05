<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-button type="primary" >添加角色</el-button>
        </el-col>
      </el-row>
      <el-table
        :border="true"
        :stripe="true"
        :data="rolesList"
        style="width: 100%">
        <el-table-column type="expand" width="50">
          <template slot-scope="scope">
            <el-row v-for="(item1) in scope.row.children" :key="item1.id" class="topRow">
              <el-col :span="5">
                <el-tag
                  closable
                  @close="removeRightById(item1, scope.row)">
                  {{item1.authName}}
                </el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <el-row v-for="(item2) in item1.children" :key="item2.id" class="childRow">
                  <el-col :span="6">
                    <el-tag
                      closable
                      type="success"
                      @close="removeRightById(item2, scope.row)">
                      {{item2.authName}}
                    </el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      closable
                      @close="removeRightById(item3, scope.row)"
                      type="warning"
                      v-for="(item3) in item2.children" :key="item3.id">
                      {{item3.authName}}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作">
           <template slot-scope="scope">
            <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="分配权限" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="showSetRightDialog(scope.row)">分配权限</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分配权限对话框 -->
    <el-dialog
      title="分配权限"
      :visible.sync="setRightDialogVisible"
      width="30%"
      @close="setRightDialogClose">
      <el-tree
        node-key="id"
        :data="rightsList"
        :props="treeProps"
        show-checkbox
        :default-expand-all="true"
        :default-checked-keys="defaultKeys"
        ref="treeRef">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogClose">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { roleListData, rightsTree } from '../serverData'
export default {
  data () {
    return {
      // 所有角色
      rolesList: [],
      // 分配权限Dialog
      setRightDialogVisible: false,
      // 所有权限
      rightsList: [],
      // 树形格式
      treeProps: {
        children: 'children',
        label: 'authName'
      },
      // 默认选中
      defaultKeys: [],
      currentRole: ''
    }
  },
  created () {
    this.getRolesList()
  },
  methods: {
    async getRolesList () {
      // const { data: res } = await this.$http.get("roles")
      const res = roleListData
      if (res.meta.status !== 200) return this.$message.error('角色列表获取失败...')
      this.rolesList = res.data
      console.log(this.rolesList)
    },
    async removeRightById (right, role) {
      console.log(right, role)
      // 弹框确认
      const confirmResult = await this.$confirm('是否确认删除该用户的该权限?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') return this.$message.info('已取消删除')
      // 请求接口
      const { data: res } = await this.$http.delete(`roles/${role.id}/rights/${right.id}`)
      if (res.meta.status !== 200) {
        return this.$message.error('删除失败...')
      }
      // 返回值中包含新的所有权限
      this.rolesList = res.data
      return this.$message.success('删除成功...')
    },
    async showSetRightDialog (role) {
      this.currentRole = role
      // 获取所有权限数据
      // const { data: res } = await this.$http.get('rights/tree')
      // if (res.meta.status !== 200) return this.$message.error('获取权限失败')
      const res = rightsTree
      this.rightsList = res.data
      // 获取角色的叶子权限
      this.getLeafKeys(role, this.defaultKeys)
      this.setRightDialogVisible = true
    },
    getLeafKeys (node, arr) {
      // 使用递归获取子权限
      if (!node.children) return arr.push(node.id)
      node.children.forEach((item) => {
        this.getLeafKeys(item, arr)
      })
    },
    setRightDialogClose () {
      // dialog关闭时, 初始化默认选中列表
      this.defaultKeys = []
      this.currentRole = ''
      this.setRightDialogVisible = false
    },
    async allotRights () {
      // 分配权限
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      const isStr = keys.join(',')
      console.log(isStr)
      const { data: res } = await this.$http.post(`roles/${this.currentRole.id}/rights`, { rids: isStr })
      if (res.meta.status !== 200) return this.$message.error('分配权限失败')
      this.getRolesList()
      this.setRightDialogClose()
      return this.$message.success('分配权限成功')
    }
  }
}
</script>

<style lang="less" scoped>
.el-row {
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
}
.topRow:first-child {
  border-top: 1px solid #eee;
}
.childRow:last-child {
  border-bottom: 0;
}
</style>
