import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App.vue'
//import DataMove from '@/DataMove.vue'
import messageSearch from '../views/messageSearch'
import activiteShow from '../views/activiteShow'
Vue.use(Router)

export default new Router({
  //所有路由
  routes: [
    
    {
      path:'/messageSearch',
      name:'messageSearch',
      component:messageSearch

    },
    {
      path:'/activiteShow',
      name:'activiteShow',
      component:activiteShow
    },
   {
      path:'/',
      redirect:'/app'
    }
  ]
})

