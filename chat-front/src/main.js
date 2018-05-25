import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueSocketio from 'vue-socket.io';

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueSocketio, 'http://localhost:80');

new Vue({
  render: h => h(App)
}).$mount('#app')
