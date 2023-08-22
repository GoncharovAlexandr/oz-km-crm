<template>
  <div>
    <div v-for="(employee, index) in employees" :key="index">
      <h3>{{ employee.name }}</h3>
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
        const response = await axios.get('http://av22.pythonanywhere.com/get_employee_data');
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
        width: 400px;
        height: 400px;
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

<style>
.task-status {
  display: flex;
  flex-direction: column;
}

.task-status-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.task-status-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
}

.task-status-label {
  color: #fff;
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
  width: 400px;
  height: 400px;
  border-radius: 50%;
  margin: 0 auto;
}

.efficiency {
  margin-top: 20px;
  padding: 10px;
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
</style>
