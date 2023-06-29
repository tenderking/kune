<script lang="ts" setup>
import type { Services } from '@/types/Services'

defineProps<{ service: Services }>()
</script>

<template>
  <div class="card">
    <div class="card__image">
      <img class="service-item-image" :alt="`${service.ServiceName}-img`" src="@/assets/images/placeholder-image.png">
    </div>
    <div class="card__text">
      <h2 class="card__text-title">
        {{ service.ServiceName }}
      </h2>
      <p class="card__text-description">
        {{ service.Description }}
      </p>
    </div>

    <div class="card__icons">
      <a v-if="service.facebook_url" :href="service.facebook_url">
        <IconFacebook />
      </a>
      <a v-if="service.instagram_url" :href="service.instagram_url">
        <IconInstagram />
      </a>
      <a v-if="service.twitter_url" :href="service.twitter_url">
        <IconTwitter />
      </a>

      <a v-if="service.youtube_url" :href="service.youtube_url">
        <IconYoutube />
      </a>
    </div>
    <div class="flex">
      <IconWhatsApp width="16px" height="16px" />
      <span>
        077-233-222-999
      </span>
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
  background-color: var(--color-background-mute);
  outline: solid var(--color-border);
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
  align-items: left;
  width: 100%;
  padding: 1em;
  height: 60%;
  background-color: var(--color-background-soft);
}

.card__text-description {
  max-width: 30ch;
  padding-block: 1em;
  line-height: 1.3;
}

.card__text-title:hover {
  background: transparent;
  color: transparent;
  text-shadow: none;
  transition:
    all 1s;
}

.card__icons {
  background-color: var(--color-background-soft);

  width: 100%;
  margin-top: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.25em 1em;
}

a:hover {
  fill: var(--color--primary);
}

.flex {
  display: flex;
  gap: 0.5em;
  align-items: center;
}
</style>
