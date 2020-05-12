import Vue from 'vue'
import VueRouter from 'vue-router'
import { LoadingBar } from 'view-design'

//路由
import Home from '../views/Home.vue'
import Index from '../views/Index.vue';

Vue.use(VueRouter)

  const routes = [{
    mode:'history',
    base:'process.env.BASE_URL',
  },
  {path:'/', redirect:'/admin'},
  {
    path:'/admin',
    compontent: Home,
    children:[
      {path:'', redirect:"Index"}
    ]
  }
   
    
]

const router = new VueRouter({
  routes
})

export default router
