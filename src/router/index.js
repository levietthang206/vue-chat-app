import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('@/pages/Login')
    },
    {
      path: '/room-list',
      name: 'RoomList',
      component: () => import('@/pages/RoomList')
    },
    {
      path: '/chat/:nickName/:roomName',
      name: 'Chat',
      component: () => import('@/pages/Chat')
    },
  ]
})
