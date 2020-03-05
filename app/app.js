import Vue from "nativescript-vue";
import store from './store';
import axios from 'axios';

//Vue.config.silent = TNS_ENV === 'production'
/*Vue.prototype.axios = axios.create({
    baseURL: 'https://api.todolist.sherpa.one/',
    headers: {'Authorization': 'Bearer ' + store.getters.token}
});*/
console.log(store.getters.token);
Vue.registerElement(
  'CheckBox',
  () => require('@nstudio/nativescript-checkbox').CheckBox,
  {
    model: {
      prop: 'checked',
      event: 'checkedChange'
    }
  }
);

Vue.registerElement(
  'Fab',
  () => require('@nstudio/nativescript-floatingactionbutton').Fab
);
import Vuex from 'vuex';
import Login from "./components/Login";
new Vue({
  store,
    template: `
        <Frame>
            <Login />
        </Frame>`,

    components: {
        Login
    }
}).$start();


