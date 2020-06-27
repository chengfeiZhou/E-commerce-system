const menuList = {
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

const logoinSuccess = {
  data: {
    id: 500,
    rid: 0,
    username: 'admin',
    mobile: '123',
    email: '123@qq.com',
    token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE1MTI1NDQyOTksImV4cCI6MTUxMjYzMDY5OX0.eGrsrvwHm-tPsO9r_pxHIQ5i5L1kX9RX444uwnRGaIM'
  },
  meta: {
    msg: '登录成功',
    status: 200
  }
}

const userList = {
  data: {
    totalpage: 5,
    pagenum: 4,
    total: 20,
    users: [
      {
        id: 25,
        username: 'tige117',
        mobile: '18616358651',
        type: 1,
        email: 'tige112@163.com',
        create_time: '2017-11-09T20:36:26.000Z',
        mg_state: true, // 当前用户的状态
        role_name: '炒鸡管理员'
      },
      {
        id: 26,
        username: '的深层次的',
        mobile: '18616358651',
        type: 1,
        email: 'tige112@163.com',
        create_time: '2017-11-09T20:36:26.000Z',
        mg_state: false, // 当前用户的状态
        role_name: '管理员'
      }
    ]
  },
  meta: {
    msg: '获取成功',
    status: 200
  }
}

export { menuList, logoinSuccess, userList }
