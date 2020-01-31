<template>
  <Page actionBarHidden="false">
    <ActionBar class="navbar" title="Modifier une tâche">
  <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
</ActionBar>
    <StackLayout >
      <TextField class="title" v-model:text="task.item.title" hint="Entrez le titre ..." />
      <TextView class="content" hint="Description ..." />
      <Button class="validate" @tap="save" text="Enregistrer" />
    </StackLayout>

  </Page>
</template>

<script>
import Todo from '../classes/Todo.js';

export default {

  name: 'TodoDetail',
  data(){
    return{
    }
  },
  props :[
    'task',
  ],
  methods:{
    save(){
      console.log(this.task);
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
