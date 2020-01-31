<template>
  <Page actionBarHidden="false">
    <ActionBar title="">
    </ActionBar>
    <GridLayout rows="auto, *">
      <ListView row="1" for="item in listOfItems" @itemTap="onItemTap">
        <v-template>
          <Label :text="item.title" />
        </v-template>
      </ListView>
      <fab @tap="addToDo" row="1" rippleColor="#f1f1f1" class="fab-button">+</fab>
    </GridLayout>
  </Page>
</template>

<script>
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
      listOfItems : this.$store.state.todos,
    }
  },
  methods:{
    onItemTap(item){
      console.log(item);
      this.$navigateTo(TodoDetail,{
        props: {
          task : item,
        }
      });
    },
    addToDo(){
      this.$navigateTo(TodoCreate);
    }
  }
};
</script>

<style scoped lang="scss">
@import '~@nativescript/theme/scss/variables/blue';
ActionBar{
  height:30em;
  background-color: black;
}
// Custom styles
.fas {
  @include colorize($color: accent);
}
Label{
  text-align: center;
  font-size: 50em;
}
.info {
  font-size: 20;
  horizontal-align: center;
  vertical-align: center;
}
.fab-button {
  height: 70;
  width: 70; /// this is required on iOS - Android does not require width so you might need to adjust styles
  margin: 15;
  background-color: #13e9bc;
  horizontal-align: right;
  vertical-align: bottom;
  color:white;
  font-size: 30em;
  font-weight: 100;
}

</style>
