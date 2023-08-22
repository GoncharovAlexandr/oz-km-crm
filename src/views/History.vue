<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>
    <div class="sorting-buttons">
      <button class="btn-small btn" @click="sortByName">#А-Я</button>
    </div>
    <section>
      <table>
        <thead>
        <tr>
          <th>#</th>
          <th>Название</th>
          <th>Дата начала</th>
          <th>Дата окончания</th>
          <th>Ответственный</th>
          <th>Статус</th>
          <th>Открыть</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="task in tasks" :key="task.id">
          <td>{{ task.id }}</td>
          <td>{{ task.title }}</td>
          <td>{{ task.start_date }}</td>
          <td>{{ task.end_date }}</td>
          <td>{{ task.responsible }}</td>
          <td>
              <span class="white-text badge" :class="getStatusClass(task.status)">
                {{ task.status }}
              </span>
          </td>
          <td>
            <button class="btn-small btn" @click="openTask(task.id)">
              <i class="material-icons">Открыть</i>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const tasks = ref([]);
const router = useRouter();
const sortByName = () => {
  tasks.value.sort((a, b) => a.responsible.localeCompare(b.responsible));
};

const getStatusClass = (status) => {
  const lowercaseStatus = status.toLowerCase();

  if (lowercaseStatus.includes('в работе') || lowercaseStatus.includes('активно')) {
    return 'orange';
  } else if (lowercaseStatus.includes('окончено') || lowercaseStatus.includes('выполнено')) {
    return 'grey';
  } else if (lowercaseStatus.includes('просрочено') || lowercaseStatus.includes('не выполнено')) {
    return 'black';
  } else {
    return 'green';
  }
};

const openTask = (taskId) => {
  router.push({ name: 'Record', params: { id: taskId } });
};

onMounted(async () => {
  try {
    const response = await axios.get('http://192.168.5.213:8080/history/');
    tasks.value = response.data;
  } catch (error) {
    console.error('Ошибка при получении списка задач:', error);
  }
});
</script>
