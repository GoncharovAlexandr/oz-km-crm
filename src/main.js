import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import { Vuelidate } from 'vuelidate'; // Импортируйте Vuelidate правильно
import router from './router';
import store from './store';
import VueFullCalendar from 'vue-full-calendar';
import 'materialize-css/dist/js/materialize.min';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(Vuelidate); // Используйте Vuelidate правильно
app.use(VueFullCalendar);

app.mount('#app');
