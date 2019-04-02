// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import lazyLoad from './common/js/lazy-load/index'
import store from './store/index'
import 'babel-polyfill'
// import VConsole from 'vconsole'

import 'common/css/reset.css'
import 'common/css/icons.styl'

// /* eslint-disable no-unused-vars */
// let vconsole = new VConsole()
Vue.config.productionTip = false

Vue.use(lazyLoad, {
  loading: require('./common/js/lazy-load/1.gif'),
  error: require('./common/js/lazy-load/2.jpg'),
  threshold: 0.2
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
