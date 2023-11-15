<script setup lang="ts">


const services: string[] = []
const user = "user"
</script>

<template>
  
    <h1>{{ user}} dashboard </h1>
    <div class="wrapper"> 
    <h2>my favorites</h2>
    <template v-if="services.length === 0">
      <p>no favorited </p>
    </template>
    <template v-else>
      <ul v-for="service in services" :key="service">
        <li> {{ service }} </li>
      </ul>
    </template>
    </div>
<div class="wrapper">
      <h2> my services </h2>
      <template v-if="services.length === 0">
      <p>no services</p>
      <NuxtLink class="cta__link" >add service</NuxtLink>
    </template>
    <template v-else>
      <ul v-for="service in services" :key="service">
        <li> {{ service }} </li>
      </ul>
    </template>  

    </div>
    <h1>{{ user}} dashboard </h1>
    <div class="wrapper"> 
    <h2>my favorites</h2>
    <template v-if="services.length === 0">
      <p>no favorited </p>
    </template>
    <template v-else>
      <ul v-for="service in services" :key="service">
        <li> {{ service }} </li>
      </ul>
    </template>
    </div>
<UContainer class="wrapper">
      <h2> my services </h2>
      <template v-if="services.length === 0">
      <p>no services</p>
      <NuxtLink class="cta__link" >add service</NuxtLink>
    </template>
    <template v-else>
      <ul v-for="service in services" :key="service">
        <li> {{ service }} </li>
      </ul>
    </template>  

    </UContainer>

    <!-- <ServiceFormPost /> -->
 
</template>
