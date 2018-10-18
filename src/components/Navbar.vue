<template>
  <nav class="nav-extended indigo darken-2">
    <div class="nav-content">
      <router-link :to="{ name: 'Home' }">
        <span class="nav-title">Super Smoothies</span>
      </router-link>
      <a href="" class="btn-floating btn-large halfway-fab pink">
        <router-link :to="{ name: 'AddSmoothie' }">
          <i class="material-icons">add</i>
        </router-link>
      </a>
      
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() { return {

  }}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  nav {
    padding: 0 1.5em;
  }
</style>
