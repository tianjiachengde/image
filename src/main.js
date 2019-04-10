import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import ss from 'image-screen-shoot-tjc'
Vue.use(ss);
new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
