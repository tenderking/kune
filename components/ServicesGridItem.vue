<script lang="ts" setup>
import type { Services } from '@/types/Services'

defineProps<{ service: Services }>()
</script>

<template>
  <div class="card">
    <div class="card__image">
      <img
        class="service-item-image"
        :alt="`${service.ServiceName}-img`"
        src="@/assets/images/placeholder-image.png"
      >
    </div>
    <div class="card__text">
      <h3 class="card__text-title">
        {{ service.ServiceName }}
      </h3>
      <p class="card__text-description">
        {{ service.Description }}
      </p>
    </div>
    <div class="flex">
      <IconWhatsApp width="16px" height="16px" />
      <span> 077-233-222-999 </span>
    </div>
  </div>
</template>

<style>
.card-container {
  max-width: max-content;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 275px;
  height: 375px;
    background-color: var(--color-card-bg);
  outline: solid var(--color--secondary);
  border-radius: 6px;
}

.card__image {
  display: inline-block;
  justify-items: center;
  width: 100%;
  height: 40%;
  margin-top: 0;
  border-radius: 6px 6px 0 0;
  overflow: hidden;
}

.card__text {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  padding: 1em;
  height: 60%;
  background-color: var(--color-card-bg);
}

.card__text-description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 4;
}

.card__text-title{
  text-decoration: double var(--color--primary) 2px;
  color: var(--color--primary);
}

.card__icons {
  background-color: var(--color--bg);
  width: 100%;
  margin-top: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.25em 1em;
}

.flex {
  display: flex;
  gap: 0.5em;
  align-items: center;
  background-color: var(---color-card-bg);
}
</style>
