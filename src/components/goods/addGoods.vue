<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <el-alert title="添加商品信息" type="info" :closable="false" center show-icon></el-alert>
      <el-steps :space="200" align-center :active="activeIndex - 0" finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-form label-position="top" :model="addForm" :rules="addFormrules" ref="addFormRef">
        <el-tabs tab-position="left" v-model="activeIndex" :before-leave="beforeTabLeave">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name" placeholder="请输入商品名称"></el-input>
            </el-form-item>
            <el-form-item label="商品价格(/元)" prop="goods_price">
              <el-input-number v-model.number="addForm.goods_price" controls-position="right" :step="0.01" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="商品重量(/克)" prop="goods_weight">
              <el-input-number v-model.number="addForm.goods_weight" controls-position="right" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="商品数量(/件)" prop="goods_number">
              <el-input-number v-model.number="addForm.goods_number" controls-position="right" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                v-model="addForm.goods_cat"
                :options="catList"
                :props="catProps"
                @change="handleChange">
              </el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">商品参数</el-tab-pane>
          <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
          <el-tab-pane label="商品图片" name="3">商品图片</el-tab-pane>
          <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { catListData } from '../serverData'

export default {
  data () {
    return {
      activeIndex: '0',
      addForm: {
        goods_name: '',
        goods_price: 0.00,
        goods_weight: 0,
        goods_number: 0,
        goods_cat: []
      },
      addFormrules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        goods_cat: [
          { required: true, message: '请选择商品分类', trigger: 'blur' }
        ]
      },
      catList: [],
      catProps: {
        expandTrigger: 'hover',
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      }

    }
  },
  created () {
    this.getCatList()
  },
  methods: {
    getCatList () {
      // TODO: 获取所有分类数据
      // const { data: res } = await this.$http.get("categories")
      const res = catListData
      if (res.meta.status !== 200) return this.$message.error('商品分类获取失败')
      this.catList = res.data.result
      console.log(this.catList)
    },
    handleChange () {
      // 级联选择器
      if (this.addForm.goods_cat.length < 3) this.addForm.goods_cat = []
      return true
    },
    beforeTabLeave (activeName, oldActiveName) {
      console.log(activeName, oldActiveName)
      if (oldActiveName === '0' && this.addForm.goods_cat.length < 3) {
        this.$message.warning('必须选择商品分类')
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
