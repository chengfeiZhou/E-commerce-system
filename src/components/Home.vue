<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/logo.png" alt="">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主题 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath">
          <el-submenu :index="item.id+''" :key="item.id" v-for="item in menulist" >
            <template slot="title">
              <i :class="iconsObj[item.path]"></i>
              <span>{{ item.authname }}</span>
            </template>
            <el-menu-item
              :index="'/' + subItem.path"
              :key="subItem.id"
              v-for="subItem in item.children"
              @click="saveNavState('/' + subItem.path)">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ subItem.authname }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧主题 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    </el-container>
</template>

<script>
export default {
  data () {
    return {
      menulist: [],
      iconsObj: {
        users: 'iconfont icon-user',
        rights: 'iconfont icon-tijikongjian',
        goods: 'iconfont icon-shangpin',
        orders: 'iconfont icon-danju',
        reports: 'iconfont icon-baobiao'
      },
      isCollapse: false,
      activePath: ''
    }
  },
  created () {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    // 获取所有菜单
    async getMenuList () {
      //  后台数据
      // const { data: res } = await this.$http.get('menus')
      const res = {
        data: [
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
                path: 'roles',
                children: []
              },
              {
                id: 1,
                authname: '权限列表',
                order: 2,
                path: 'rights',
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
                path: 'goods',
                children: []
              },
              {
                id: 1,
                authname: '分类参数',
                order: 2,
                path: 'goods',
                children: []
              },
              {
                id: 2,
                authname: '商品分类',
                order: 3,
                path: 'goods',
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
                id: 1,
                authname: '用户管理',
                order: 1,
                path: 'orders',
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
                path: 'reports',
                children: []
              }
            ]
          }
        ],
        meta: {
          msg: '获取菜单列表成功',
          status: 200
        }
      }
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
    },
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    toggleCollapse () {
      // 点击按钮显示隐藏菜单
      this.isCollapse = !this.isCollapse
    },
    saveNavState (path) {
      // 保存url
      this.activePath = path
      window.sessionStorage.setItem('activePath', path)
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
    .el-menu {
      border-right: 0;
    }
  }
  .el-main {
    background-color: #eaedf1;
  }
  .iconfont {
    margin-right: 10px;
  }
  .toggle-button {
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: .1em;
    cursor: pointer;
  }
}
</style>
