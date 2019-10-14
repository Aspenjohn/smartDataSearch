// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/*import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios)
Vue.$http=axios
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new 
new Vue({
  el: '#app',
  router,
  components: { App },//组件
  template: '<App/>'//模板插入id里的div里
})
*/

import Vue from 'vue'
import ElementUI from 'element-ui'
import axios from 'axios'
//import VueAxios from 'vue-axios'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
//import dataMove from './dataMove.vue'
Vue.use(ElementUI)
Vue.prototype.$http= axios
//Vue.use(VueAxios)//声明使用插件,内部会给vm对象添加$http属性。这个属性有两个方法，get和post。
new Vue({
    el:'#app',
    router,
  //render:h =>h(App),
    
    components:{App},
    template:'<App/>',//组件
    methods: {
      show() {
        this.$http({
          method: 'get',
          url: '/user',
          data: {
            name: 'virus'
          }
      })
    }
  },
  render:h =>h(App)//创建App节点
})
