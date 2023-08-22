<template>
  <div>
    <div class="app-main-layout">

      <Navbar @click=""/>
      <Sidebar />

      <main class="app-content">
        <div class="app-page">
          <router-view/>
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large black" to="/categories" style="height:50px;width:50px; display: flex; justify-content: center; align-items: center;">
          <i class="large material-icons">+</i>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
</script>
<script>
import Navbar from "@/components/app/Navbar.vue";
import Sidebar from "@/components/app/Sidebar.vue";
export default {
  name: 'main-layout',
  components: {
    Navbar, Sidebar
  }

}
</script>
