<template>
  <div>
    <div class="hlviewer" v-viewer="{}">
      <img :src="hlurl" style="display: none;" />
    </div>
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
        <el-tabs tab-position="left" v-model="activeIndex" :before-leave="beforeTabLeave" @tab-click="tabClicked">
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
              <el-cascader v-model="addForm.goods_cat" :options="catList" :props="catProps" @change="handleChange"></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <el-form-item :label="item.attr_name" prop="attrs" :key="item.attr_id" v-for="(item) in manyTabData">
              <el-checkbox-group v-model="item.attr_vals" @change="changCheckboxGroup">
                <el-checkbox border :label="cb" :key="i" v-for="(cb, i) in item.attr_vals"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item :label="item.attr_name" prop="attrs" :key="item.attr_id" v-for="(item) in onlyTabData">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <!-- TDDO: :auto-upload="false"此处因没有后端,文件不自动上传  -->
            <el-upload :action= "pictureUpload" :on-remove="pictureRemove" :on-preview="picturePreview" :headers="pictureUploadHeaders"
              :on-success="pictureSuccess" list-type="picture" :limit="5" :auto-upload="false">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <quill-editor
              ref="QuillEditorRef"
              v-model="addForm.goods_introduce"
              :options="editorOption">
            </quill-editor>
            <!-- 添加商品 -->
            <el-button type="primary" style="margin-top: 20px;" @click="submitGoods">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { catListData, catePaeams } from '../serverData'

export default {
  data () {
    return {
      activeIndex: '0',
      addForm: {
        goods_name: '',
        goods_price: 0.00,
        goods_weight: 0,
        goods_number: 0,
        goods_cat: [],
        attrs: [],
        pics: [],
        goods_introduce: ''
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
      },
      manyTabData: [],
      onlyTabData: [],
      pictureUpload: this.$http.defaults.base + '/upload',
      hlurl: '',
      pictureUploadHeaders: {
        // 指定上传请求头
        Authorization: window.sessionStorage.getItem('token')
      },
      editorOption: {}
    }
  },
  created () {
    this.getCatList()
  },
  computed: {
    catId () {
      return this.addForm.goods_cat.length >= 3 ? this.addForm.goods_cat[this.addForm.goods_cat.length - 1] : null
    }
  },
  methods: {
    getCatList () {
      // TODO: 获取所有分类数据
      // const { data: res } = await this.$http.get("categories")
      const res = catListData
      if (res.meta.status !== 200) return this.$message.error('商品分类获取失败')
      this.catList = res.data.result
    },
    handleChange () {
      // 级联选择器
      if (this.addForm.goods_cat.length < 3) this.addForm.goods_cat = []
      return true
    },
    beforeTabLeave (activeName, oldActiveName) {
      if (oldActiveName === '0' && this.addForm.goods_cat.length < 3) {
        this.$message.warning('必须选择商品分类')
        return false
      } else {
        return true
      }
    },
    tabClicked () {
      if (this.activeIndex === '1') {
        // TODO: 获取商品参数
        // const { data:res } = await this.$http.get(`categories/${this.catId}/attributes`, { params: 'many' })
        const res = catePaeams.many
        if (res.meta.status !== 200) return this.$message.error('获取参数失败')
        console.log(res.data)
        res.data.forEach(item => {
          item.attr_vals = item.attr_vals.length === 0 ? [] : item.attr_vals.split(',')
        })
        this.manyTabData = res.data
      } else if (this.activeIndex === '2') {
        // TODO: 获取商品属性
        // const { data:res } = await this.$http.get(`categories/${this.catId}/attributes`, { params: 'only' })
        const res = catePaeams.only
        if (res.meta.status !== 200) return this.$message.error('获取属性失败')
        console.log(res.data)
        this.onlyTabData = res.data
      }
    },
    changCheckboxGroup () {
      console.log(this.manyTabData, this.addForm)
    },
    pictureRemove (file, fileList) {
      // 删除图片
      console.log(file, fileList)
      const filePath = file.response.temp_path
      const i = this.addForm.pics.findIndex(x => x.pic === filePath)
      this.addForm.pics.slice(i, 1) // 删除
    },
    picturePreview (file) {
      // 处理图片预览效果
      console.log(file)
      this.hlurl = file.url
      const viewer = this.$el.querySelector('.hlviewer').$viewer
      viewer.show()
    },
    pictureSuccess (response) {
      console.log(response)
      this.addForm.pics.push({ pic: response.data.temp_path })
      console.log(this.addForm)
    },
    submitGoods () {
      console.log(this.addForm)
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return this.$message.error('请填写必填的表单项')
        // 深拷贝addForm
        const submitForm = JSON.parse(JSON.stringify(this.addForm))
        submitForm.goods_cat = submitForm.goods_cat.join(',')
        // 处理动态参数(many)和静态属性(only)
        this.manyTabData.forEach(item => {
          submitForm.attrs.push({ attr_id: item.attr_id, attr_value: item.attr_vals.join(' ') })
        })
        this.onlyTabData.forEach(item => {
          submitForm.attrs.push({ attr_id: item.attr_id, attr_value: item.attr_vals })
        })
        console.log(submitForm)
        const { data: res } = await this.$http.post('goods', submitForm)
        if (res.meta.status !== 200) return this.$message.error('添加商品失败')
        this.$message.success('添加商品成功')
        this.$router.push('/goods')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-checkbox {
  margin: 0 10px 5px 0 !important;
}
</style>
