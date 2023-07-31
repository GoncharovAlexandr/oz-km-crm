<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#">
          <i class="material-icons black-text">Компьютерный Мир</i>
        </a>
        <span class="time-date">{{ currentTime }} - {{ currentDate }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
              class="dropdown-trigger black-text"
              href="#"
              data-target="dropdown"
              ref="dropdown"
          >
            Пользователь
            <i class="material-icons right">user</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click="logout">
                <i class="material-icons"></i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import M from "materialize-css";

export default {
  mounted() {
    M.Dropdown.init(this.$refs.dropdown, { constrainWidth: false });
    this.updateTime();
  },
  data() {
    return {
      currentTime: '',
      currentDate: ''
    };
  },
  methods: {
    updateTime() {
      const now = new Date();
      const options = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
      };
      this.currentTime = now.toLocaleTimeString('ru-RU', options);
      this.currentDate = now.toLocaleDateString('ru-RU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      setTimeout(this.updateTime, 1000); // Обновляем время каждую секунду
    },
    logout() {
      // Добавьте здесь логику для выхода из аккаунта и уведомления о выходе
      alert("Вы вышли из системы.");
      // Перенаправьте пользователя на страницу логина
      this.$router.push("/login");
    }
  }
};
</script>

<style>
.time-date {
  margin-left: 10px;
  font-size: 14px;
  color: #000000;
}
</style>
