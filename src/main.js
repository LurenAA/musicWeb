// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastclick'

import 'babel-polyfill'
// import VConsole from 'vconsole'

import 'common/css/reset.css'
import 'common/css/icons.styl'

// /* eslint-disable no-unused-vars */
// let vconsole = new VConsole()
Vue.config.productionTip = false
fastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
