import Vue from 'nativescript-vue';
import Vuex from 'vuex';
import localStorage from 'nativescript-localstorage';
import axios from 'axios';
import Todo from '../classes/Todo.js';
import Utils from '../classes/Utils.js';
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
        id: null,
        todos: [],
        token: null,
        uuid: null,
        connectivity : null,
    },
    mutations: {
        setConnectivity(state, data){
          state.connectivity = data;
        },
        setId(state, data) {
            state.id = data;
        },
        addTodo(state, todo) {
            this.state.todos.push(todo);
        },
        saveState(state) {
            console.log("data saved");
        },
        filterTodos(state) {
            this.state.todos.sort(function (a, b) {
                return a.done - b.done
            });
        },
        setToken(state, token) {
            this.state.token = token;
        },
        setUuid(state, uuid) {
            this.state.uuid = uuid;
        },
        loadTodos(state){
            console.log("appelé 1fois");
            this.state.todos = [];
            axios.defaults.headers.Authorization = 'Bearer ' + this.state.token;
            axios.get("https://api.todolist.sherpa.one/users/" + this.state.uuid + "/todos/")
                .then((result) => {
                result.data.todos.forEach(element=>{
                    let title = Utils.splitContent(element.content)[0];
                    let content = Utils.splitContent(element.content)[1];
                    let done = element.done;
                    let uuid = element.uuid;
                    let todo = new Todo(title,content,done,uuid);
                    this.state.todos.push(todo);
                });
            }).catch((err) => {
                console.log(err);
            })
        }
    }
});
