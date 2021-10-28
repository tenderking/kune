<template>
  <div :class="['container', { change: toggled }]" @click="myFunction">
    <div class="bar1"></div>
    <div class="bar2"></div>
    <div class="bar3"></div>
  </div>
</template>

<script>
export default {
  name: "MenuToggleCross",
  data: {
    toggled: false,
  },
  methods: {
    myFunction() {
      this.toggled = !this.toggled;
    },
  },
};
</script>

<style>

</style>
