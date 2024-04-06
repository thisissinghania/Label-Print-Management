import { createRouter, createWebHistory } from 'vue-router'
import AllPanel from '@/views/AllPanel.vue'
import { TICKET_IT } from '@/core/ticket-it/global/globalVariables.js'
import { getToken, getUserData } from '@/core/ticket-it/services/JWTService'
import {
  ADMIN,
  HEAD_OFFICE,
  REGIONAL_MANAGER,
  FRANCHISEE
} from '@/core/ticket-it/global/globalVariables'

const routes = [
  {
    path: '/',
    name: 'all-panels',
    component: AllPanel,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: `${TICKET_IT}`,
    name: 'auth-layout',
    meta: {
      requiresAuth: false
    },
    component: () => import('@/layouts/ticket-it/AuthLayout.vue'),
    children: [
      {
        path: `${TICKET_IT}/login`,
        name: 'login-page',
        component: () => import('@/views/ticket-it/auth-view/login/LoginPage.vue')
      },
      {
        path: `${TICKET_IT}/forgot-password`,
        name: 'forgot-password',
        component: () => import('@/views/ticket-it/auth-view/forgot-password/ForgotPassword.vue')
      },
      {
        path: `${TICKET_IT}/update-password`,
        name: 'update-password',
        component: () => import('@/views/ticket-it/auth-view/update-password/UpdatePassword.vue')
      },
      {
        path: `${TICKET_IT}/register`,
        name: 'register-page',
        component: () => import('@/views/ticket-it/auth-view/register/RegisterPage.vue')
      },
      {
        path: `${TICKET_IT}/plans`,
        name: 'plans-page',
        component: () => import('@/views/ticket-it/auth-view/plans/Plans.vue')
      }
    ]
  },
  {
    path: `${TICKET_IT}`,
    name: 'main-layout',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/layouts/ticket-it/MainLayout.vue'),
    children: [
      {
        path: `${TICKET_IT}/latest-batches`,
        name: 'latest-batches',
        component: () => import('@/views/ticket-it/panel-view/latest-batches/LatestBatches.vue')
      },
      {
        path: `${TICKET_IT}/latest-batches/batch-summary`,
        name: 'batch-summary',
        component: () => import('@/views/ticket-it/panel-view/batch-summary/BatchSummary.vue')
      },
      {
        path: `${TICKET_IT}/latest-batches/send-notification`,
        name: 'send-notification',
        component: () =>
          import('@/views/ticket-it/panel-view/send-notification/SendNotification.vue')
      },
      {
        path: `${TICKET_IT}/latest-batches/create-inventory`,
        name: 'create-inventory',
        component: () =>
          import('@/views/ticket-it/panel-view/latest-batches/create-inventory/CreateInventory.vue')
      },
      {
        path: `${TICKET_IT}/latest-batches/create-pos-promotion`,
        name: 'create-pos-promotion',
        component: () =>
          import(
            '@/views/ticket-it/panel-view/latest-batches/create-pos-promotion/CreatePOSPromotion.vue'
          )
      },
      {
        path: `${TICKET_IT}/latest-batches/create-pos-purchase-order`,
        name: 'create-pos-purchase-order',
        component: () =>
          import(
            '@/views/ticket-it/panel-view/latest-batches/create-pos-purchase-order/CreatePOSPurchaseOrder.vue'
          )
      },
      {
        path: `${TICKET_IT}/adhoc-tickets`,
        name: 'adhoc-tickets',
        component: () => import('@/views/ticket-it/panel-view/adhoc-tickets/AdhocTickets.vue')
      },
      {
        path: `${TICKET_IT}/preview-all-ticket`,
        name: 'preview-all-ticket',
        component: () =>
          import('@/views/ticket-it/panel-view/preview-all-ticket/PreviewAllTicket.vue')
      },
      {
        path: `${TICKET_IT}/reports`,
        name: 'batches-report',
        component: () => import('@/views/ticket-it/panel-view/reports/BatchesReport.vue')
      },
      {
        path: `${TICKET_IT}/reports/change-report`,
        name: 'change-report',
        component: () =>
          import('@/views/ticket-it/panel-view/reports/change-report/ChangeReport.vue')
      },
      {
        path: `${TICKET_IT}/image-management`,
        name: 'image-management',
        component: () => import('@/views/ticket-it/panel-view/image-management/ImageManagement.vue')
      },
      {
        path: `${TICKET_IT}/user-administrator`,
        name: 'user-administrator',
        component: () =>
          import('@/views/ticket-it/panel-view/user-administrator/UserAdministrator.vue')
      },
      {
        path: `${TICKET_IT}/core-master`,
        name: 'core-master',
        component: () => import('@/views/ticket-it/panel-view/core-master/CoreMaster.vue')
      },
      {
        path: `${TICKET_IT}/ticket-setup`,
        name: 'ticket-setup',
        component: () => import('@/views/ticket-it/panel-view/ticket-setup/TicketSetup.vue')
      },
      {
        path: `${TICKET_IT}/your-account`,
        name: 'your-account',
        component: () => import('@/views/ticket-it/panel-view/your-account/YourAccount.vue')
      },
      {
        path: `${TICKET_IT}/user-administrator/create-user`,
        name: 'create-user',
        component: () =>
          import('@/views/ticket-it/panel-view/user-administrator/create-user/CreateUser.vue')
      },
      {
        path: `${TICKET_IT}/building-ticket`,
        name: 'building-ticket-page',
        component: () =>
          import(
            '@/views/ticket-it/panel-view/adhoc-tickets/building-ticket/BuildingTicketPage.vue'
          )
      },
      {
        path: `${TICKET_IT}/building-ticket-png`,
        name: 'building-ticket-png-page',
        component: () =>
          import(
            '@/views/ticket-it/panel-view/adhoc-tickets/building-ticket/BuildingTicketPngPage.vue'
          )
      },
      {
        path: `${TICKET_IT}/esl-management`,
        name: 'esl-management',
        component: () => import('@/views/ticket-it/panel-view/esl-management/EslManagement.vue')
      },
      {
        path: `${TICKET_IT}/plans-and-pricing`,
        name: 'plans-pricing',
        component: () => import('@/views/ticket-it/panel-view/plans-pricing/PlansPricing.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: `/`
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
  // base: `/ticket-it-vue`
})

router.beforeEach((to, from, next) => {
  const roleName = getUserData()?.role
  const isAuthenticated = getToken() !== null

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login-page' })
  } else if (!to.meta.requiresAuth && isAuthenticated) {
    if (roleName === ADMIN) {
      next({ name: 'user-administrator' })
    } else if (roleName === HEAD_OFFICE) {
      next({ name: 'latest-batches' })
    } else if (roleName === REGIONAL_MANAGER) {
      next({ name: 'batches-report' })
    } else if (roleName === FRANCHISEE) {
      next({ name: 'latest-batches' })
    }
  } else {
    if (to.name === 'update-password' && !to.query.token) {
      next({ name: 'login-page' })
    } else {
      if (roleName === ADMIN && restrictedAdminPages.includes(to.name)) {
        next({ name: 'user-administrator' })
      } else if (roleName === HEAD_OFFICE && restrictedHeadOfficePages.includes(to.name)) {
        next({ name: 'latest-batches' })
      } else if (
        roleName === REGIONAL_MANAGER &&
        restrictedRegionalManagerPages.includes(to.name)
      ) {
        next({ name: 'batches-report' })
      } else if (roleName === FRANCHISEE && restrictedFranchiseePages.includes(to.name)) {
        next({ name: 'latest-batches' })
      } else {
        next()
      }
    }
  }
})

const restrictedAdminPages = [
  'latest-batches',
  'batch-summary',
  'send-notification',
  'create-inventory',
  'create-pos-promotion',
  'create-pos-purchase-order',
  'adhoc-tickets',
  'preview-all-ticket',
  'batches-report',
  'change-report',
  'image-management',
  'core-master',
  'ticket-setup'
]
const restrictedHeadOfficePages = ['create-user']
const restrictedRegionalManagerPages = [
  'user-administrator',
  'create-user',
  'latest-batches',
  'batch-summary',
  'send-notification',
  'create-inventory',
  'create-pos-promotion',
  'create-pos-purchase-order',
  'adhoc-tickets',
  'preview-all-ticket',
  'change-report',
  'core-master',
  'ticket-setup'
]
const restrictedFranchiseePages = [
  'create-pos-purchase-order',
  'create-pos-promotion',
  'create-inventory',
  'send-notification',
  'user-administrator',
  'create-user',
  'batches-report',
  'image-management',
  'change-report',
  'core-master',
  'ticket-setup'
]

export default router
