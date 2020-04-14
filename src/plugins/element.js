import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI, { Message, Notification } from 'element-ui'

Vue.use(ElementUI)
Vue.prototype.$notify = Notification
Vue.prototype.$mess = Message
