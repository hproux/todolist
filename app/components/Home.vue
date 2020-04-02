<template>
  <Page actionBarHidden="false">
    <ActionBar class="navbar" title="ToDo List">
      <Button width="200em" class="triBtn" text="Trier les données" @tap="filterTodos" />

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
      <fab v-show="showBtns==false" @tap="addToDo" row="1" rippleColor="#f1f1f1" class="fab-button">+</fab>
        <fab v-show="showBtns" @tap="addToDoText" icon="res://edit" row="1" rippleColor="#f1f1f1" class="fab-buttonText"></fab>
        <fab v-show="showBtns" @tap="addToDoPhoto" icon="res://camera" row="1" rippleColor="#f1f1f1" class="fab-buttonPhoto"></fab>
        <fab v-show="showBtns" @tap="addToDoVideo" icon="res://video" row="1" rippleColor="#f1f1f1" class="fab-buttonVideo"></fab>
    </GridLayout>
  </Page>
</template>

<script>
import Todo from '../classes/Todo.js';
import TodoCreate from "./TodoCreate";
import TodoDetail from "./TodoDetail";

export default {
  name: 'Home',
  components : [
    TodoCreate,
    TodoDetail,
  ],
  data(){
    return{
      listOfItems : null,
      showBtns : null,
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
    addToDoText(){
      this.showBtns = false;
      this.$navigateTo(TodoCreate,{
        props: {
          type: 'text',
        }
      });
    },
    addToDoPhoto(){
      this.showBtns = false;
      this.$navigateTo(TodoCreate,{
        props: {
          type: 'photo',
        }
      });
    },
    addToDoVideo(){
      this.showBtns = false;
      this.$navigateTo(TodoCreate,{
        props: {
          type: 'video',
        }
      });
    },
    addToDo(args){
        const fab = args.object;
        fab.animate({
                  duration: 750,
                  target: fab,
                  opacity: 0,
                  translate: {x:0,y: 350 },
                  rotate: 900
                })
                .then(() => {
                  fab.animate({
                    duration: 3000,
                    target: fab,
                    opacity: 100,
                    translate: {x:0,y: 0 },
                  })
                  this.showBtns = true;
                });
    },
    removeToDo(){

    },
    filterTodos(){
      console.log("les todos: " + this.$store.state.todos);

      this.$store.commit("filterTodos");
    }
  },
  created(){
    console.log("test");
    this.showBtns = false;
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

.fab-buttonText,.fab-buttonVideo,.fab-buttonPhoto{
  height: 70;
  width: 70; /// this is required on iOS - Android does not require width so you might need to adjust styles
  margin: 15;
  background-color: #13e9bc;
  vertical-align: bottom;
  color:white;
  font-size: 30em;
  font-weight: 100;
  animation-name: showBtnUp;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
}

@keyframes showBtnUp {
  from {transform: translateY(200px);}
  to {transform: translateY(0px);}
}

  .fab-buttonText{
    horizontal-align: left;
  }

.fab-buttonPhoto{
  horizontal-align: center;
}

.fab-buttonVideo{
  horizontal-align: right;
}
</style>
