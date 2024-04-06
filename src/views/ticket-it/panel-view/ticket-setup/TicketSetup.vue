<template>
  <v-col class="pa-0">
    <v-col class="detail-page-topbar pt-5 pb-5">
      <v-row class="align-center">
        <v-col cols="12">
          <v-col class="pa-0 subpage-title">Ticket Setup</v-col>
          <v-col class="pa-0 subtitle mt-1"
            >Welcome to Ticket-IT. Here you can select the background and the style of your point of
            sale ticket.</v-col
          >
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12 mt-4">
      <v-col class="pa-0 subtitle text-center">Your preferences have been saved.</v-col>
      <v-col class="pa-0 d-flex justify-center"
        ><router-link
          :to="`${TICKET_IT}/ticket-setup`"
          class="custom_fill_cta small-font-cta green-bg mt-3"
          >Get Started Here</router-link
        ></v-col
      >
    </v-col>

    <v-col class="pa-md-5 ticket-accordians">
      <v-expansion-panels v-model="panel" multiple>
        <!-- accordian start -->
        <v-expansion-panel>
          <v-expansion-panel-title>Create Core Ticket</v-expansion-panel-title>
          <v-expansion-panel-text>
            <!-- inset panel -->
            <v-expansion-panels v-model="panelInset" multiple>
              <v-expansion-panel>
                <v-expansion-panel-title> Select Core Background</v-expansion-panel-title>
                <v-expansion-panel-text>
                  <core-background />
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>Select Core Style</v-expansion-panel-title>
                <v-expansion-panel-text>
                  <core-style />
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>Select Core Print Method</v-expansion-panel-title>
                <v-expansion-panel-text>
                  <core-print-method />
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
            <!-- inset panel -->
          </v-expansion-panel-text>
        </v-expansion-panel>
        <!-- accordian end -->

        <!-- accordian start -->
        <v-expansion-panel>
          <v-expansion-panel-title>Create Promo Ticket</v-expansion-panel-title>
          <v-expansion-panel-text></v-expansion-panel-text>
        </v-expansion-panel>
        <!-- accordian start -->

        <!-- accordian start -->
        <v-expansion-panel>
          <v-expansion-panel-title>Confirm Ticket Setup</v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-col class="pa-5 pb-0 d-flex align-center ticket-name">
              Ticket Name
              <Field name="ticketname" type="text" class="ml-4" />
            </v-col>
            <confirm-ticket-setup />
            <v-col class="d-flex justify-end pa-5">
              <button-with-icon class="ml-3"
                ><span><img src="@/assets/ticket-it/images/cancel-cta.svg" /></span>
                <p>Cancel</p></button-with-icon
              >
              <button-with-icon class="green-bg ml-3"
                ><span><img src="@/assets/ticket-it/images/check-cta.svg" /></span>
                <p>Save</p></button-with-icon
              >
            </v-col>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <!-- accordian start -->
      </v-expansion-panels>
    </v-col>
  </v-col>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { Field } from 'vee-validate'

import CoreBackground from '@/views/ticket-it/panel-view/ticket-setup/create-core-ticket/CoreBackground.vue'
import CoreStyle from '@/views/ticket-it/panel-view/ticket-setup/create-core-ticket/CoreStyle.vue'
import CorepPrintMethod from '@/views/ticket-it/panel-view/ticket-setup/create-core-ticket/CorepPrintMethod.vue'
import ConfirmTicketSetup from '@/views/ticket-it/panel-view/ticket-setup/confirm-ticket-setup/ConfirmTicketSetup.vue'
import ButtonWithIcon from '@/components/ticket-it/buttons/ButtonWithIcon.vue'
import { TICKET_IT } from '@/core/ticket-it/global/globalVariables.js'

export default defineComponent({
  name: 'ticket-setup',
  components: {
    'core-background': CoreBackground,
    'core-style': CoreStyle,
    'core-print-method': CorepPrintMethod,
    'confirm-ticket-setup': ConfirmTicketSetup,
    'button-with-icon': ButtonWithIcon,
    Field
  },
  setup() {
    const panel = ref([0])
    const panelInset = ref([0])

    return {
      panel,
      panelInset,
      TICKET_IT
    }
  }
})
</script>
