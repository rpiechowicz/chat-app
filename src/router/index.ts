import { createRouter, createWebHistory } from 'vue-router'
import { isLogged } from '../store/user'

const routes = [
  {
    path: '/auth/login',
    name: 'auth-login',
    component: () => import('@/views/AuthPage.vue'),
    meta: {
      open: true
    }
  },
  {
    path: '/',
    redirect: '/dashboard',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    meta: {
      open: false
    },
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: {
          open: false
        }
      },
      {
        path: '/users',
        name: 'users',
        component: () => import('@/views/Users.vue'),
        meta: {
          open: false
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.base_url),
  routes,
  scrollBehavior: () => {
    return { top: 0, behavior: 'smooth' }
  }
})

router.beforeEach((to, from, next) => {
  if (!to.matched.length) {
    next({
      name: '404'
    })
  } else if (to.meta.open) {
    if (isLogged.value && to.name === 'auth-login') {
      next({
        name: 'home'
      })
    }

    next()
  } else {
    if (isLogged.value) {
      next()
    } else {
      next({
        name: 'auth-login'
      })
    }
  }
})

export default router
