<template>
  <tr>
    <td>1</td>
    <td>Basic Plan</td>
    <td>$1,199 / Monthly</td>
    <td>10-Mar-2024</td>
    <td>10-Apr-2024</td>
    <td>
      <fill-button class="small-font-cta green-bg pa-3 fixed-width"
        ><img src="@/assets/ticket-it/images/downloads.png"
      /></fill-button>
    </td>
  </tr>
  <tr>
    <td>2</td>
    <td>Basic Plan</td>
    <td>$1,199 / Monthly</td>
    <td>10-Mar-2024</td>
    <td>10-Apr-2024</td>
    <td>
      <fill-button class="small-font-cta green-bg pa-3 fixed-width"
        ><img src="@/assets/ticket-it/images/downloads.png"
      /></fill-button>
    </td>
  </tr>
  <tr>
    <td>3</td>
    <td>Basic Plan</td>
    <td>$1,199 / Monthly</td>
    <td>10-Mar-2024</td>
    <td>10-Apr-2024</td>
    <td>
      <fill-button class="small-font-cta green-bg pa-3 fixed-width"
        ><img src="@/assets/ticket-it/images/downloads.png"
      /></fill-button>
    </td>
  </tr>
  <tr>
    <td>4</td>
    <td>Basic Plan</td>
    <td>$1,199 / Monthly</td>
    <td>10-Mar-2024</td>
    <td>10-Apr-2024</td>
    <td>
      <fill-button class="small-font-cta green-bg pa-3 fixed-width"
        ><img src="@/assets/ticket-it/images/downloads.png"
      /></fill-button>
    </td>
  </tr>
</template>
<script>
import { defineComponent } from 'vue'
import FillButton from '@/components/ticket-it/buttons/FillButton.vue'

export default defineComponent({
  name: 'plans-table',
  components: {
    'fill-button': FillButton
  },
  setup() {
    return {}
  }
})
</script>
