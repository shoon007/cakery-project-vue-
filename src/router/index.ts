import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'landingPage',
    component: ()=>import('../views/landingPage/landPage.vue')
  },
  {
    path: '/registerPage',
    name: 'registerPage',
    component: ()=>import('../views/RegisterPage.vue')
  },
  {
    path: '/loginPage',
    name: 'loginPage',
    component: ()=>import('../views/LoginPage.vue')
  },
  {
    path: '/homePage',
    name: 'homePage',
    component: ()=>import('../views/HomePage.vue')
  },
  {
    path: '/postDetails/:postId',
    name: 'postDetails',
    component: ()=>import('../views/PostDetails.vue')
  },
  {
    path: '/userAccount',
    name: 'userAccount',
    component: ()=>import('../views/EditProfile.vue')
  },
  {
    path: '/changePassword',
    name: 'changePassword',
    component: ()=>import('../views/ChangePassword.vue')
  },
  {
    path: '/cartPage',
    name: 'cartPage',
    component: ()=>import('../views/CartPage.vue')
  },
  {
    path: '/historyPage',
    name: 'historyPage',
    component: ()=>import('../views/HistoryPage.vue')
  },
  {
    path: '/contactPage',
    name: 'contactPage',
    component: ()=>import('../views/ContactPage.vue')
  },
 {
  path:'/:pathMatch(.*)*',
  name:'404error',
  component:()=>import('../views/error/404errorPage.vue')
 }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
