import Vue from 'nativescript-vue';
import Vuex from 'vuex';
import localStorage from 'nativescript-localstorage';
import * as ApplicationSettings from "application-settings";

Vue.use(Vuex);
const NSVuexPersistent = store => {
 // Init hook.
 let storageStr = localStorage.getItem('ns-vuex-persistent');
 if (storageStr) {
  store.replaceState(JSON.parse(storageStr))
 }
 store.subscribe((mutation, state) => {
  // Suscribe hook.
  localStorage.setItem('ns-vuex-persistent', JSON.stringify(state));
 })
};

export default new Vuex.Store({
  plugins: [NSVuexPersistent],
    state: {
        id : null,
        todos : [],
    },
    mutations: {
        setId(state, data){
          state.id = data;
        },
        addTodo(state, todo){
          this.state.todos.push(todo);
        },
    }
});
