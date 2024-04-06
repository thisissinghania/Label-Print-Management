<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'auth-layout',
  setup() {
    const router = useRouter()
    router.push({ name: 'login-page' })

    return {}
  }
})
</script>
