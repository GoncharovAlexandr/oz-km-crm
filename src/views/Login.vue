<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Войти в аккаунт:</span>
      <div class="input-field">
        <input
            id="username"
            type="text"
            class="validate"
            v-model="username"
        >
        <label for="username">Имя пользователя</label>
        <small class="helper-text invalid" v-if="!username">Поле обязательно для заполнения</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            class="validate"
            v-model="password"
        >
        <label for="password">Пароль</label>
        <small class="helper-text invalid" v-if="!password">Поле обязательно для заполнения</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect orange auth-submit"
            type="submit"
            :disabled="!username || !password"
        >
          Войти
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    submitHandler() {
      if (!this.username || !this.password) {
        alert('Пожалуйста, заполните все поля');
        return;
      }

      // Проверка имени пользователя и пароля
      const validUsers = [
        {
          username: 'Иван_Волостнов',
          password: 'I010399V',
        },
        {
          username: 'Иван_Мазур',
          password: 'IM7182IM',
        },
        {
          username: 'Дима_Винокуров',
          password: 'DV4422DV',
        },
        {
          username: 'Михаил_Волостнов',
          password: 'MNV26010399',
        },
        {
          username: 'Катя_Сидорина',
          password: 'KS36104KS',
        },
        {
          username: 'Юра_Черевако',
          password: 'UH228UH',
        },
      ];

      const user = validUsers.find(u => u.username === this.username && u.password === this.password);

      if (user) {
        this.$router.push('/dashboard'); // Переход на /history в случае успешной проверки
      } else {
        console.error('Ошибка аутентификации: неверное имя пользователя или пароль');
        alert('Ошибка аутентификации: неверное имя пользователя или пароль');
      }
    },
  },
};
</script>
