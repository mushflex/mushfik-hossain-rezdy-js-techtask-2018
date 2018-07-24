import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import RecipeList from '@/components/RecipeList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/recipes',
      name: 'RecipeList',
      component: RecipeList
    }
  ]
})
