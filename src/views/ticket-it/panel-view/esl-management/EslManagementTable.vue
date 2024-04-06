<template>
  <tr :class="checkVal == true ? 'checked_row' : ''">
    <td>
      <v-col-auto class="pa-0 w-auto custom_check mr-2 px-5"
        ><input
          type="checkbox"
          :name="`check${tableRow?.id}`"
          :checked="checkVal"
          @change="onChangeVal(tableRow?.priceTagCode)"
      /></v-col-auto>
    </td>
    <td>{{ tableRow?.priceTagCode }}</td>
    <td>{{ tableRow?.oemModel }}</td>
    <td>{{ tableRow?.productSku }}</td>
    <td>{{ tableRow?.productName }}</td>
    <td>{{ tableRow?.productPrice }}</td>
    <td>
      <v-chip v-if="tableRow?.state" color="green" class="p-4"> Online </v-chip>
      <v-chip v-else color="gray" class="p-4"> Offline </v-chip>
    </td>
    <td>{{ formatDateTime(tableRow?.updateTime) }}</td>
    <td>
      <v-col cols="12 pa-0" class="d-flex">
        <v-tooltip text="Flash" location="top">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" class="mr-3 dark-yellow sunlight-icon">
              <img src="@/assets/ticket-it/images/lights.png" />
              <v-menu activator="parent">
                <v-list>
                  <v-list-item
                    v-for="(item, i) in colorList"
                    :key="i"
                    :value="item.value"
                    @click="flashColor(item.value)"
                  >
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-btn>
          </template>
        </v-tooltip>

        <v-tooltip text="Connect" location="top">
          <template v-slot:activator="{ props }">
            <fill-button
              v-bind="props"
              :disabled="tableRow?.isAssigned == true"
              class="small-font-cta dark-blue mr-3 handshake-icon px-2"
              @click="eslConnect(tableRow?.priceTagCode)"
              ><img src="@/assets/ticket-it/images/handshake.png"
            /></fill-button>
          </template>
        </v-tooltip>

        <v-tooltip text="View" location="top">
          <template v-slot:activator="{ props }">
            <fill-button
              v-bind="props"
              class="small-font-cta green-bg mr-3"
              @click="eslView(tableRow?.priceTagCode)"
              ><img src="@/assets/ticket-it/images/eyes.svg"
            /></fill-button>
          </template>
        </v-tooltip>

        <v-tooltip text="Disconnect" location="top">
          <template v-slot:activator="{ props }">
            <fill-button
              v-bind="props"
              :disabled="tableRow?.isAssigned == false"
              class="small-font-cta position-relative image-filter px-3"
              @click="disconnectEsl(tableRow?.priceTagCode)"
              ><img src="@/assets/ticket-it/images/no-hand.png" />
            </fill-button>
          </template>
        </v-tooltip>
      </v-col>
    </td>
  </tr>

  <esl-view v-if="eslModalView" v-on:closeModal="eslView" />
  <connect-esl
    v-if="eslModalConnect"
    v-on:closeModal="eslConnect"
    :eslBarCodeData="eslBarCodeData"
  />
  <page-loader v-if="loader" />
</template>

<script>
import { defineComponent, toRef, ref, computed, watch } from 'vue'
import FillButton from '@/components/ticket-it/buttons/FillButton.vue'
import EslView from '@/views/ticket-it/panel-view/esl-management/esl-view/EslView.vue'
import ConnectEsl from '@/views/ticket-it/panel-view/esl-management/connect-esl/ConnectEsl.vue'
import PageLoader from '@/components/ticket-it/loader/Loader.vue'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
import { colorList } from '@/core/ticket-it/data/Colors.js'
import { useStore } from 'vuex'
import { formatDateTime } from '@/core/ticket-it/global/Utils.js'

export default defineComponent({
  name: 'esl-management-table',
  components: {
    'fill-button': FillButton,
    'esl-view': EslView,
    'connect-esl': ConnectEsl,
    'page-loader': PageLoader
  },
  props: {
    tableData: {
      type: Object,
      required: false
    },
    selectedRows: {
      type: Array,
      required: false
    },
    checkParentVal: {
      type: Boolean,
      required: false
    }
  },
  setup(props) {
    const selectedRow = toRef(props, 'selectedRows')
    const checkParentValue = toRef(props, 'checkParentVal')
    const loader = ref(false)
    const tableRow = toRef(props, 'tableData')
    const eslModalView = ref(false)
    const eslModalConnect = ref(false)
    const store = useStore()
    const eslBarCodeData = ref()
    let checkVal = ref(false)

    const errorEsl = computed(() => {
      return store.getters.errorEsl
    })
    const disconnectEslSuccess = computed(() => {
      return store.getters.disconnectEslSuccess
    })
    const flashColorSuccess = computed(() => {
      return store.getters.flashColorSuccess
    })
    const selectedRowsLength = computed(() => {
      return selectedRow.value?.length
    })

    const eslView = async (params) => {
      eslModalView.value = !eslModalView.value
      if (eslModalView.value) {
        await store.dispatch(Actions.VIEW_ESL, { barcode: params })
      }
    }

    const eslConnect = (eslBarcode) => {
      eslBarCodeData.value = eslBarcode
      eslModalConnect.value = !eslModalConnect.value
    }

    const disconnectEsl = async (priceTagCode) => {
      if (window.confirm('Are you sure you want to disconnect the ESL ?')) {
        loader.value = true
        const payload = {
          eslBarCodes: [`${priceTagCode}`]
        }
        await store.dispatch(Actions.DISCONNECT_ESL, payload)
      }
    }

    const onChangeVal = (priceTagCode) => {
      checkVal.value = !checkVal.value
      if (checkVal.value) {
        selectedRow.value.push(priceTagCode)
      } else {
        selectedRow.value.splice(selectedRow.value.indexOf(priceTagCode), 1)
      }
    }

    const flashColor = async (name) => {
      loader.value = true
      const payload = {
        eslBarCodes: [`${tableRow.value?.priceTagCode}`],
        lightColor: name,
        duration: 15
      }
      await store.dispatch(Actions.FLASH_COLOR, payload)
    }

    watch(checkParentValue, (newValue) => {
      if (newValue) {
        checkVal.value = true
      } else {
        checkVal.value = false
      }
    })
    watch(selectedRowsLength, (newSelectedRows) => {
      if (newSelectedRows === 0) {
        checkVal.value = false
      }
    })

    watch(errorEsl, (newVal) => {
      if (newVal) {
        loader.value = false
      }
    })
    watch(disconnectEslSuccess, (newVal) => {
      if (newVal) {
        loader.value = false
      }
    })
    watch(flashColorSuccess, (newVal) => {
      if (newVal) {
        loader.value = false
      }
    })

    return {
      tableRow,
      eslView,
      eslModalView,
      disconnectEsl,
      loader,
      eslModalConnect,
      eslConnect,
      formatDateTime,
      eslBarCodeData,
      onChangeVal,
      checkVal,
      colorList,
      flashColor
    }
  }
})
</script>
