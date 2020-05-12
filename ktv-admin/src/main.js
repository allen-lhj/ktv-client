import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

//elementui
import ElementUI from 'element-ui';
import  'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//iviewui
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
