<script lang="ts" setup>
import { useDark } from '@vueuse/core'

const isActive = ref(false)
const circlePos = ref(8)
const isDark = useDark({
  selector: 'body',
  valueDark: 'dark',
  valueLight: 'light',
})
function toggleButton() {
  isActive.value = !isActive.value
  isDark.value = !isDark.value
}

watch(isActive, () => {
  if (circlePos.value === 8) {
    circlePos.value = 28

    return
  }

  return circlePos.value = 8
})
</script>

<template>
  <button class="main" @click="toggleButton">
    <svg
      width="36" height="16" viewBox="1 -1 36 18" fill="none" xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="icon-toggle" role="button"
    >
      <title id="icon-toggle">Toggle theme</title>
      <rect width="36" height="16" rx="8" class="rect" />
      <circle class="active" :cx="circlePos" cy="8" r="6" />
    </svg>
  </button>
</template>

<style  scoped>
.active {

fill: var(--color--text);
-webkit-transition: all 0.2s ease-in-out;
-moz-transition: all 0.2s ease-in-out;
transition: all 0.2s ease-in-out;
}

.rect {
fill: var(--color--bg);
stroke: var(--color--text);
stroke-width: 2px;
}

circle,
rect {
-webkit-transition: all 0.2s ease-in-out;
-moz-transition: all 0.2s ease-in-out;
transition: all 0.2s ease-in-out;
}
</style>
