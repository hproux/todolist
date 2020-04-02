<template>
    <Page actionBarHidden="false">
        <ActionBar class="navbar" title="Modifier une tâche">
            <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="$navigateBack"/>
            <StackLayout orientation="horizontal">
                <Label class="navtitle" text="Modifier une tâche" fontSize="18" verticalAlignment="center"/>
                <Button class="trash" @tap="deletetodo" text="Supprimer la tâche"/>
            </StackLayout>
        </ActionBar>
        <StackLayout>
            <TextField class="title" v-model:text="title" hint="Entrez le titre ..."/>
            <TextView class="content" v-model:text="content" hint="Description ..."/>
            <check-box class="checkBox" :checked="isChecked" @checkedChange="isChecked = $event.value"
                       text="Valider la tâche"/>
            <Button class="validate" @tap="save" text="Enregistrer"/>
        </StackLayout>

    </Page>
</template>

<script>
    import Todo from '../classes/Todo.js';
    import Home from "./Home";

    export default {

        name: 'TodoDetail',
        created: function () {
            this.title = this.task.item.title;
            this.content = this.task.item.content;
            this.isChecked = this.task.item.done;
        },
        data() {
            return {
                isChecked: null,
                title: null,
                content: null,
            }
        },
        props: [
            'task',
        ],
        components: {
            Home,
        },
        methods: {
            save() {
                let that = this;
                that.task.item.title = that.title;
                that.task.item.content = that.content;
                that.task.item.done = that.isChecked;
                that.$store.commit('saveState');
                that.$axios.defaults.headers.Authorization = 'Bearer ' + that.$store.state.token;
                console.log(that.task.item.uuid);
                that.$axios.patch("users/" + this.$store.state.uuid + "/todos/" + that.task.item.uuid, {
                    content: that.task.item.content,
                    done: that.task.item.done,
                }).then((result) => {
                    console.log(result.data);
                }).catch((err) => {
                    console.log(err);
                })
                that.$navigateBack();
            },
            deletetodo() {
                let that = this;
                let dialogs = require("tns-core-modules/ui/dialogs");
                dialogs.confirm({
                    title: "Supression d'une tâche",
                    message: "Voulez-vous vraiment supprimer cette tâche ?",
                    okButtonText: "Oui",
                    cancelButtonText: "Non",
                }).then(function (result) {
                    if (result) {
                        console.log("delete");
                        that.$axios.defaults.headers.Authorization = 'Bearer ' + that.$store.state.token;
                        that.$axios.delete("users/" + that.$store.state.uuid + "/todos/" + that.task.item.uuid)
                            .then((result) => {
                                console.log("https://api.todolist.sherpa.one/users/" + that.$store.state.uuid + "/todos/" + that.task.item.uuid);
                                that.$navigateTo(Home);

                            }).catch((err) => {
                            console.log("error : https://api.todolist.sherpa.one/users/" + that.$store.state.uuid + "/todos/" + that.task.item.uuid);
                            console.log(err.response.request._response);
                            that.$navigateTo(Home);
                        })

                    }
                });
            }
        }
    };
</script>

<style scoped lang="scss">

    .mamaille {
        height: 30em;
        background-color: black;
    }

    .navtitle {
        horizontal-align: left;
    }

    .trash {
        horizontal-align: right;
    }

    // Custom styles
    .title {
        font-size: 25em;
    }

    .content {
        font-size: 25em;
        height: 72%;
    }

    .validate {
        margin-bottom: 5%;
    }

    .navbar {
        text-align: center;
    }

    .checkBox {
        font-size: 35em;
    }
</style>
