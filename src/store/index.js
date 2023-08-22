import { createStore } from 'vuex';

export default createStore({
    state: {
        // Здесь определите начальное состояние вашего хранилища
        // Например: count: 0
    },
    mutations: {
        // Здесь определите мутации для изменения состояния
        // Например:
        // increment(state) {
        //   state.count++;
        // }
    },
    actions: {
        // Здесь определите действия, которые могут использоваться для вызова мутаций
        // Например:
        // increment(context) {
        //   context.commit('increment');
        // }
    },
    getters: {
        // Здесь определите геттеры для получения значений из состояния
        // Например:
        // getCount: state => {
        //   return state.count;
        // }
    },
    modules: {
        // Здесь вы можете импортировать и подключить модули, если они нужны
        // Например:
        // cart: cartModule
    }
});
