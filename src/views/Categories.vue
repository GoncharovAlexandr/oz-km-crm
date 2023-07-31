<template>
  <div>
    <div class="page-title">
      <h3>Задачи</h3>
    </div>
    <section>
      <div class="row">
        <div class="col s12 m6">
          <div>
            <div class="page-subtitle">
              <h4>Создать</h4>
            </div>
            <form>
              <div class="input-field">
                <input id="name" type="text">
                <label for="name">Название</label>
                <span class="helper-text invalid">Введите название</span>
              </div>

              <div class="input-field">
                <input id="customer" type="text">
                <label for="customer">Заказчик</label>
                <span class="helper-text invalid">Укажите заказчика</span>
              </div>

              <div class="input-field">
                <input id="responsible" type="text">
                <label for="responsible">Ответственный</label>
                <span class="helper-text invalid">Укажите имя</span>
              </div>

              <div class="input-field">
                <textarea id="task" class="materialize-textarea"></textarea>
                <label for="task">Задание</label>
                <span class="helper-text invalid">Напишите задание</span>
              </div>

              <div class="input-field">
                <div v-for="(file, index) in files" :key="index" class="file-input-wrapper">
                  <input type="file" :id="'file-input-' + index" :name="'file-' + index" multiple>
                  <label :for="'file-input-' + index">Выберите файл</label>
                  <button class="btn waves-effect red" @click="removeFile(index)">Удалить</button>
                </div>
                <button class="btn waves-effect green" @click.prevent="addFile">Добавить файл</button>
              </div>

              <div class="input-field">
                <input id="startDate" type="date">
                <label for="startDate">Дата начала</label>
              </div>

              <div class="input-field">
                <input id="endDate" type="date">
                <label for="endDate">Дата завершения</label>
              </div>

              <div class="input-field">
                <input id="status" type="text">
                <label for="status">Статус</label>
                <span class="helper-text invalid">Укажите статус</span>
              </div>

              <button class="btn waves-effect orange" type="submit">
                Создать
                <i class="material-icons right"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const files = ref([]);

const addFile = () => {
  files.value.push('');
};

const removeFile = (index) => {
  files.value.splice(index, 1);
};
</script>

<style>
/* Стили для вашей формы */
</style>
