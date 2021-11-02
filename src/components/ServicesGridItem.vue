<template>
  <div class="service-item">
    <h3 class="service-name">{{ service.name }}</h3>
    <p class="service-link">{{ service.category}}</p>
    <router-link v-bind:to="'/services/' + service.id">
      <button>View Details</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "ServicesGridItem",
  props: ["service"],
};
</script>

<style lang="scss" scoped>
.service-item {
  align-items: center;
  border-radius: 8px;
  box-shadow: 0px 2px 5px #888;
  display: flex;
  flex-direction: column;
  margin-bottom: 2%;
  padding: 20px;
  position: relative;
  width: 20%;
   border:2px solid blueviolet;
}
.service-name {
  margin-bottom: 0; 
  button {
    width: 100%;
    background-color: $secondaryDark;
  }
}
.service-link{
    color:$primary
}
</style>