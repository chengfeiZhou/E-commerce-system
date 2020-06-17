<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/logo.png" alt="">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info">退出</el-button>
    </el-header>
    <!-- 页面主题 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <!-- 侧边栏 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu :index="item.id" :key="item.id" v-for="item in menulist" >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.authname }}</span>
            </template>
            <el-menu-item index="item.id+'-'+subItem.id" :key="subItem.id" v-for="subItem in item.children">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ subItem.authname }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧主题 -->
      <el-main>Main</el-main>
    </el-container>
    </el-container>
</template>

<script>
export default {
  data () {
    return {
      menulist: []
    }
  },
  created () {
    this.getMenuList()
  },
  methods: {
    // 获取所有菜单
    async getMenuList () {
      //  后台数据
      // const { data: res } = await this.$http.get('menus')
      // if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      // this.menulist = res.data
      // fake数据
      this.menulist = [
        {
          id: 0,
          authname: '用户管理',
          order: 1,
          path: 'users',
          children: [
            {
              id: 0,
              authname: '用户列表',
              order: 1,
              path: 'users',
              children: []
            }
          ]
        },
        {
          id: 1,
          authname: '权限管理',
          order: 2,
          path: 'rights',
          children: [
            {
              id: 0,
              authname: '角色列表',
              order: 1,
              path: 'users',
              children: []
            },
            {
              id: 0,
              authname: '权限列表',
              order: 1,
              path: 'users',
              children: []
            }
          ]
        },
        {
          id: 2,
          authname: '商品管理',
          order: 3,
          path: 'goods',
          children: [
            {
              id: 0,
              authname: '商品列表',
              order: 1,
              path: 'users',
              children: []
            },
            {
              id: 0,
              authname: '分类参数',
              order: 1,
              path: 'users',
              children: []
            },
            {
              id: 0,
              authname: '商品分类',
              order: 1,
              path: 'users',
              children: []
            }
          ]
        },
        {
          id: 3,
          authname: '订单管理',
          order: 4,
          path: 'orders',
          children: [
            {
              id: 0,
              authname: '用户管理',
              order: 1,
              path: 'users',
              children: []
            }
          ]
        },
        {
          id: 4,
          authname: '数据统计',
          order: 5,
          path: 'reports',
          children: [
            {
              id: 0,
              authname: '用户管理',
              order: 1,
              path: 'users',
              children: []
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
  .el-header {
    display: flex;
    justify-content: space-between;
    background-color: #373d41;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
    > div {
      display: flex;
      align-items: center;
      span {
        margin-left: 15px;
      }
      img {
        width: 50px;
        height: 50px;
        border: 2px solid #fff;
        border-radius: 50%;
      }
    }
  }
  .el-aside {
    background-color: #333744;
  }
  .el-main {
    background-color: #eaedf1;
  }
}
</style>
