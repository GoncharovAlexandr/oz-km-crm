<template>
  <div class="employee-list">
    <div class="employee-card" v-for="(employee, index) in employees" :key="index">
      <h3 class="username">{{ employee.name }}</h3>
      <div class="task-status">
        <div class="task-status-item">
          <div class="task-status-circle active"></div>
          <div class="task-status-label orange-text">Активные задачи ({{ employee.activeTasks }})</div>
        </div>
        <div class="task-status-item">
          <div class="task-status-circle completed"></div>
          <div class="task-status-label grey-text">Выполненные задачи ({{ employee.completedTasks }})</div>
        </div>
        <div class="task-status-item">
          <div class="task-status-circle overdue"></div>
          <div class="task-status-label black-text">Просроченные задачи ({{ employee.overdueTasks }})</div>
        </div>
      </div>
      <div class="chart-container">
        <div class="chart" :style="getChartStyle(employee)"></div>
        <div class="efficiency" :class="getEfficiencyColor(employee)">
          <div class="efficiency-text">
            Эффективность сотрудника:
            <span class="efficiency-value">{{ employee.efficiency.toFixed(2) }}</span>%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      employees: [],
    };
  },
  mounted() {
    this.fetchEmployeeData();
  },
  methods: {
    async fetchEmployeeData() {
      try {
        const response = await axios.get('https://av22.pythonanywhere.com/get_employee_data');
        this.employees = response.data;
      } catch (error) {
        console.error('Ошибка при получении данных сотрудников:', error);
      }
    },
    getChartStyle(employee) {
      const totalTasks = employee.activeTasks + employee.completedTasks + employee.overdueTasks;
      const activePercentage = (employee.activeTasks / totalTasks) * 100;
      const completedPercentage = (employee.completedTasks / totalTasks) * 100;
      const overduePercentage = (employee.overdueTasks / totalTasks) * 100;

      return `
        background-image: conic-gradient(
          var(--active-color, #ff9900) 0deg ${activePercentage}%,
          var(--completed-color, #828282) ${activePercentage}% ${activePercentage + completedPercentage}%,
          var(--overdue-color, #000000) ${activePercentage + completedPercentage}% 100%
        );
      `;
    },
    getEfficiencyColor(employee) {
      if (employee.efficiency > 80) {
        return 'grey';
      } else if (employee.efficiency > 50) {
        return 'orange';
      } else {
        return 'black';
      }
    },
  },
};
</script>

<style scoped>
.employee-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.employee-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 250px;
}

.task-status {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

.task-status-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.task-status-circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 5px;
}

.task-status-label {
  font-size: 12px;
}

.active {
  background-color: var(--active-color, #ff9900);
}

.completed {
  background-color: var(--completed-color, #828282);
}

.overdue {
  background-color: var(--overdue-color, #000000);
}

.chart {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 10px 0;
}

.efficiency {
  padding: 5px;
  text-align: center;
}

.efficiency.grey {
  background-color: grey;
  color: #fff;
}

.efficiency.orange {
  background-color: orange;
  color: #fff;
}

.efficiency.black {
  background-color: black;
  color: #fff;
}

.efficiency-value {
  font-weight: bold;
  margin-left: 5px;
}

.username {
  font-size: 0.8em; /* Уменьшение в 3 раза */
}
</style>
