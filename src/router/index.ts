import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/tabs',
      name: 'tabs',
      component: () => import('../views/TabsView.vue'),
      children: [
        {
          name: 'about',
          path: '',
          component: () => import('../views/tabs/TabsAbout.vue'),
          meta: { tabLabel: 'About', tabIcon: 'group' }
        },
        {
          name: 'blog',
          path: 'blog',
          component: () => import('../views/tabs/TabsBlog.vue'),
          meta: { tabLabel: 'Blog', tabIcon: 'feed' }
        },
        {
          name: 'contact',
          path: 'contact',
          component: () => import('../views/tabs/TabsContact.vue'),
          meta: { tabLabel: 'Contact', tabIcon: 'email' }
        },
        {
          name: 'related',
          path: 'related',
          component: () => import('../views/tabs/TabsRelated.vue'),
          meta: { tabLabel: 'Related', tabIcon: 'star' }
        },
      ]
    }
  ]
})

export default router
