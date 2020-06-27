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
                  closable>
                  {{item1.authName}}
                </el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <el-row v-for="(item2) in item1.children" :key="item2.id" class="childRow">
                  <el-col :span="6">
                    <el-tag
                      closable
                      type="success">
                      {{item2.authName}}
                    </el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      closable
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
           <template>
            <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="分配权限" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini">分配权限</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { roleListData } from '../serverData'
export default {
  data () {
    return {
      rolesList: []
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
