<template>
  <v-col class="pa-0">
    <VeeForm id="pagination-form">
      <v-col class="paginations">
        <v-row class="justify-center d-flex justify-sm-end">
          <v-col-auto class="d-flex align-center pa-3">
            Row Per Page:
            <v-col class="select-pagination pa-0">
              <Field
                name="rowPerPage"
                as="select"
                v-model="formData.rowPerPage"
                @change="onRowPerPageChange()"
              >
                <option value="10" selected>10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="75">75</option>
                <option value="100">100</option>
              </Field>
            </v-col>
          </v-col-auto>

          <v-col-auto class="d-flex align-center prev-next pa-3"
            ><span>{{ startIndex }}-{{ endIndex }} of {{ dataList?.total }}</span>
            <button type="button" class="prev" :disabled="currentPage === 1" @click="onPrevPage">
              <img src="@/assets/ticket-it/images/prev.svg" /></button
            ><button
              type="button"
              class="next"
              :disabled="endIndex >= dataList?.total"
              @click="onNextPage"
            >
              <img src="@/assets/ticket-it/images/next.svg" /></button
          ></v-col-auto>
        </v-row>
      </v-col>
    </VeeForm>
  </v-col>
</template>

<script>
import { defineComponent, toRef, ref, computed, watch } from 'vue'
import { Form as VeeForm, Field } from 'vee-validate'

export default defineComponent({
  name: 'pagination-list',
  components: {
    VeeForm,
    Field
  },
  props: {
    data: {
      type: Object,
      required: false
    },
    changeType: {
      type: String,
      required: false
    }
  },
  setup(props, { emit }) {
    const dataList = toRef(props, 'data')
    const changeTypeData = toRef(props, 'changeType')
    const currentPage = ref(1)
    const formData = ref({
      rowPerPage: '10'
    })

    const onRowPerPageChange = () => {
      emit('update-page', 1, formData.value.rowPerPage)
      currentPage.value = 1
    }

    const onPrevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value -= 1
        emit('update-page', currentPage.value, formData.value.rowPerPage)
      }
    }
    const onNextPage = () => {
      if (endIndex.value < dataList.value?.total) {
        currentPage.value += 1
        emit('update-page', currentPage.value, formData.value.rowPerPage)
      }
    }
    const startIndex = computed(() => {
      return (currentPage.value - 1) * formData.value.rowPerPage + 1
    })
    const endIndex = computed(() => {
      const lastRecordOnPage = currentPage.value * formData.value.rowPerPage
      return lastRecordOnPage > dataList.value?.total ? dataList.value?.total : lastRecordOnPage
    })

    // Watch for changes in dataList and reset currentPage to 1
    watch(changeTypeData, () => {
      currentPage.value = 1
    })

    return {
      dataList,
      formData,
      onRowPerPageChange,
      currentPage,
      startIndex,
      endIndex,
      onPrevPage,
      onNextPage
    }
  }
})
</script>
