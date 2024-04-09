import { requiredAuth, notRequiredAuth } from './guard'
const routes = [
  { 
    path: '/',      
    redirect: '/home'
  },
  { 
    path: '/home',
    name: 'home',
    component: () => import('../pages/Home.vue'),
    beforeEnter: [requiredAuth]
  },
  { 
    path: '/about',
    name: 'about',
    component: () => import('../pages/About.vue'),
    beforeEnter: [requiredAuth]
  },
  { 
    path: '/login',
    name: 'login',
    component: () => import('../pages/Login.vue'),
    beforeEnter: [notRequiredAuth]
  },
]
export default routes