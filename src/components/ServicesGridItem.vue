<template>
<div class="card-container">

<div >
  <h3 class="service-item-title" style="color: #5C8487;"> {{ service.name }}</h3>
</div>
  <div class="service-item">
    <div class="service-item-topDiv">
      <img class="service-item-image" v-bind:src="service.imgUrl" />
      <h3 class="service-item-title">{{ service.name }}</h3>

    </div>
    <div class="service-item-bottomDiv">

    <div class="service-item-address service-item-text">
      <fa icon="map" />
      <p>{{ service.address }}</p>
    </div>
    <div class="service-item-phone service-item-text">
      <fa icon="phone" />
      <p>077 123 456 789</p>
    </div>
    <div class="service-item-website service-item-text">
      <fa icon="link" />
      <a :href="service.websiteUrl">        
      <p>{{ service.websiteUrl }}</p>
      </a>
    </div>
    <div class="service-item-facebook service-item-text">
      <fa :icon="['fab','facebook']" />
      <p>www.facebook.com</p>
    </div>
    <div class="service-item-whatsapp service-item-text">
      <fa :icon="['fab','whatsapp']" />
      <p>unvailable</p>
    </div>
    </div>

    <!--   <router-link v-bind:to="'/services/' + service.id">
      <button>View Details</button>
    </router-link> -->
  </div>
  <div>
    <p class="service-description">{{service.description}}</p>
  </div>
</div>
</template>

<script>
export default {
  name: "ServicesGridItem",
  props: ["service"],
};
</script>
