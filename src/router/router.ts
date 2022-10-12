import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    redirect: '/auth/log-in',
    name: 'auth',
    path: '/auth',
    component: () => import('@/views/auth/wrapper/Wrapper.vue'),
    children: [
      {
        path: '/auth/log-in',
        name: 'log-in',
        component: () => import('@/views/auth/LogIn.vue'),
        meta: {
          open: true
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior: () => {
    return { top: 0, behavior: 'smooth' }
  }
})

router.beforeEach(async (to, _, next) => {
  if (!to.matched.length) {
    next({
      name: '404'
    })
  } else if (to.meta.open) {
    next()
  } else {
    // LOGGED-IN
    // if (loggedIn.value) {
    //   next()
    // }
    // COOKIE LOG-IN
    // else if (cookieToken && !loggedIn.value) {
    //   try {
    //     await cookieAuthorize(cookieToken)
    //     next()
    //   } catch (error) {
    //     next({
    //       name: 'log-in'
    //     })
    //   }

    // NO TOKEN
    // } else {

    next({
      name: 'log-in'
    })

    // }
  }
})

export default router
