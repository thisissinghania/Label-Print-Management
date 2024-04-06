<template>
  <popup-area :sizeSM="`12`" :sizeMD="`8`" :sizeLG="`6`">
    <template v-slot:modalTitle>
      <page-loader v-if="loader" />
      <h3>ESL Detail</h3>
      <button class="close" @click="$emit('closeModal')">
        <img src="@/assets/ticket-it/images/close-modal.svg" alt="close-modal" />
      </button>
    </template>
    <template v-slot:modalContent>
      <div v-if="viewEslDataSuccess?.hasError == false && !loader">
        <h1 class="subpage-title mb-4 border-bottom pb-4">Base Information</h1>
        <v-col class="pa-0 mb-5">
          <v-row>
            <v-col cols="12" lg="6">
              <ul class="esl-double-divide">
                <li>
                  <strong>ESL Barcode :</strong>
                  <span>{{ viewEslDataSuccess?.data?.tagBarCode }}</span>
                </li>
                <li>
                  <strong>Model :</strong>
                  <span>{{ viewEslDataSuccess?.data?.model }}</span>
                </li>
                <li>
                  <strong>Shelf No :</strong>
                  <span>{{ viewEslDataSuccess?.data?.shelfCode }}</span>
                </li>
                <li>
                  <strong>Soft Version :</strong>
                  <span>{{ viewEslDataSuccess?.data?.softVersion }}</span>
                </li>
                <li>
                  <strong>Last Updated Time :</strong>
                  <span>{{ viewEslDataSuccess?.data?.updateTime }}</span>
                </li>
              </ul>
            </v-col>
            <v-col cols="12" lg="6">
              <ul class="esl-double-divide">
                <li>
                  <strong>Size :</strong>
                  <span>{{ viewEslDataSuccess?.data?.size }}</span>
                </li>
                <li>
                  <strong>TurnOver :</strong>
                  <span>{{ viewEslDataSuccess?.data?.turnOver }}</span>
                </li>
                <li>
                  <strong>Type :</strong>
                  <span>{{ viewEslDataSuccess?.data?.type }}</span>
                </li>
                <li>
                  <strong>Battery Level :</strong>
                  <span class="d-flex align-items-center">
                    {{ batterLevel }}%
                    <div class="battery-icon">
                      <div class="percent-parent">
                        <div
                          class="percentage"
                          :style="{
                            width: `${batterLevel}%`
                          }"
                        ></div>
                      </div>
                      <div class="battery-data">
                        <svg-icon type="mdi" :path="mdiBatteryOutline"></svg-icon>
                      </div>
                    </div>
                  </span>
                </li>
              </ul>
            </v-col>
          </v-row>
        </v-col>

        <h1 class="subpage-title mb-4 border-bottom pb-4 mt-8">Item Information</h1>
        <v-col class="table-data pa-0 mb-5">
          <v-col class="table-scroll pa-0 mb-5">
            <table class="custom-table-design" id="detailEsl">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Item Barcode</th>
                  <th>Item Name</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, i) in viewEslDataSuccess?.data?.itemBindInfos" :key="i">
                  <td>{{ data?.itemOrder }}</td>
                  <td>{{ data?.itemBarCode }}</td>
                  <td>{{ data?.itemName }}</td>
                </tr>
              </tbody>
            </table>
          </v-col>
        </v-col>

        <h1 class="subpage-title mb-4 border-bottom pb-4">ESL Information</h1>
        <v-col class="text-center pa-0">
          <template v-for="(image, i) in viewEslDataSuccess?.data?.images" :key="i">
            <img :src="`data:image/png;base64,${image}`" />
          </template>
        </v-col>
      </div>

      <v-col
        class="no-batch pa-5 text-center"
        v-if="viewEslDataSuccess?.hasError == true && !loader"
      >
        <p><img src="@/assets/ticket-it/images/exclamation.svg" /></p>
        <p>{{ errorEsl?.errorMessage }}</p>
      </v-col>
    </template>
  </popup-area>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue'
import Popover from '@/components/ticket-it/modals/AllModals.vue'
import PageLoader from '@/components/ticket-it/loader/Loader.vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiBatteryOutline } from '@mdi/js'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'esl-view',
  components: {
    'popup-area': Popover,
    'page-loader': PageLoader,
    SvgIcon
  },
  setup() {
    const loader = ref(true)
    const store = useStore()
    const batterLevel = ref('')

    const errorEsl = computed(() => {
      return store.getters.errorEsl
    })
    const viewEslDataSuccess = computed(() => {
      return store.getters.viewEslDataSuccess
    })

    const convertBatteryLevel = (level) => {
      switch (level) {
        case 1:
          batterLevel.value = '20'
          break
        case 2:
          batterLevel.value = '40'
          break
        case 3:
          batterLevel.value = '60'
          break
        case 4:
          batterLevel.value = '80'
          break
        case 5:
          batterLevel.value = '100'
          break
        default:
          batterLevel.value = '8'
      }
    }

    watch(errorEsl, (newVal) => {
      if (newVal) {
        loader.value = false
      }
    })
    watch(viewEslDataSuccess, (newVal) => {
      if (newVal) {
        loader.value = false
        convertBatteryLevel(newVal?.data?.batteryLevel)
      }
    })

    return {
      loader,
      viewEslDataSuccess,
      mdiBatteryOutline,
      errorEsl,
      batterLevel
    }
  }
})
</script>
