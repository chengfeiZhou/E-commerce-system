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
          <el-button type="primary" @click="showAddDialog">添加分类</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <tree-table
        class="treeTable"
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
          <el-tag size="small" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag type="success" size="small" v-else-if="scope.row.cat_level === 1">二级</el-tag>
          <el-tag type="danger" size="small" v-else>三级</el-tag>
        </template>
        <template slot="opt" scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="small" @click="editDialog(scope.row)">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" @click="delCate(scope.row)">删除</el-button>
        </template>
      </tree-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <!-- 编辑分类 -->
    <el-dialog
      :title="dialogMode.title"
      :visible.sync="showEditDialogVisible"
      width="50%">
      <template  v-if="dialogMode.mode === 'editCate'">
        <el-form :model="editCatForm" :rules="editCatFormRules" ref="editCatFormRef"
          label-width="100px" @close="editCateDialogClose">
          <el-form-item label="分类名称" prop="cat_name">
            <el-input v-model="editCatForm.cat_name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editCateDialogClose">取 消</el-button>
          <el-button type="primary" @click="editCate">确 定</el-button>
        </span>
      </template>

      <!-- 添加分类 -->
      <template v-if="dialogMode.mode === 'addCate'">
        <el-form :model="addCatForm" :rules="addCatFormRules" ref="addCatFormRef"
          label-width="100px" @close="addCateDialogClose">
          <el-form-item label="分类名称" prop="cat_name">
            <el-input v-model="addCatForm.cat_name"></el-input>
          </el-form-item>
          <el-form-item label="父级分类">
            <el-cascader
              v-model="selectKeys"
              :options="ParentCatList"
              :props="cascaderProps">
            </el-cascader>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addCateDialogClose">取 消</el-button>
          <el-button type="primary" @click="addCate">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { catListData, ParentCatListData } from '../serverData'

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
      ],
      dialogMode: {
        mode: '', // dialog类型
        title: '' // dialog标题
      },
      showAddDialogVisible: false,
      addCatForm: {
        cat_name: '',
        cat_pid: 0,
        cat_level: 0
      },
      addCatFormRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ]
      },
      selectKeys: [],
      ParentCatList: [],
      cascaderProps: {
        expandTrigger: 'hover',
        checkStrictly: true,
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      showEditDialogVisible: false,
      editCatForm: { cat_name: '' },
      editCatFormRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getCatsList()
  },
  methods: {
    getCatsList () {
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
    },
    handleSizeChange (newSize) {
      // 监听pagesize改变
      this.pagesize = newSize
      this.getCatsList()
    },
    handleCurrentChange (newpage) {
      // 监听pagenum
      this.pagenum = newpage
      this.getCatsList()
    },
    showAddDialog () {
      this.getParentCatList()
      this.dialogMode = {
        mode: 'addCate',
        title: '添加分类'
      }
      this.showAddDialogVisible = true
    },
    getParentCatList () {
      // 获取父级分类的数据列表
      // const {data: res} = await this.$http.get('categories', {params: {type: 2}})
      const res = ParentCatListData
      if (res.meta.status !== 200) return this.$message.error('获取分类数据失败')
      this.ParentCatList = res.data.result
    },
    parentCatChange () {
      // 选择项发生变化
      console.log(this.selectKeys)
      if (this.selectKeys.length > 0) {
        this.addCatForm.cat_pid = this.selectKeys[this.selectKeys.length - 1]
        this.addCatForm.cat_level = this.selectKeys.length
        return true
      } else {
        this.addCatForm.cat_pid = 0
        this.addCatForm.cat_level = 0
        return true
      }
    },
    addCateDialogClose () {
      // 关闭
      this.$refs.addCatFormRef.resetFields()
      this.addCatForm.cat_pid = 0
      this.addCatForm.cat_level = 0
      this.selectKeys = []
      this.dialogMode = {
        mode: '',
        title: ''
      }
      this.getCatsList()
      this.showAddDialogVisible = false
    },
    addCate () {
      // 点击添加新的分类
      this.$refs.addCatFormRef.validate(async (valid) => {
        if (!valid) return false
        const { data: res } = await this.$http.post('categories', this.addCatForm)
        if (res.meta.status !== 201) return this.$message.error('添加失')
        this.addCateDialogClose()
        return this.$message.success('添加成功')
      })
    },
    editDialog (cateInfo) {
      this.dialogMode = {
        mode: 'editCate',
        title: '编辑分类'
      }
      // todo: 通过pid获取单个分类的信息
      this.editCatForm = cateInfo
      this.showEditDialogVisible = true
    },
    editCateDialogClose () {
      // 编辑关闭
      this.dialogMode = {
        mode: '',
        title: ''
      }
      this.editCatForm.cat_name = ''
      this.getCatsList()
      this.showEditDialogVisible = false
    },
    editCate () {
      // 提交修改
      this.$refs.editCatFormRef.validate(async (valid) => {
        console.log(this.editCatForm)
        if (!valid) return false
        const { data: res } = await this.$http.put(`categories/${this.editCatForm.cat_id}`, { cat_name: this.editCatForm.cat_name })
        if (res.meta.status !== 200) return this.$message.error('更新失败')
        this.editCateDialogClose()
        return this.$message.success('更新成功')
      })
    },
    async delCate (catInfo) {
      // 删除分类
      const confirmResult = await this.$confirm('是否确认删除该分类?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') return this.$message.info('已取消删除')
      // 请求接口
      const { data: res } = await this.$http.delete(`categories/${catInfo.cat_id}`)
      if (res.meta.status !== 200) {
        return this.$message.error('删除失败...')
      }
      // 返回值中包含新的所有权限
      this.rolesList = res.data
      return this.$message.success('删除成功...')
    }
  }
}
</script>

<style lang="less" scoped>
.treeTable {
  margin: 20px 0;
}
.el-cascader {
  width: 100%;
}
</style>
