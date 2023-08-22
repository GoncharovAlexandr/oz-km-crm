import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import { Vuelidate } from 'vuelidate';
import router from './router';
import store from './store';
import VueFullCalendar from 'vue-full-calendar';
import dayGridPlugin from '@fullcalendar/daygrid'; // Добавленный импорт
import 'materialize-css/dist/js/materialize.min';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(Vuelidate);
app.use(VueFullCalendar, {
    plugins: [dayGridPlugin] // Добавленная настройка
});

app.mount('#app');
