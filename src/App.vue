<template>
  <div id="app">
    <HelloWorld msg="TO DO APP"/>
    <ToDoList v-bind:toDos = "toDos" v-bind:newTodo="newTodo" v-bind:editting="editting"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import ToDoList from './components/ToDoList.vue'
const LOCAL_STORAGE_KEY = 'todo-app'

export default {
  name: 'App',
  data: function () {
    return {
      toDos: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {},
      newTodo: null,
      editting: null
    }
  },
  components: {
    HelloWorld,
    ToDoList
  },
  watch: {
    toDos: {
      deep: true,
      handler (newValue) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newValue))
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
