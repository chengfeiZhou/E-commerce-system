<template>
    <div>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片视图 -->
      <el-card>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input
              placeholder="请输入内容"
              clearable
              @clear="getGoodsLit"
              v-model="queryInfo.query">
              <el-button slot="append" icon="el-icon-search" @click="getGoodsLit"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary">添加商品</el-button>
          </el-col>
        </el-row>
        <el-table
          :data="goodsList"
          stripe
          border
          style="width: 100%">
          <el-table-column type="index" ></el-table-column>
          <el-table-column prop="goods_name" label="商品名称"> </el-table-column>
          <el-table-column prop="goods_price" label="商品价格(元)" width="95"> </el-table-column>
          <el-table-column prop="goods_weight" label="商品重量" width="70"> </el-table-column>
          <el-table-column prop="add_time" label="创建时间" width="140">
            <template slot-scope="scope">
              {{ scope.row.add_time | dateFormat}}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="130">
            <template>
              <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="getGoodsLit"
          @current-change="getGoodsLit"
          @prev-click="getGoodsLit"
          @next-click="getGoodsLit"
          background
          :current-page="queryInfo.pagenum"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-card>
    </div>
</template>

<script>
import { goodList } from '../serverData'

export default {
  data () {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      goodsList: [],
      total: 0
    }
  },
  created () {
    this.getGoodsLit()
  },
  methods: {
    getGoodsLit () {
      // TODO: 请求接口
      // const { data: res } = await this.$http.get("goods", { params:this.queryInfo })
      const res = goodList
      if (res.meta.status !== 200) return this.$message.error('获取商品列表失败')
      console.log(res.data)
      this.goodsList = res.data.goods
      this.total = res.data.total
      // this.queryInfo.pagenum = res.data.pagenum
    }
  }
}
</script>

<style scoped>

</style>
