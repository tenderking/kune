
<template>
  <div class="grid-wrap">
    
    <ServicesGridItem
        v-for="service in services"
        :key="service.id"
        :service="service" />
  </div>
</template>

<script>

import ServicesGridItem from './ServicesGridItem.vue';
export default {
    name: 'ServicesGrid',
    props: ['services'],
    components: {
        ServicesGridItem,
    },
}
</script>

<style lang="scss" scoped>
.grid-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content:center;
    margin-top: 16px;
    gap: 5em;
  }

</style>