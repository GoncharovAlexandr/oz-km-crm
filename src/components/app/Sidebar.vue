<template>
  <ul class="sidenav app-sidenav open">
    <li v-for="link in links" :key="link.url">
      <router-link
          :to="link.url"
          active-class="active"
          exact-active-class="active"
          class="nav-link"
      >
        {{ link.title }}
      </router-link>
    </li>
  </ul>
</template>
<style>
.nav-link {
  font-family: "Gothic", sans-serif;
  font-size: 2em;
  color: orange;
  transition: background-color 0.3s;
  text-align: left;
}

.nav-link.active {
  background-color: orange;
  color: white;
}

.nav-link:hover {
  color: black;
}
</style>
<script>
export default {
  props: ['value'],
  data() {
    return {
      links: [
        { title: 'Главная страница', url: '/dashboard' },
        { title: 'Задачи', url: '/categories' },
        { title: 'Календарь', url: '/calendar' },
        { title: 'История', url: '/history' },
      ],
    };
  },
};
</script>