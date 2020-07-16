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
          authname: '权限列表',
          order: 1,
          path: 'rights',
          children: []
        },
        {
          id: 1,
          authname: '角色列表',
          order: 2,
          path: 'roles',
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
          path: 'params',
          children: []
        },
        {
          id: 2,
          authname: '商品分类',
          order: 3,
          path: 'categorys',
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

const rightList = {
  data: [
    {
      id: 101,
      authName: '商品管理',
      level: '0',
      pid: 0,
      path: '/goods'
    },
    {
      id: 102,
      authName: '订单管理',
      level: '0',
      pid: 0,
      path: '/orders'
    }
  ],
  meta: {
    msg: '获取权限列表成功',
    status: 200
  }
}

const roleListData = {
  data: [
    {
      id: 30,
      roleName: '主管',
      roleDesc: '技术负责人',
      children: [
        {
          id: 101,
          authName: '商品管理',
          path: null,
          children: [
            {
              id: 104,
              authName: '商品列表',
              path: null,
              children: [
                {
                  id: 105,
                  authName: '添加商品',
                  path: null
                },
                {
                  id: 106,
                  authName: '删除商品',
                  path: null
                }
              ]
            },
            {
              id: 107,
              authName: '商品列表',
              path: null,
              children: [
                {
                  id: 109,
                  authName: '删除商品',
                  path: null
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  meta: {
    msg: '获取成功',
    status: 200
  }
}

const rightsTree = {
  data: [
    {
      id: 101,
      authName: '商品管理',
      path: null,
      pid: 0,
      children: [
        {
          id: 104,
          authName: '商品列表',
          path: null,
          pid: 101,
          children: [
            {
              id: 105,
              authName: '添加商品',
              path: null
            },
            {
              id: 106,
              authName: '删除商品',
              path: null
            }
          ]
        },
        {
          id: 107,
          authName: '商品列表',
          path: null,
          children: [
            {
              id: 108,
              authName: '添加商品',
              path: null
            },
            {
              id: 109,
              authName: '删除商品',
              path: null
            }
          ]
        }
      ]
    }
  ],
  meta: {
    msg: '获取成功',
    status: 200
  }
}

const catListData = {
  data: {
    pagenum: 0,
    pagesize: 5,
    total: 30,
    result: [
      {
        cat_id: 1,
        cat_name: '大家电',
        cat_pid: 0,
        cat_level: 0,
        cat_deleted: false,
        children: [
          {
            cat_id: 3,
            cat_name: '电视',
            cat_pid: 1,
            cat_level: 1,
            cat_deleted: false,
            children: [
              {
                cat_id: 6,
                cat_name: '曲面电视',
                cat_pid: 3,
                cat_level: 2,
                cat_deleted: false
              },
              {
                cat_id: 7,
                cat_name: '海信',
                cat_pid: 3,
                cat_level: 2,
                cat_deleted: false
              }
            ]
          }
        ]
      }
    ]
  },
  meta: {
    msg: '获取成功',
    status: 200
  }
}

const ParentCatListData = {
  data: {
    pagenum: 0,
    pagesize: 5,
    total: 30,
    result: [
      {
        cat_id: 1,
        cat_name: '大家电',
        cat_pid: 0,
        cat_level: 0,
        cat_deleted: false,
        children: [
          {
            cat_id: 3,
            cat_name: '电视',
            cat_pid: 1,
            cat_level: 1,
            cat_deleted: false
          }
        ]
      },
      {
        cat_id: 11,
        cat_name: '大家电2',
        cat_pid: 10,
        cat_level: 0,
        cat_deleted: false,
        children: [
          {
            cat_id: 13,
            cat_name: '电视2',
            cat_pid: 10,
            cat_level: 1,
            cat_deleted: false
          }
        ]
      }
    ]
  },
  meta: {
    msg: '获取成功',
    status: 200
  }
}

const catePaeams = {
  only: {
    data: [
      {
        attr_id: 1,
        attr_name: 'cpu',
        cat_id: 22,
        attr_sel: 'only',
        attr_write: 'manual',
        attr_vals: 'ffff,超线程,小制程'
      }
    ],
    meta: {
      msg: '获取成功',
      status: 200
    }
  },
  many: {
    data: [
      {
        attr_id: 1,
        attr_name: 'LED',
        cat_id: 22,
        attr_sel: 'many',
        attr_write: 'manual',
        attr_vals: 'ffff,像素,大底'
      }
    ],
    meta: {
      msg: '获取成功',
      status: 200
    }
  }
}

export { menuList, logoinSuccess, userList, rightList, roleListData, rightsTree, catListData, ParentCatListData, catePaeams }
