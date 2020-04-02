import Vue from "nativescript-vue";
import store from './store';
import axios from 'axios';

const connectivity = require("connectivity");

export const base = axios.create({
    baseURL: 'https://api.todolist.sherpa.one/',
    headers: {
        'Authorization' : ''
    }
});

base.interceptors.request.use( (config) =>{
    const connectionType = connectivity.getConnectionType();
    switch (connectionType) {
        case connectivity.connectionType.none:
            config.cancelToken = new axios.CancelToken((cancel) => cancel('Aucune Connexion Internet'));
            alert("Aucune connexion Internet");
            return config;
            break;
        case connectivity.connectionType.wifi:
            return config;
            break;
        case connectivity.connectionType.mobile:

            return config;
            break;
    }
})

Vue.prototype.$axios = base;

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
    axios,
    template: `
        <Frame>
            <Login />
        </Frame>`,

    components: {
        Login
    }
}).$start();


