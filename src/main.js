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
//import ElementUI from 'element-ui'
import axios from 'axios'
//import VueAxios from 'vue-axios'
//import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
//import VueSocketIO from 'vue-socket.io'
//import socketio from 'socket.io-client';
////Vue.use(VueSocketio,socketio('http://192.168.137.1:8081/'));
//Vue.use(new VueSocketIO({

  //debug: true,

  //connection: 'http://localhost:8080/#/activiteShow'//'socket地址:端口号'


//}))
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
