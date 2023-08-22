<template>
  <div>
    <h2 class="task-title">{{ task.title }}</h2>
    <div class="task-info">
      <p><strong>Заказчик:</strong> {{ task.customer }}</p>
      <p><strong>Ответственный:</strong> {{ task.responsible }}</p>
      <p><strong>Статус:</strong> {{ task.status }}</p>
      <p><strong>Описание:</strong> {{ task.description }}</p>
      <p><strong>Начало:</strong> {{ task.start_date }}</p>
      <p><strong>Окончание:</strong> {{ task.end_date }}</p>
    </div>

    <h3 class="section-title">Прикрепленные файлы(задания):</h3>
    <ul>
      <li v-for="file in task.files" :key="file">
        <a :href="getFileDownloadUrl(file)" download>{{ getFileNameFromURL(file) }}</a>
      </li>
    </ul>


    <h3 class="section-title">Изменить статус:</h3>
    <div class="status-change">
      <input v-model="newStatus" type="text" placeholder="Новый статус">
      <button @click="updateStatus">Сохранить</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const taskId = route.params.id;
    const task = ref({});
    const newStatus = ref('');

    const openTask = async (taskId) => {
      try {
        const response = await axios.get(`https://av22.pythonanywhere.com/get_task/${taskId}/`);
        task.value = response.data;
      } catch (error) {
        console.error('Ошибка при получении задачи:', error);
      }
    };

    const updateStatus = async () => {
      try {
        const data = { status: newStatus.value };
        await axios.post(`https://av22.pythonanywhere.com/update_status/${taskId}/`, data);
        task.value.status = newStatus.value;
        newStatus.value = ''; // Очищаем поле после обновления статуса
      } catch (error) {
        console.error('Ошибка при обновлении статуса задачи:', error);
      }
    };

    const getFileNameFromURL = (url) => {
      return url.split('/').pop();
    };

    const getFileDownloadUrl = (file) => {
      return `https://av22.pythonanywhere.com/download_file/${getFileNameFromURL(file)}`;
    };

    onMounted(() => {
      openTask(taskId);
    });

    return {
      task,
      newStatus,
      updateStatus,
      getFileNameFromURL,
      getFileDownloadUrl,
    };
  },
};
</script>

<style scoped>
.task-title {
  font-size: 24px;
  font-weight: bold;
}

.task-info {
  margin-left: 20px;
}

.section-title {
  font-size: 18px;
  margin-top: 20px;
}

.status-change {
  margin-left: 20px;
}
</style>
