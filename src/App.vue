<template>
  <div id="app">
    <Navbar/>
    <router-view class="container"/>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar"

export default {
  name: "App",
    components: {
    Navbar
  },

}
</script>


<style lang="scss">

</style>
