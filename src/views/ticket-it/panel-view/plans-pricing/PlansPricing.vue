<template>
  <v-col class="pa-0">
    <page-loader v-if="loader" />
    <v-col class="detail-page-topbar pt-5 pb-5">
      <v-row class="align-center">
        <v-col cols="12">
          <v-col class="pa-0 subpage-title">Plans and Pricing</v-col>
        </v-col>
      </v-row>
    </v-col>

    <v-col class="pa-md-4">
      <v-row>
        <!-- all plans -->
        <v-col cols="12" sm="6" md="4">
          <v-col class="package-block pa-5">
            <div class="title">
              <div class="d-flex align-center">
                <img src="@/assets/ticket-it/images/trophy-basic.png" /> Basic Plan
              </div>
              <div class="choose-cta">
                <fill-button class="small-font-cta green-bg pa-3" v-if="activated"
                  >Choose Plan</fill-button
                >
                <div class="d-flex align-center activated-plan">
                  Activated <img src="@/assets/ticket-it/images/check.svg" />
                </div>
              </div>
            </div>
            <div class="price">$1,199 <span>/ Month</span></div>
            <div class="features">
              <ul>
                <li>This pseudo content has been the go-to standard for generations</li>
                <li>Serving as a reliable placeholder in the world of design</li>
                <li>It's a tool designed to seamlessly integrate into your design workflow</li>
                <li>Offering flexibility and ease in content presentation.</li>
                <li>
                  Net2ool the solution for generating effective placeholder content for your digital
                  endeavors.
                </li>
              </ul>
            </div>
          </v-col>
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-col class="package-block pa-5 secondary-bg">
            <div class="title">
              <div class="d-flex align-center">
                <img src="@/assets/ticket-it/images/trophy-premium.png" />Premium Plan
              </div>
              <div class="choose-cta">
                <fill-button class="small-font-cta green-bg pa-3">Choose Plan</fill-button>
              </div>
            </div>
            <div class="price">$3,199 <span>/ Month</span></div>
            <div class="features">
              <ul>
                <li>This pseudo content has been the go-to standard for generations</li>
                <li>Serving as a reliable placeholder in the world of design</li>
                <li>It's a tool designed to seamlessly integrate into your design workflow</li>
                <li>Offering flexibility and ease in content presentation.</li>
                <li>
                  Net2ool the solution for generating effective placeholder content for your digital
                  endeavors.
                </li>
                <li>This pseudo content has been the go-to standard for generations</li>
                <li>Serving as a reliable placeholder in the world of design</li>
              </ul>
            </div>
          </v-col>
        </v-col>

        <!-- saved cards -->
        <v-col cols="12" sm="12" md="4">
          <v-col class="single_batch_list h-100 pa-0">
            <div class="title_and_status">
              <v-col class="title">Saved Cards</v-col>
            </div>

            <v-col class="pb-0">
              <div class="single-card">
                <div class="primary-card"><img src="@/assets/ticket-it/images/check.svg" /></div>
                <div class="image"><img src="@/assets/ticket-it/images/visa.png" /></div>
                <div class="card-detail">
                  <h3>Visa...4198</h3>
                  <span>01/2025</span>
                </div>
                <div class="card-del">
                  <fill-button class="small-font-cta fixed-width pa-2"
                    ><img src="@/assets/ticket-it/images/del.svg"
                  /></fill-button>
                </div>
              </div>

              <div class="single-card">
                <div class="image"><img src="@/assets/ticket-it/images/master.png" /></div>
                <div class="card-detail">
                  <h3>Master...4198</h3>
                  <span>01/2025</span>
                </div>
                <div class="card-del">
                  <fill-button class="small-font-cta fixed-width pa-2"
                    ><img src="@/assets/ticket-it/images/del.svg"
                  /></fill-button>
                </div>
              </div>
            </v-col>

            <v-col class="pb-0 mb-3">
              <v-col class="no-batch pa-5 text-center">
                <p><img src="@/assets/ticket-it/images/exclamation.svg" /></p>
                <p>No Cards Available</p>
              </v-col>
            </v-col>

            <v-col class="pt-0">
              <fill-button class="small-font-cta green-bg pa-3" @click="addCreditCard()"
                >Add New Card</fill-button
              >
            </v-col>
          </v-col>
        </v-col>
      </v-row>
    </v-col>

    <v-col class="pa-md-4">
      <v-row class="mt-0 mb-0 pb-2 align-center">
        <v-col class="subpage-title" cols="12" sm="6" md="6">Invoice Detail</v-col>
      </v-row>
      <table-structure>
        <template v-slot:thead>
          <tr>
            <th>Sr. No</th>
            <th>Plan Name</th>
            <th>Plan Price</th>
            <th>Purchase Date</th>
            <th>Expiry Date</th>
            <th>Action</th>
          </tr>
        </template>
        <template v-slot:tbody>
          <tbody>
            <plans-table />
          </tbody>
        </template>
      </table-structure>
    </v-col>
  </v-col>

  <add-card v-if="showCardModal" v-on:closeModal="addCreditCard" />
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue'
import PageLoader from '@/components/ticket-it/loader/Loader.vue'
import FillButton from '@/components/ticket-it/buttons/FillButton.vue'
import AddCard from '@/views/ticket-it/panel-view/plans-pricing/add-card/AddCard.vue'
import TableStructure from '@/components/ticket-it/table/TableStructure.vue'
import PlansTable from '@/views/ticket-it/panel-view/plans-pricing/PlansTable.vue'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
import { useStore } from 'vuex'
import { useToast } from 'vue-toast-notification'

export default defineComponent({
  name: 'plans-pricing',
  components: {
    'page-loader': PageLoader,
    'fill-button': FillButton,
    'add-card': AddCard,
    'table-structure': TableStructure,
    'plans-table': PlansTable
  },
  setup() {
    const store = useStore()
    const loader = ref(false)
    const toast = useToast()
    const showCardModal = ref(false)

    const errorPlans = computed(() => {
      return store.getters.errorPlans
    })

    const fetchPlans = async () => {
      await store.dispatch(Actions.PLANS_LIST)
    }
    fetchPlans()

    const addCreditCard = () => {
      showCardModal.value = !showCardModal.value
    }

    watch(errorPlans, (newValue) => {
      toast.clear()
      if (newValue) {
        loader.value = false
        toast.error(errorPlans.value.errorMessage, {
          position: 'top-right'
        })
      }
    })

    return {
      loader,
      addCreditCard,
      showCardModal
    }
  }
})
</script>
