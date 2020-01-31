<template>
  <Page actionBarHidden="false">
    <ActionBar class="navbar" title="Ajouter une tâche">
  <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
</ActionBar>
    <StackLayout >
      <TextField class="title" v-model:text="toDo.title" hint="Entrez le titre ..." />
      <TextView class="content" v-model:text="toDo.content" hint="Description ..." />
      <Button class="validate" text="Valider" @tap="saveToDo" />
    </StackLayout>

  </Page>
</template>

<script>
import Todo from '../classes/Todo.js';

export default {

  name: 'TodoCreate',
  data(){
    return{
      toDo : new Todo(),
    }
  },
  methods:{
    saveToDo(){
      if(this.toDo.title!="" && this.toDo.content!=""){
        this.$store.commit("addTodo",this.toDo);
        this.$navigateBack();
      }else{
        alert("Tous les champs ne sont pas remplis!");
      }
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
  height: 80%;
}
.validate{
  margin-bottom: 5%;
}
.navbar{
  text-align: center;
}
</style>
