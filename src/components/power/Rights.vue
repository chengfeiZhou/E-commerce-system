<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table
        :border="true"
        :stripe="true"
        :data="rightsList"
        style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="authName" label="权限名称"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column label="权限等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'">一级权限</el-tag>
            <el-tag type="success" v-else-if="scope.row.level === '1'">二级权限</el-tag>
            <el-tag type="info" v-else-if="scope.row.level === '2'">三级权限</el-tag>
            <el-tag type="warning" v-else-if="scope.row.level === '3'">四级权限</el-tag>
            <el-tag type="danger" v-else-if="scope.row.level === '4'">五级权限</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { rightList } from '../serverData'
export default {
  data () {
    return {
      rightsList: []
    }
  },
  created () {
    this.getRoghtsList()
  },
  methods: {
    async getRoghtsList () {
      // const { data: res } = await this.$http.get('rights/list')
      const res = rightList
      if (res.meta.status !== 200) return this.$message.error('权限列表获取失败...')
      this.rightsList = res.data
      console.log(this.rightsList)
    }
  }
}
</script>

<style scoped>

</style>
