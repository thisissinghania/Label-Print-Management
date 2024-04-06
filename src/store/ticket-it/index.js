import { createStore } from 'vuex'
import AuthModule from '@/store/ticket-it/modules/auth-module/AuthModule'
import BatchModule from '@/store/ticket-it/modules/batch-module/BatchModule'
import ImageManagementModule from '@/store/ticket-it/modules/image-management-module/ImageManagementModule'
import UserAdministrationModule from '@/store/ticket-it/modules/user-administration-module/UserAdministrationModule'
import CoreModule from '@/store/ticket-it/modules/core-module/CoreModule'
import NotificationModule from '@/store/ticket-it/modules/notification-module/NotificationModule'
import YourAccountModule from '@/store/ticket-it/modules/your-account-module/YourAccountModule'
import PosModule from '@/store/ticket-it/modules/pos-module/PosModule'
import ReportModule from '@/store/ticket-it/modules/report-module/ReportModule'
import AdhocModule from '@/store/ticket-it/modules/adhoc-module/AdhocModule'
import InventoryModule from '@/store/ticket-it/modules/inventory-module/InventoryModule'
import ChangeReportModule from '@/store/ticket-it/modules/change-report-module/ChangeReportModule'
import PosPromotionModule from '@/store/ticket-it/modules/pos-promotion/PosPromotionModule'
import EslModule from '@/store/ticket-it/modules/esl-module/EslModule'
import PlansModule from '@/store/ticket-it/modules/plans-module/PlansModule'

const store = createStore({
  modules: {
    AuthModule,
    BatchModule,
    ImageManagementModule,
    UserAdministrationModule,
    CoreModule,
    NotificationModule,
    YourAccountModule,
    PosModule,
    ReportModule,
    AdhocModule,
    InventoryModule,
    ChangeReportModule,
    PosPromotionModule,
    EslModule,
    PlansModule
  }
})

export default store
