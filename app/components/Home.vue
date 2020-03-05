<template>
  <Page actionBarHidden="false">
    <ActionBar class="navbar" title="ToDo List">
      <Button width="150em" class="triBtn" text="Trier la data" @tap="filterTodos" />

    </ActionBar>
    <GridLayout rows="auto, *">
      <ListView row="1" for="item in listOfItems" @itemTap="onItemTap" >
        <v-template>
          <GridLayout rows="auto",*>
            <!--<fab @tap="removeToDo" row="1" class="btnDelete">-</fab>-->

          <Label row="1" :text="item.title" />

          </GridLayout>
        </v-template>
      </ListView>
      <fab @tap="addToDo" row="1" rippleColor="#f1f1f1" class="fab-button">+</fab>
    </GridLayout>
  </Page>
</template>

<script>
//Ranger la data
//Supprimer la data
import Todo from '../classes/Todo.js';
import TodoCreate from "./TodoCreate";
import TodoDetail from "./TodoDetail";

import * as ApplicationSettings from "application-settings";
export default {
  name: 'Home',
  components : [
    TodoCreate,
    TodoDetail,
  ],
  data(){
    return{
      listOfItems : null,
    }
  },
  methods:{
    onItemTap(item){
      this.$navigateTo(TodoDetail,{
        props: {
          task : item,
        }
      });
    },
    addToDo(){
      this.$navigateTo(TodoCreate);
    },
    removeToDo(){

    },
    filterTodos(){
      console.log("les todos: " + this.$store.state.todos);

      this.$store.commit("filterTodos");
    }
  },
  created(){
    this.$store.commit("loadTodos");
    this.listOfItems = this.$store.state.todos;
    console.log("les todos: " + this.$store.state.todos);
  }


};
</script>

<style scoped lang="scss">
@import '~@nativescript/theme/scss/variables/blue';
/*ActionBar{
  height:30em;
  background-color: black;
}*/
// Custom styles
.fas {
  @include colorize($color: accent);
}
Label{
  text-align: center;
  font-size: 50em;
}

.triBtn{
  font-size: 20em;
  background-color: white;
  color : black;
}

.info {
  font-size: 20em;
  horizontal-align: center;
  vertical-align: center;
}

.navbar{
  text-align: center;
}
.btnDelete{
  height: 50;
  width: 50; /// this is required on iOS - Android does not require width so you might need to adjust styles
  margin: 7;
  background-color: #000000;
  horizontal-align: right;
  vertical-align: bottom;
  color:white;
  font-size: 30em;
  font-weight: 100;
}

.fab-button {
  height: 70;
  width: 70; /// this is required on iOS - Android does not require width so you might need to adjust styles
  margin: 15;
  background-color: #13e9bc;
  horizontal-align: left;
  vertical-align: bottom;
  color:white;
  font-size: 30em;
  font-weight: 100;
}

</style>
