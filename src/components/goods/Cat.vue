<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary">添加分类</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <tree-table
        :data="catList"
        :columns="TreeColumns"
        :selection-type="false"
        :expand-type="false"
        :show-index="true"
        index-text="#"
        :border="true"
        :show-row-hover="false">
        <!-- 是否有效 -->
        <template slot="is_ok" scope="scope">
          <i class="el-icon-error" v-if="scope.row.cat_deleted" style="color: red; font-size: 16px"></i>
          <i class="el-icon-success" v-else style="color: lightgreen; font-size: 16px"></i>
        </template>
        <!-- 排序 -->
        <template slot="order" scope="scope">
          <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag type="success" size="mini" v-else-if="scope.row.cat_level === 1">二级</el-tag>
          <el-tag type="danger" size="mini" v-else>三级</el-tag>
        </template>
        <template slot="opt" scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini">搜索</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">搜索</el-button>
        </template>
      </tree-table>
      <!-- 分页 -->
    </el-card>
  </div>
</template>

<script>
import { catListData } from '../serverData'

export default {
  data () {
    return {
      // 商品分类列表
      catList: [],
      pagenum: 1,
      pagesize: 5,
      total: 0,
      TreeColumns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          // 使用模板
          type: 'template',
          template: 'is_ok'
        },
        {
          label: '排序',
          // 使用模板
          type: 'template',
          template: 'order'
        },
        {
          label: '操作',
          // 使用模板
          type: 'template',
          template: 'opt'
        }
      ]
    }
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    getGoodsList () {
      // const queryInfo = {
      //   type: 3,
      //   pagenum: this.pagenum,
      //   pagesize: this.pagesize
      // }
      // const { data: res } = await this.$http.get('categories', {params: queryInfo})
      const res = catListData
      if (res.meta.status !== 200) return this.$message.error('获取分类数据失败')
      this.catList = res.data.result
      this.pagesize = res.data.pagesize
      this.pagenum = res.data.pagenum
      this.total = res.data.total
      console.log(this.catList)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
