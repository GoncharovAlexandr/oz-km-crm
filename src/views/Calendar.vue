<template>
  <div>
    <h2>Календарь с заданиями</h2>
    <full-calendar :options="calendarOptions"></full-calendar>
  </div>
</template>

<script>
import Vue from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';

export default {
  components: {
    FullCalendar,
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        events: [],
        eventClick: this.handleEventClick,
        eventDidMount: this.customizeEventColor, // Добавляем эту функцию для настройки цвета событий
      },
    };
  },
  mounted() {
    this.fetchTasks();
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await axios.get('http://av22.pythonanywhere.com/get_task_events');
        const tasks = response.data;

        const events = tasks.map(task => ({
          title: task.title,
          start: task.start_date,
          end: task.end_date,
          taskId: task.id,
          responsible: task.responsible, // Добавляем поле с ответственным
        }));

        this.calendarOptions.events = events;
      } catch (error) {
        console.error('Ошибка при получении списка задач:', error);
      }
    },
    handleEventClick(info) {
      const taskId = info.event.extendedProps.taskId;
      this.$router.push({ path: `/record/${taskId}/` });
    },
    customizeEventColor(info) {
      const responsible = info.event.extendedProps.responsible;

      if (responsible === 'Иван_Мазур') {
        info.el.style.backgroundColor = 'grey';
      } else if (responsible === 'Катя_Сидорина') {
        info.el.style.backgroundColor = 'black';
        info.el.style.color = 'white';
      } else if (responsible === 'Дима_Винокуров') {
        info.el.style.backgroundColor = 'orange';
      }
    },
  },
};
</script>
