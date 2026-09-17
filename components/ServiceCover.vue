<script lang="ts" setup>
const props = defineProps<{
  src?: string | null
  name: string
  category?: string
  alt?: string
}>()

const failed = ref(false)

const showImage = computed(() => {
  const src = props.src?.trim()
  if (!src || failed.value)
    return false
  if (src.includes('/@fs/') || src.includes('placeholder-image'))
    return false
  return true
})

watch(() => props.src, () => {
  failed.value = false
})

const initials = computed(() => {
  const parts = props.name.trim().split(/\s+/).filter(Boolean)
  if (parts.length >= 2)
    return `${parts[0]![0]}${parts[1]![0]}`.toUpperCase()
  return props.name.trim().slice(0, 2).toUpperCase() || 'K'
})

const accentHue = computed(() => {
  let hash = 0
  for (const char of props.name)
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  return hash % 360
})

const placeholderStyle = computed(() => ({
  background: `linear-gradient(145deg, hsl(${accentHue.value} 32% 18%) 0%, hsl(${(accentHue.value + 48) % 360} 28% 12%) 58%, hsl(28 70% 22%) 100%)`,
}))
</script>

<template>
  <div class="service-cover">
    <NuxtImg
      v-if="showImage"
      class="service-cover__image"
      :alt="alt || name"
      :src="src!"
      @error="failed = true"
    />
    <div v-else class="service-cover__placeholder" :style="placeholderStyle">
      <div class="service-cover__pattern" aria-hidden="true" />
      <div class="service-cover__mark">
        <span class="service-cover__initials">{{ initials }}</span>
        <span v-if="category" class="service-cover__category">{{ category }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.service-cover {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.service-cover__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 400ms ease;
}

.service-cover__placeholder {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f4f1ea;
}

.service-cover__pattern {
  position: absolute;
  inset: 0;
  opacity: 0.22;
  background-image:
    radial-gradient(circle at 20% 20%, hsl(28, 97%, 55%) 0 2px, transparent 3px),
    radial-gradient(circle at 80% 30%, hsl(160, 40%, 55%) 0 1.5px, transparent 2.5px),
    linear-gradient(135deg, transparent 40%, hsl(28 97% 55% / 0.18) 100%);
  background-size: 22px 22px, 18px 18px, 100% 100%;
}

.service-cover__mark {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  padding: 0.75rem;
  text-align: center;
}

.service-cover__initials {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  line-height: 1;
  text-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
}

.service-cover__category {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  opacity: 0.85;
  padding: 0.2rem 0.55rem;
  border-radius: 9999px;
  border: 1px solid hsl(28 97% 55% / 0.45);
  background: hsl(28 97% 55% / 0.12);
}
</style>
