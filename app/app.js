import Vue from "nativescript-vue";
import store from './store'
Vue.registerElement(
  'Fab',
  () => require('@nstudio/nativescript-floatingactionbutton').Fab
);
import Vuex from 'vuex';
import Home from "./components/Home";
new Vue({
  store,
    template: `
        <Frame>
            <Home />
        </Frame>`,

    components: {
        Home
    }
}).$start();
