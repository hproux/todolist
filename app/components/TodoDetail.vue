<template>
  <Page actionBarHidden="false">
    <ActionBar class="navbar" title="Modifier une tâche">
  <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
</ActionBar>
    <StackLayout >
      <TextField class="title" v-model:text="title" hint="Entrez le titre ..." />
      <TextView class="content" v-model:text="content" hint="Description ..." />
      <check-box class="checkBox" :checked="isChecked"  @checkedChange="isChecked = $event.value" text="Valider la tâche" />
      <Button class="validate" @tap="save" text="Enregistrer" />
    </StackLayout>

  </Page>
</template>

<script>
import Todo from '../classes/Todo.js';
import axios from "axios";

export default {

  name: 'TodoDetail',
  created: function(){
    this.title = this.task.item.title;
    this.content = this.task.item.content;
    this.isChecked = this.task.item.done;
  },
  data(){
    return{
      isChecked:null,
      title:null,
      content:null,
    }
  },
  props :[
    'task',
  ],
  methods:{
    save(){
      this.task.item.title = this.title;
      this.task.item.content = this.content;
      this.task.item.done = this.isChecked;
      this.$store.commit('saveState');
        axios.defaults.headers.Authorization = 'Bearer ' + this.$store.state.token;
        console.log(this.task.item.uuid);
        axios.patch("https://api.todolist.sherpa.one/users/" + this.$store.state.uuid + "/todos/"+this.task.item.uuid, {
            content: this.task.item.content,
            done : this.task.item.done,
        }).then((result) => {
            console.log(result.data);
        }).catch((err) => {
            console.log(err);
        })
      this.$navigateBack();
    }
  }
};
</script>

<style scoped lang="scss">

.mamaille{
  height:30em;
  background-color: black;
}
// Custom styles
.title{
  font-size: 25em;
}
.content{
  font-size: 25em;
  height: 72%;
}
.validate{
  margin-bottom: 5%;
}
.navbar{
  text-align: center;
}

.checkBox{
  font-size: 35em;
}
</style>
