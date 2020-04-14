import Vue from 'vue'
import router from './router'
import APP from './App.vue'
import './plugins/element.js'
import './assets/css/global.css'
import './plugins/axio.js'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(APP)
}).$mount('#app')
