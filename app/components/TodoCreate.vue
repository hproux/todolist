<template>
    <Page actionBarHidden="false">
        <ActionBar class="navbar" title="Ajouter une tâche">
            <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="$navigateBack"/>
        </ActionBar>
        <StackLayout v-if="type=='text'">
            <TextField class="title" v-model:text="toDo.title" hint="Entrez le titre ..."/>
            <TextView class="content" v-model:text="toDo.content" hint="Description ..."/>
            <Button class="validate" text="Valider" @tap="saveToDo"/>
        </StackLayout>
        <StackLayout v-if="type=='photo'">
            <TextField class="title" v-model:text="toDo.title" hint="Entrez le titre ..."/>
            <Button class="validate" text="Prendre une photo" @tap="saveToDoPhoto"/>
        </StackLayout>
        <StackLayout v-if="type=='video'">
            <TextField class="title" v-model:text="toDo.title" hint="Entrez le titre ..."/>
            <Button class="validate" text="Prendre une video" @tap="saveToDoVideo"/>
        </StackLayout>

    </Page>
</template>

<script>
    import Todo from '../classes/Todo.js';
    import axios from "axios";
    import { EventData, Observable, fromObject } from "tns-core-modules/data/observable";
    import { Page } from "tns-core-modules/ui/page";
    import { View } from 'tns-core-modules/ui/core/view';
    import { takePicture, requestPermissions } from "nativescript-camera";
    const vr = require('nativescript-videorecorder');

    export default {

        name: 'TodoCreate',
        props: ['type'],
        data() {
            return {
                toDo: new Todo(),
                cameraImage : null,
            }
        },
        created(){
          console.log(this.type);
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
            },
            saveToDoPhoto(args) {
                if (this.toDo.title !== "") {
                        let page = (args.object).page;
                        let that = this;
                        requestPermissions().then(
                            () => {
                                takePicture({ width: 320, height: 240, keepAspectRatio: true, saveToGallery: true, allowsEditing: false }).
                                then((imageAsset) => {
                                        that.cameraImage = imageAsset;

                                        console.log(this.cameraImage.ob);
                                    },
                                    (err) => {
                                        console.log("Error -> " + err.message);
                                    });
                            },
                            () => alert('permissions rejected')
                        );
                } else {
                    alert("Le titre n'est pas rempli!");
                }
            },
            saveToDoVideo() {
                if (this.toDo.title !== "") {
                    var options = {
                        saveToGallery: false,
                        duration: 10,
                        format: 'mp4',
                        size: 1000,
                        hd: true,
                        explanation: 'Prendre une video'
                    }

                    var videorecorder = new vr.VideoRecorder(options);

                    videorecorder.record().then((data)=>{
                        console.log(data.file)
                    }).catch((err)=>{
                        console.log(err);
                        alert('Impossible de prendre une video, veuillez réessayer');
                    })
                } else {
                    alert("Le titre n'est pas rempli!");
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
