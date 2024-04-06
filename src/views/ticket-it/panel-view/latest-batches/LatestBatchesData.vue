<template>
  <v-col class="pa-0">
    <page-loader v-if="loader" />
    <batch-listing
      :heading="batchValues?.name"
      :dateFrom="batchValues?.dateFrom"
      :dateTo="batchValues?.dateTo"
      :products="batchValues?.productAmount"
      :type="batchValues?.type"
      :lastEdit="batchValues?.lastEdited"
      :notes="batchValues?.notes"
      :expired="batchValues?.isExpired"
      :recalled="batchValues?.isRecalled"
      :sent="batchValues?.isSent"
    />
    <v-col class="batch_buttons" v-if="batchValues?.type !== 2">
      <v-row>
        <v-col cols="12" sm="3"
          ><button-with-icon
            v-if="roleName === HEAD_OFFICE"
            @click="deletebatch()"
            class="dark-primary"
            ><span><img src="@/assets/ticket-it/images/del.svg" /></span>
            <p>Delete</p></button-with-icon
          ></v-col
        >
        <v-col cols="12" sm="9" class="d-flex flex-wrap justify-sm-end pt-0 pt-sm-3">
          <router-link
            v-if="roleName === HEAD_OFFICE"
            :to="`${TICKET_IT}/latest-batches/send-notification?batchId=${batchValues?.batchId}`"
            class="cta_with_icon light-blue mr-2 mt-2 mt-sm-0"
            ><span><img src="@/assets/ticket-it/images/send.svg" /></span>
            <p>Send</p></router-link
          >
          <router-link
            class="cta_with_icon dark-blue mr-2 mt-2 mt-sm-0"
            :to="`${TICKET_IT}/latest-batches/batch-summary?batchId=${batchValues?.batchId}`"
            ><span><img src="@/assets/ticket-it/images/view.svg" /></span>
            <p>View Batch</p></router-link
          >
          <button-with-icon
            v-if="roleName === HEAD_OFFICE && batchValues?.spreadsheetPath"
            @click="exportBatch(batchValues?.spreadsheetPath)"
            class="dark-yellow mr-2 mt-2 mt-sm-0"
            ><span><img src="@/assets/ticket-it/images/export.svg" /></span>
            <p>Export</p></button-with-icon
          >
          <button-with-icon
            class="green-bg px-2"
            @click="recallModal()"
            v-if="roleName === HEAD_OFFICE && batchValues?.isSent"
            ><p>Recall Batch</p></button-with-icon
          >
        </v-col>
      </v-row>
    </v-col>

    <recall-batch v-if="modalStatus" :batchValues="batchValues" v-on:closeModal="recallModal" />
  </v-col>
</template>

<script>
import { defineComponent, toRef, ref, computed, watch } from 'vue'
import PageLoader from '@/components/ticket-it/loader/Loader.vue'
import BatchListing from '@/components/ticket-it/batch/BatchListing.vue'
import ButtonWithIcon from '@/components/ticket-it/buttons/ButtonWithIcon.vue'
import RecallBatch from '@/views/ticket-it/panel-view/latest-batches/recall-batch/RecallBatch.vue'
import { TICKET_IT } from '@/core/ticket-it/global/globalVariables.js'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
import { useStore } from 'vuex'
import { HEAD_OFFICE } from '@/core/ticket-it/global/globalVariables'
import { getUserData } from '@/core/ticket-it/services/JWTService'
import { IMG_BASE_URL } from '@/store/ticket-it/BaseUrl'
import { useToast } from 'vue-toast-notification'

export default defineComponent({
  name: 'latest-batches-data',
  components: {
    'batch-listing': BatchListing,
    'button-with-icon': ButtonWithIcon,
    'page-loader': PageLoader,
    'recall-batch': RecallBatch
  },
  props: {
    batchListData: {
      type: Object,
      required: false
    }
  },
  setup(props) {
    const roleName = getUserData()?.role
    const batchValues = toRef(props, 'batchListData')
    let modalStatus = ref(false)
    const loader = ref(false)
    const toast = useToast()
    const store = useStore()

    const recallModal = () => {
      modalStatus.value = !modalStatus.value
    }

    const errorBatch = computed(() => {
      return store.getters.errorBatch
    })
    const deleteBatchSuccess = computed(() => {
      return store.getters.deleteBatchSuccess
    })

    const deletebatch = async () => {
      if (window.confirm('Are you sure you want to delete this batch?')) {
        loader.value = true
        const batchId = batchValues.value?.batchId
        await store.dispatch(Actions.DELETE_BATCH, batchId)
      }
    }

    const exportBatch = (excelPath) => {
      window.open(IMG_BASE_URL + excelPath)
    }

    watch(errorBatch, (newValue) => {
      toast.clear()
      if (newValue) {
        loader.value = false
      }
    })
    watch(deleteBatchSuccess, (newValue) => {
      toast.clear()
      if (newValue) {
        loader.value = false
      }
    })

    return {
      TICKET_IT,
      batchValues,
      deletebatch,
      roleName,
      HEAD_OFFICE,
      exportBatch,
      loader,
      recallModal,
      modalStatus
    }
  }
})
</script>
