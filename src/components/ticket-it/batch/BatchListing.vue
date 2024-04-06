<template>
  <v-col class="pa-0">
    <v-col class="title_and_status">
      <v-row>
        <v-col class="title" cols="12" sm="8">{{ heading }}</v-col>
        <v-col class="status pt-0 pt-sm-3 d-flex justify-sm-end" cols="12" sm="4">
          <div v-if="expired" class="grey-text">Expired</div>
          <div v-else class="green-text">Active</div>
          <span class="mr-5"></span>
          <div v-if="recalled" class="grey-text">Recalled</div>
          <div v-else-if="sent" class="yellow-text">Sent</div>
          <span v-if="sent || recalled"></span>
        </v-col>
      </v-row>
    </v-col>
    <v-col class="date_and_types">
      <v-row>
        <v-col class="data_type" cols="12" md="7" lg="8">
          <h4>date</h4>
          <p>{{ formatDate(dateFrom) }} - {{ formatDate(dateTo) }}</p>
        </v-col>
        <v-col cols="12" md="5" lg="4">
          <v-row>
            <v-col class="data_type" cols="12" sm="4">
              <h4>products</h4>
              <p>{{ products }}</p>
            </v-col>
            <v-col class="data_type" cols="12" sm="4">
              <h4>type</h4>
              <p v-if="type == 1">PROMO</p>
              <p v-if="type == 2">ADHOC</p>
              <p v-if="type == 3">CORE</p>
            </v-col>
            <v-col class="data_type" cols="12" sm="4">
              <h4>last edit</h4>
              <p>{{ formatDate(lastEdit) }}</p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
    <v-col class="notes">
      <h4>notes</h4>
      <p>
        {{ notes }}
      </p>
    </v-col>
  </v-col>
</template>

<script>
import { defineComponent } from 'vue'
import { formatDate } from '@/core/ticket-it/global/Utils.js'

export default defineComponent({
  name: 'single-batch-list',
  props: {
    heading: {
      type: String,
      required: false
    },
    dateFrom: {
      type: String,
      required: false
    },
    dateTo: {
      type: String,
      required: false
    },
    products: {
      type: String,
      required: false
    },
    type: {
      type: String,
      required: false
    },
    lastEdit: {
      type: String,
      required: false
    },
    notes: {
      type: String,
      required: false
    },
    expired: {
      type: Boolean,
      required: false
    },
    recalled: {
      type: Boolean,
      required: false
    },
    sent: {
      type: Boolean,
      required: false
    }
  },
  setup() {
    return {
      formatDate
    }
  }
})
</script>
