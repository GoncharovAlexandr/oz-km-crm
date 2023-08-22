<template>
  <form class="card auth-card" @submit.prevent="createTask" method="post" enctype="multipart/form-data">
    <div class="card-content">
      <div class="page-title">
        <h3>Задачи</h3>
      </div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>
      <div class="input-field">
        <input id="name" type="text" v-model="name">
        <label for="name">Название</label>
        <span class="helper-text invalid" v-if="!name">Введите название</span>
      </div>

      <div class="input-field">
        <input id="customer" type="text" v-model="customer">
        <label for="customer">Заказчик</label>
        <span class="helper-text invalid" v-if="!customer">Укажите заказчика</span>
      </div>

      <div class="input-field">
        <input id="responsible" type="text" v-model="responsible">
        <label for="responsible">Ответственный</label>
        <span class="helper-text invalid" v-if="!responsible">Укажите имя</span>
      </div>

      <div class="input-field">
        <textarea id="task" class="materialize-textarea" v-model="taskDescription"></textarea>
        <label for="task">Задание</label>
        <span class="helper-text invalid" v-if="!taskDescription">Напишите задание</span>
      </div>

      <div class="input-field">
        <div v-for="(file, index) in files" :key="index" class="file-input-wrapper">
          <input type="file" :id="'file-input-' + index" :name="'files'" @change="fileSelected($event, index)">
          <label :for="'file-input-' + index">Выберите файл</label>
          <button class="btn waves-effect red" @click="removeFile(index)">Удалить</button>
        </div>
        <button class="btn waves-effect green" @click.prevent="addFile">Добавить файл</button>
      </div>

      <div class="input-field">
        <input id="startDate" type="date" v-model="startDate">
        <label for="startDate">Дата начала</label>
      </div>

      <div class="input-field">
        <input id="endDate" type="date" v-model="endDate">
        <label for="endDate">Дата завершения</label>
      </div>

      <div class="input-field">
        <input id="status" type="text" v-model="status">
        <label for="status">Статус</label>
        <span class="helper-text invalid" v-if="!status">Укажите статус</span>
      </div>

      <button class="btn waves-effect orange" type="submit">
        Создать
        <i class="material-icons right"></i>
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const name = ref('');
const customer = ref('');
const responsible = ref('');
const taskDescription = ref('');
const startDate = ref('');
const endDate = ref('');
const status = ref('');
const files = ref([]);

const addFile = () => {
  files.value.push(null);
};

const removeFile = (index) => {
  files.value.splice(index, 1);
};

const fileSelected = (event, index) => {
  files.value[index] = event.target.files[0];
};

const createTask = async () => {
  if (!name.value || !customer.value || !responsible.value || !taskDescription.value || !startDate.value || !endDate.value || !status.value) {
    alert('Пожалуйста, заполните все поля');
    return;
  }

  const formData = new FormData();
  formData.append('title', name.value);
  formData.append('description', taskDescription.value);
  formData.append('customer', customer.value);
  formData.append('responsible', responsible.value);
  formData.append('startDate', startDate.value);
  formData.append('endDate', endDate.value);
  formData.append('status', status.value);

  for (let i = 0; i < files.value.length; i++) {
    formData.append('files', files.value[i]);
  }

  try {
    const response = await axios.post('http://192.168.5.213:8080/create_task/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response.data);
    alert('Задача успешно создана');
  } catch (error) {
    console.error('Ошибка при создании задачи:', error);
    alert('Произошла ошибка при создании задачи');
  }
};
</script>
