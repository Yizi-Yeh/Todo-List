<template>
  <div id="app">
    <h1 class="title">Todo List</h1>
    <div id="nav">
      <router-link to="/all">全部</router-link> |
      <router-link to="/active">未完成</router-link>|
      <router-link to="/complete">已完成</router-link>
    </div>
    <TodoInput />
    <div id="id">
      <!-- props 的 :key -->
      <TodoListItem v-for="index in todoIndex" :key="index" :index="index" />
    </div>
  </div>
</template>
<script>
import TodoInput from '@/components/Todoinput/index.vue'
import TodoListItem from '@/components/TodoListItem/index.vue'
export default {
  components: {
    TodoInput,
    TodoListItem
  },
  computed: {
    todoIndex () {
      return this.$store.getters.todoIndex
    }
  },
  mounted () {
    this.$store.dispatch('INIT_TODOS')
  }
}
</script>

<style lang="scss">
body,
html {
  height: 100%;
  width: 100%;
  position:relative
}

#app {
  margin-top:10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: inline-block;
  padding: 20px;
  max-width: 640px;
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.title {
  padding: 20px;
  margin-top: -20px;
  margin-left: -20px;
  margin-right: -20px;
}
</style>
