<template>
    <Page actionBarHidden="false">
        <ActionBar class="navbar" title="Ajouter une tâche">
            <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="$navigateBack"/>
        </ActionBar>
        <StackLayout>
            <TextField class="title" v-model:text="toDo.title" hint="Entrez le titre ..."/>
            <TextView class="content" v-model:text="toDo.content" hint="Description ..."/>
            <Button class="validate" text="Valider" @tap="saveToDo"/>
        </StackLayout>

    </Page>
</template>

<script>
    import Todo from '../classes/Todo.js';
    import axios from "axios";

    export default {

        name: 'TodoCreate',
        data() {
            return {
                toDo: new Todo(),
            }
        },
        methods: {
            saveToDo() {
                console.log(this.toDo.title);
                if (this.toDo.title !== "" && this.toDo.content !== "") {
                    this.$store.commit("addTodo", this.toDo);
                    axios.defaults.headers.Authorization = 'Bearer ' + this.$store.state.token;
                    axios.post("https://api.todolist.sherpa.one/users/"+ this.$store.state.uuid+"/todos/", {
                        content: this.toDo.title+"//"+this.toDo.content,
                    }).then((result) => {
                        this.toDo.uuid = result.data.todo.uuid;
                        console.log(result.data);
                    }).catch((err) => {
                        console.log(err);
                    })
                    this.$navigateBack();
                } else {
                    alert("Tous les champs ne sont pas remplis!");
                }
            }
        }
    };
</script>

<style scoped lang="scss">

    .mamaille {
        height: 30em;
        background-color: black;
    }

    // Custom styles
    .title {
        font-size: 25em;
    }

    .content {
        font-size: 25em;
        height: 80%;
    }

    .validate {
        margin-bottom: 5%;
    }

    .navbar {
        text-align: center;
    }
</style>
