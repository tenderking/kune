<template>
  <main>
    
      <div class="home-landing">
        <div class="home-landing-right">
          <img alt="Main page illustration" src="../assets/main.png" />
        </div>
        <div class="home-landing-left">
          <h1>
            At <span class="kune"> kune </span>, we provide an overwiew over
            digital services, including essential details about them.
          </h1>
          <h2>We have what you're looking for and more to discover</h2>
          <p>
            Are you looking for place to easily find digital services that you
            need in one place?. <span class="kune"> kune </span> makes it a
            pleasant journey. You will find innovation and convience.
          </p>
          <a href="#" class="colorful-button">Sign up</a>
        </div>
      </div>

      <!-- second section -->

      <section class="category-picker">
        <p class="category-picker-text">
          Find the best local businesses and services in your area
        </p>
        <div class="category-container">
          <div
            class="category-box"
            v-for="service in services"
            :key="service.id"
            :service="service"
          >
            <router-link @click="isActive = false" to="/services">
              <p>
                {{ service.category }}
              </p>
              <fa class="chevron-right" icon="chevron-right" />
            </router-link>
          </div>
        </div>
      </section>

      <!-- third section -->

      <section class="motivation-section">
        <div class="motivation-card-1">
          <p>
            Are you a business owner and looking for the place to showcase your
            business and attract customers. At
            <span class="kune"> kune </span> you can do exaclty just that.
          </p>
        </div>
        <div class="motivation-card-2">
          At <span class="kune"> kune </span> a vast number of Zimbabwean
          websites, what type of services they offer and where they a located.
          You can easily bookmark the services you find interesting if you want
          to come back to them
        </div>
      </section>
  
  </main>
  <Footer />
</template>

<script>
import Footer from "../components/Footer.vue";
import { services } from "../fake-data";
export default {
  components: { Footer },
  data() {
    return {
      services,
    };
  },
};
</script>
