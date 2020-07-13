<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert
        show-icon
       :closable="false"
        title="注意：只允许为第三级分给设置相关参数!"
        type="warning">
      </el-alert>
      <el-row class="cat_opt">
        <el-col>
          <span>选择商品分类：</span>
          <el-cascader
            v-model="selectCateKeys"
            :options="cateList"
            :props="cascaderProps"
            @change="handleChange">
          </el-cascader>
        </el-col>
      </el-row>
      <el-tabs v-model="activeTab" @tab-click="handleTabClick">
        <!-- 动态参数 -->
        <el-tab-pane label="动态参数" name="many">
          <el-button type="primary" size="mini" :disabled="isBtnDisable" @click="addDialogVisible=true">添加参数</el-button>
          <!-- 动态参数表格 -->
          <el-table
            :data="manyTableData"
            style="width: 100%">
            <!-- 展开行 -->
             <el-table-column type="expand">
                <!-- <template slot-scope="scope"> -->
                <template>
                </template>
             </el-table-column>
            <el-table-column
              type="index"
              label="#"
              width="50">
            </el-table-column>
            <el-table-column
              property="attr_name"
              label="参数名称">
            </el-table-column>
            <el-table-column label="操作">
              <template scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row)">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 静态属性 -->
        <el-tab-pane label="静态属性" name="only">
          <el-button type="primary" size="mini" :disabled="isBtnDisable" @click="addDialogVisible=true">添加属性</el-button>
          <!-- 静态属性表格 -->
          <el-table
            :data="onlyTableData"
            style="width: 100%">
            <!-- 展开行 -->
             <el-table-column type="expand">
                <!-- <template slot-scope="scope"> -->
                <template>
                </template>
             </el-table-column>
            <el-table-column
              type="index"
              label="#"
              width="50">
            </el-table-column>
            <el-table-column
              property="attr_name"
              label="属性名称">
            </el-table-column>
            <el-table-column label="操作">
              <template scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row)">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 添加参数弹窗 -->
    <el-dialog
      :title="'添加' + titleText"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClose">
      <el-form :model="addForm" :rules="addFormrules" ref="addFormRef" label-width="100px">
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogClose">取 消</el-button>
        <el-button type="primary" @click="addParams">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改参数弹窗 -->
    <el-dialog
      :title="'修改' + titleText"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClose">
      <el-form :model="editForm" :rules="editFormrules" ref="editFormRef" label-width="100px">
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="editForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogClose">取 消</el-button>
        <el-button type="primary" @click="editParams">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { catListData, catePaeams } from '../serverData'
export default {
  data () {
    return {
      selectCateKeys: [],
      cateList: [],
      cascaderProps: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      activeTab: 'many',
      manyTableData: [],
      onlyTableData: [],
      addDialogVisible: false,
      addForm: { attr_name: '' },
      addFormrules: {
        attr_name: [
          { required: true, message: '请输入参数名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ]
      },
      editDialogVisible: false,
      editForm: { attr_name: '' },
      editFormrules: {
        attr_name: [
          { required: true, message: '请输入参数名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    isBtnDisable () {
      return this.selectCateKeys.length < 3
    },
    catId () {
      // 当前选中的分类id
      return this.selectCateKeys.length === 3 ? null : this.selectCateKeys[this.selectCateKeys.length]
    },
    titleText () {
      if (this.activeTab === 'many') return '动态参数'
      else if (this.activeTab === 'only') return '静态属性'
      else return ''
    }
  },
  created () {
    this.getCateList()
  },
  methods: {
    getCateList () {
      // const { data: res } = await this.$http.get("categories")
      const res = catListData
      if (res.meta.status !== 200) return this.$message.error('获取分类列表失败')
      this.cateList = res.data.result
    },
    getParamsData () {
      // 获取对应的参数
      // const { data: res } = await this.$http.get(`categories/${this.catId}/attributes`, { params: { sel: this.activeTab } })
      const res = catePaeams[this.activeTab]
      if (res.meta.status !== 200) return this.$message.error('获取参数失败')
      if (this.activeTab === 'many') this.manyTableData = res.data
      else if (this.activeTab === 'only') this.onlyTableData = res.data
      console.log(this.manyTableData, this.onlyTableData)
    },
    handleChange () {
      console.log(this.selectCateKeys)
      if (this.selectCateKeys.length < 3) {
        this.selectCateKeys = []
        return true
      }
      this.getParamsData()
    },
    handleTabClick (tab, event) {
      console.log(tab, event)
      this.getParamsData()
    },
    addDialogClose () {
      // 添加对话框的关闭
      this.$refs.addFormRef.resetFields()
      this.addDialogVisible = false
    },
    addParams () {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return false
        const { data: res } = await this.$http.post(`categories/${this.catId}/attributes`, {
          attr_name: this.addForm.attr_name,
          attr_sel: this.activeTab
        })
        if (res.meta.status !== 201) return this.$message.error('添加失败')
        this.addDialogClose()
        this.getParamsData()
        return this.$message.success('添加成功')
      })
    },
    async showEditDialog (paramsInfo) {
      const { data: res } = await this.$http.get(`categories/${this.catId}/attributes/${paramsInfo.attr_id}`, { paramsInfo: { attr_sel: this.activeTab } })
      if (res.meta.status !== 201) return this.$message.error('添加失败')
      this.editForm = res.data
      // 显示编辑对话框
      this.editDialogVisible = true
    },
    editDialogClose () {
      // 点击关闭
      this.$refs.editFormRef.resetFields()
      this.editDialogVisible = false
    },
    editParams () {
      // 点击提交修改
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return false
        const { data: res } = await this.$http.put(`categories/${this.catId}/attributes/${this.editForm.attr_id}`, {
          attr_name: this.editForm.attr_name,
          attr_sel: this.activeTab
        })
        if (res.meta.status !== 200) return this.$message.error('修改失败')
        this.getParamsData()
        this.editDialogClose()
        return this.$message.success('修改成功')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.cat_opt {
  margin: 15px 0;
}
</style>
