import Vue from 'vue'
import Router from 'vue-router'
const HomePage = () => import('components/home-page/home-page')
const HommRecommend = () => import('components/home-page/recommend/recommend')
const HommSingers = () => import('components/home-page/singers/singers')
const HommMv = () => import('components/home-page/mv/mv')
const HommToplist = () => import('components/home-page/toplist/toplist')

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'root',
      path: '/',
      redirect: '/home/recommend'
    },
    {
      path: '/home',
      name: 'HomePage',
      component: HomePage,
      children: [
        {
          path: 'recommend',
          component: HommRecommend
        }, {
          path: 'singers',
          component: HommSingers
        }, {
          path: 'toplist',
          component: HommToplist
        }, {
          path: 'mv',
          component: HommMv
        }
      ]
    }
  ]
})
