<template src="./template.html">

</template>

<script>
export default {
  data () {
    return {
      todo: ''
    }
  },
  methods: {
    submitHandler () {
      if (!this.todo) return
      this.$store.commit('ADD_TODO', {
        content: this.todo,
        complete: false
      })
      this.todo = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.todoInput > input{
    border-radius: 3px;
    display: block;
    background-color: #f6f6f6;
    font-size: 14px;
    padding: 9px 25px 9px 10px;
    width: 100%;
    box-sizing: border-box;
    border: 2px solid #dfd8d8;
}
</style>
