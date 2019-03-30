import Vue from 'vue'
import Router from 'vue-router'
const HomePage = () => import('components/home-page/home-page')
const HommRecommend = () => import('components/home-page/recommend/recommend')
const HommSingers = () => import('components/home-page/singers/singers')
const HommMv = () => import('components/home-page/mv/mv')
const HommToplist = () => import('components/home-page/toplist/toplist')
const FriendsPage = () => import('components/friends-page/friends-page')
const musicPage = () => import('components/music-page/music-page')
const userPage = () => import('components/user-page/user-page')
const MvDatail = () => import('components/mv-detail/mv-detail')

Vue.use(Router)

let router = new Router({
  routes: [
    {
      name: 'root',
      path: '/',
      redirect: '/home/recommend'
    },
    {
      path: '/home',
      name: 'home-page',
      redirect: '/home/recommend',
      component: HomePage,
      children: [
        {
          name: 'home-recommend',
          path: 'recommend',
          component: HommRecommend
        }, {
          name: 'home-singers',
          path: 'singers',
          component: HommSingers
        }, {
          name: 'home-toplist',
          path: 'toplist',
          component: HommToplist
        }, {
          name: 'home-mv',
          path: 'mv',
          component: HommMv
        }
      ]
    },
    {
      path: '/friends',
      name: 'friends-page',
      component: FriendsPage
    },
    {
      path: '/music',
      name: 'music-page',
      component: musicPage
    },
    {
      path: '/user',
      name: 'user-page',
      component: userPage
    },
    {
      path: '/mvDetail/:id',
      name: 'mv-detail-page',
      component: MvDatail
    }
  ]
})

export default router
