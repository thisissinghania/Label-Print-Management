<template>
  <v-slide-group v-model="model" class="pa-3">
    <v-slide-group-item>
      <v-col-auto class="single-slide">
        <label>
          <span><img src="@/assets/ticket-it/images/core-bg1.png" /></span>
          <p>
            <input type="radio" name="coreBg" />
            <span>Boutique-1</span>
          </p>
        </label>
      </v-col-auto>
    </v-slide-group-item>
    <v-slide-group-item>
      <v-col-auto class="single-slide">
        <label>
          <span><img src="@/assets/ticket-it/images/core-bg2.png" /></span>
          <p>
            <input type="radio" name="coreBg" />
            <span>Boutique-2</span>
          </p>
        </label>
      </v-col-auto>
    </v-slide-group-item>
    <v-slide-group-item>
      <v-col-auto class="single-slide">
        <label>
          <span><img src="@/assets/ticket-it/images/core-bg3.png" /></span>
          <p>
            <input type="radio" name="coreBg" />
            <span>Classic-1</span>
          </p>
        </label>
      </v-col-auto>
    </v-slide-group-item>
    <v-slide-group-item>
      <v-col-auto class="single-slide">
        <label>
          <span><img src="@/assets/ticket-it/images/core-bg4.png" /></span>
          <p>
            <input type="radio" name="coreBg" />
            <span>Contemporary-1</span>
          </p>
        </label>
      </v-col-auto>
    </v-slide-group-item>
    <v-slide-group-item>
      <v-col-auto class="single-slide">
        <label>
          <span><img src="@/assets/ticket-it/images/core-bg5.png" /></span>
          <p>
            <input type="radio" name="coreBg" />
            <span>Contemporary-3</span>
          </p>
        </label>
      </v-col-auto>
    </v-slide-group-item>
    <v-slide-group-item>
      <v-col-auto class="single-slide">
        <label>
          <span><img src="@/assets/ticket-it/images/core-bg6.png" /></span>
          <p>
            <input type="radio" name="coreBg" />
            <span>Market-3</span>
          </p>
        </label>
      </v-col-auto>
    </v-slide-group-item>
    <v-slide-group-item>
      <v-col-auto class="single-slide">
        <label>
          <span><img src="@/assets/ticket-it/images/core-bg1.png" /></span>
          <p>
            <input type="radio" name="coreBg" />
            <span>Boutique-1</span>
          </p>
        </label>
      </v-col-auto>
    </v-slide-group-item>
    <v-slide-group-item>
      <v-col-auto class="single-slide">
        <label>
          <span><img src="@/assets/ticket-it/images/core-bg2.png" /></span>
          <p>
            <input type="radio" name="coreBg" />
            <span>Boutique-2</span>
          </p>
        </label>
      </v-col-auto>
    </v-slide-group-item>
    <v-slide-group-item>
      <v-col-auto class="single-slide">
        <label>
          <span><img src="@/assets/ticket-it/images/core-bg3.png" /></span>
          <p>
            <input type="radio" name="coreBg" />
            <span>Classic-1</span>
          </p>
        </label>
      </v-col-auto>
    </v-slide-group-item>
    <v-slide-group-item>
      <v-col-auto class="single-slide">
        <label>
          <span><img src="@/assets/ticket-it/images/core-bg4.png" /></span>
          <p>
            <input type="radio" name="coreBg" />
            <span>Contemporary-1</span>
          </p>
        </label>
      </v-col-auto>
    </v-slide-group-item>
    <v-slide-group-item>
      <v-col-auto class="single-slide">
        <label>
          <span><img src="@/assets/ticket-it/images/core-bg5.png" /></span>
          <p>
            <input type="radio" name="coreBg" />
            <span>Contemporary-3</span>
          </p>
        </label>
      </v-col-auto>
    </v-slide-group-item>
    <v-slide-group-item>
      <v-col-auto class="single-slide">
        <label>
          <span><img src="@/assets/ticket-it/images/core-bg6.png" /></span>
          <p>
            <input type="radio" name="coreBg" />
            <span>Market-3</span>
          </p>
        </label>
      </v-col-auto>
    </v-slide-group-item>
  </v-slide-group>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'core-background',
  setup() {
    const model = ref(null)
    return {
      model
    }
  }
})
</script>
