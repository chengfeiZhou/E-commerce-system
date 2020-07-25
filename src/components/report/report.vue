<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <div id="main" style="width: 100%; height:400px;"></div>
    </el-card>
  </div>
</template>

<script>
// 1. 导入echarts
import echarts from 'echarts'
import { reportData } from '../serverData'

export default {
  data () {
    return {
      // 请求到的数据需要与option合并展示
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      },
      // 合并后的数据
      optionsData: {}
    }
  },
  created () {
    this.getReport()
  },
  mounted () {
    // 3. 初始化图标
    var myChart = echarts.init(document.getElementById('main'))
    // 5. 展示图.
    myChart.setOption(this.optionsData)
  },
  methods: {
    getReport () {
      // TODO: 获取图表信息
      // const { data: res } = await this.$http.get('reports/type/1')
      const res = reportData
      if (res.meta.status !== 200) return this.$message.error('获取图表数据失败')
      this.optionsData = {
        ...this.options,
        ...res.data
      }
      console.log(this.options, res.data, this.optionsData)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
