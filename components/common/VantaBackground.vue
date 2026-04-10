<script setup lang="ts">
import * as THREE from 'three'
import CLOUDS from 'vanta/dist/vanta.clouds.min.js'

const vantaRef = ref<HTMLDivElement | null>(null)
let vantaEffect: ReturnType<typeof CLOUDS> | null = null

onMounted(() => {
  if (!vantaRef.value) return

  vantaEffect = CLOUDS({
    el: vantaRef.value,
    THREE,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    speed: 1.20,
    backgroundColor: 0xf8fbff,
    skyColor: 0xc8e4ff,
    cloudColor: 0xffffff,
    cloudShadowColor: 0xd4e8ff,
    sunColor: 0xffffff,
    sunlightColor: 0xe8f4ff,
  })
})

onBeforeUnmount(() => {
  if (vantaEffect) {
    vantaEffect.destroy()
    vantaEffect = null
  }
})
</script>

<template>
  <div
    ref="vantaRef"
    class="vanta-background"
  />
</template>

<style scoped>
.vanta-background {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100vh;
}
</style>
