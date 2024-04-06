<template>
  <v-container fluid class="register-page">
    <v-col no-gutters class="register-middle-area pa-0">
      <v-col class="pa-5 border-bottom d-flex">
        <v-col-auto class="pa-0 pe-4 me-4 pricing-page-back">
          <router-link :to="`${TICKET_IT}/login`">
            <img src="@/assets/ticket-it/images/go-back.svg" /> Back
          </router-link>
        </v-col-auto>
        <v-col class="pa-0">
          <v-col class="headline pa-0">Available Packages</v-col>
          <v-col class="subline pa-0"
            >Explore affordable packages for every stage of your business</v-col
          >
        </v-col>
      </v-col>

      <v-col class="pa-md-5">
        <v-row>
          <v-col cols="12" md="6">
            <v-col class="package-block pa-5">
              <div class="title">
                <img src="@/assets/ticket-it/images/trophy-basic.png" /> Basic Plan
              </div>
              <div class="price">$1,199 <span>/ Month</span></div>
              <div class="features">
                <ul>
                  <li>This pseudo content has been the go-to standard for generations</li>
                  <li>Serving as a reliable placeholder in the world of design</li>
                  <li>It's a tool designed to seamlessly integrate into your design workflow</li>
                  <li>Offering flexibility and ease in content presentation.</li>
                  <li>
                    Net2ool the solution for generating effective placeholder content for your
                    digital endeavors.
                  </li>
                </ul>
              </div>
            </v-col>
          </v-col>

          <v-col cols="12" md="6">
            <v-col class="package-block pa-5 secondary-bg">
              <div class="title">
                <img src="@/assets/ticket-it/images/trophy-premium.png" />Premium Plan
              </div>
              <div class="price">$3,199 <span>/ Month</span></div>
              <div class="features">
                <ul>
                  <li>This pseudo content has been the go-to standard for generations</li>
                  <li>Serving as a reliable placeholder in the world of design</li>
                  <li>It's a tool designed to seamlessly integrate into your design workflow</li>
                  <li>Offering flexibility and ease in content presentation.</li>
                  <li>
                    Net2ool the solution for generating effective placeholder content for your
                    digital endeavors.
                  </li>
                  <li>This pseudo content has been the go-to standard for generations</li>
                  <li>Serving as a reliable placeholder in the world of design</li>
                </ul>
              </div>
            </v-col>
          </v-col>
        </v-row>
      </v-col>
    </v-col>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue'
import { TICKET_IT } from '@/core/ticket-it/global/globalVariables.js'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'plans-page',
  components: {},
  setup() {
    const router = useRouter()
    const goToCard = () => {
      router.push(`${TICKET_IT}/login`)
    }

    return {
      TICKET_IT,
      goToCard
    }
  }
})
</script>
