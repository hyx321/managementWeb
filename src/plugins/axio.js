import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$ajax = axios
axios.defaults.baseURL = 'http://localhost:4001/'
