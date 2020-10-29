import Vue from 'vue'
import App from './App.vue'
import JsonEditor from 'vue-json-edit'

Vue.use(JsonEditor)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
