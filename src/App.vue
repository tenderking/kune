<template>
  <div class="navbar">
    <!-- Left-aligned links -->
    <router-link class="logo" to="/"> Kune </router-link>
    
    <!-- Right-aligned links -->
    <div class="nav-right">
    
      
      <router-link to="/about">
        <button>Sign in</button>
      </router-link>
      
      <div class="menu-div">
        <div class="menu-text">Menu</div>
        <div class="menu-text" />
        <div class="dropdown-content">
          <div class="header">
            <h2>Mega Menu</h2>
          </div>
          <div class="row">
            <div class="column">
              <h3>Category 1</h3>
              <a href="#">Link 1</a>
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
            </div>
            <div class="column">
              <h3>Category 2</h3>
              <a href="#">Link 1</a>
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
            </div>
            <div class="column">
              <h3>Category 3</h3>
              <a href="#">Link 1</a>
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
  <router-view />
</template>
