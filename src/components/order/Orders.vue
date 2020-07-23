<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" clearable v-model="queryInfo.query">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 订单列表数据 -->
      <el-table
        stripe
        border
        :data="orderList">
        <el-table-column type="index" width="50" label="#"></el-table-column>
        <el-table-column prop="order_number" label="订单编号"></el-table-column>
        <el-table-column width="100" prop="order_price" label="订单价格(元)"> </el-table-column>
        <el-table-column width="100" label="是否付款">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.order_pay === 1">已支付</el-tag>
            <el-tag type="danger" v-else-if="scope.row.order_pay === 0">未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column width="100" prop="is_send" label="是否发货"></el-table-column>
        <el-table-column label="下单时间">
          <template slot-scope="scope">
            {{ scope.row.create_time | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="showEditDialog(scope.row)"></el-button>
            <el-button type="success" size="mini" icon="el-icon-location" @click="showProgressDialog(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="queryInfo.pagenum" :total="total" :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"  :page-sizes="[10, 20, 50, 100]"
        @size-change="getOrderList" @current-change="getOrderList" @next-click="getOrderList"
        @prev-click="getOrderList"></el-pagination>
    </el-card>
    <!-- 修改地址 -->
    <el-dialog title="修改地址" width="50%" :visible.sync="addressVisible" @close="handleClose">
      <el-form :model="addressForm" :rules="addressFormRules" ref="addressFormRef" label-width="100px">
        <el-form-item label="省市区/县" prop="address1">
          <el-cascader :props="cityCascaderProps" v-model="addressForm.address1" :options="cityData"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="addressForm.address2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitAddress">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 物流进度 -->
    <el-dialog title="物流进度" width="50%" :visible.sync="progressVisible">
      <el-timeline>
        <el-timeline-item v-for="(item, index) in kuaidi_Progress" :key="index" :timestamp="item.time" placement="top">
          <el-card>
            <h4>{{ item.context }}</h4>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>
: 视频===07

<script>
import { orderlist, kuaidi } from '../serverData'
import cityData from './citydata'

export default {
  data () {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      total: 0,
      orderList: [],
      addressVisible: false,
      addressForm: {
        address1: [],
        address2: ''
      },
      addressFormRules: {
        address1: [
          { required: true, message: '请选择省市区/县', trigger: 'blur' }
        ],
        address2: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ]
      },
      cityData,
      cityCascaderProps: { expandTrigger: 'hover' },
      progressVisible: false,
      kuaidi_Progress: []
    }
  },
  created () {
    this.getOrderList()
  },
  methods: {
    getOrderList () {
      // TODO: 获取订单信息
      // const { data: res } = await this.$http.get("orders", { params: this.queryInfo })
      const res = orderlist
      if (res.meta.status !== 200) return this.$message.error('获取订单列表失败')
      this.total = res.data.total
      this.queryInfo.pagenum = res.data.pagenum
      this.orderList = res.data.goods
    },
    showEditDialog (orderInfo) {
      this.addressVisible = true
    },
    handleClose () {
      this.addressForm = {
        address1: [],
        address2: ''
      }
      this.addressVisible = false
    },
    submitAddress () {
      // TODO: 提交修改
      console.log(this.addressForm)
      this.handleClose()
    },
    showProgressDialog (orderInfo) {
      // TODO: 获取物流进度
      // const { data: res } = await this.$http.get(`/kuaidi/${orderInfo.order_id}`)
      const res = kuaidi
      if (res.meta.status !== 200) return this.$message.error('进度跟踪失败')
      this.kuaidi_Progress = res.data
      this.progressVisible = true
    }
  }
}
</script>

<style scoped>
.el-cascader {
  width: 100%;
}
</style>
