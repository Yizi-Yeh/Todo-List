<template src="./template.html"> </template>

<script>
export default {
  data () {
    return {
      edit: null
    }
  },
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    todo () {
      return this.$store.state.todos[this.index]
    },
    complete: {
      get () {
        return this.todo.complete
      },
      set (val) {
        this.$store.commit('UPDATE_TODO', {
          index: this.index,
          data: {
            content: this.todo.content,
            // 傳進來的 val
            complete: val
          }
        })
      }
    }
  },
  methods: {
    destoryHandler () {
      if (confirm(`是否確認刪除 ${this.todo.content}?`)) {
        this.$store.commit('REMOVE_TODO', this.index)
      }
    },
    editHandler () {
      this.edit = this.todo.content
    },
    submitHandler () {
      if (!this.edit) this.destoryHandler()
      this.$store.commit('UPDATE_TODO', {
        index: this.index,
        data: {
          content: this.edit,
          complete: this.todo.complete
        }
      })
      this.cancelHandler()
    },
    cancelHandler () {
      // 清空正在修改的
      this.edit = null
    }
  }
}
</script>

<style lang="scss">
.todoItem {
  background-color: rgb(228, 250, 215);
  border: 1px solid rgb(9, 10, 9);
  border-radius: 3px;
  height: 50px;
  width: 200px;
  margin: 20px auto 20px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  & > input {
  }
  & > label {
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
  & > button {
    cursor: pointer;
    font-size: 20px;
    color: rgb(46, 44, 44);
    height: 50%;
    background-color: transparent;
    border: none;
  }
}
</style>
