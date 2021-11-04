<template>
  <div id="home-wrap">
    <div class="home-landing">
      <div class="home-landing-right">
        <img alt="Main page illustration" src="../assets/main.png" />
      </div>
      <div class="home-landing-left">
        <h1>Kunoku <span class="kune"> kune </span></h1>
        <h2>What you're looking for and more to discover</h2>
        <p>
          Are you a local looking for place to easily find services that you ned
          in one place?. Kune makes it a pleasant journey. We provide an
          overwiew over the serviices and esseintial details about them
        </p>
        <a href="#" class="colorful-button">Sign up</a>
      </div>
    </div>
    <section class="category-picker">
      <p class="category-picker-text">
        Find the best local businesses and services in your area
      </p>
      <div class="category-container">

      <div class="category-box"
       v-for="service in services"
        :key="service.id"
        :service="service"
       
      ><router-link @click="isActive = false" to="/services">
      <p>
        {{service.category}}
        
        </p>
     <fa icon="chevron-right"/>
      </router-link>
        </div>
      
      </div>
    </section>
    <section class="motivation-section">
      <div class="motivation-card-1">
        <p >
          Are you a business owner and looking for the place to showcase your
          business and attract customers. At kune you can do exaclty just that.
        </p>
      </div>
      <div class="motivation-card-2">
        At kune a vast number of Zimbabwean websites, what type of services they
        offer and where they a located. You can easily bookmark the services you
        find interesting if you want to come back to them
      </div>
    </section>
  </div>
</template>

<script>
import { services } from "../fake-data";
export default{
  data(){
    return{
      services,
    
    }
  },

}

</script>

