import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 另外寫
const LS = {
  load () {
    // 讀取（拿儲存的內容）
    // 可能一開始沒存過(localStorage.getItem('vue-todo') || '[]')
    // 預設字串化
    return JSON.parse(localStorage.getItem('vue-todo') || '[]')
  },
  save (data) {
    // 字串化傳入
    localStorage.setItem('vue-todo', JSON.stringify(data))
  }
}

const filter = {
  all (todos) {
    return todos
  },
  active (todos) {
    return todos.filter(todo => {
      return !todo.complete
    })
  },
  complete (todos) {
    return todos.filter(todo => {
      return todo.complete
    })
  }
}

export default new Vuex.Store({
  state: {
    // 資料架構
    todos: [
      {
        content: 'todo-content',
        complete: 'false'
      },
      {
        content: 'todo-content',
        complete: 'true'
      },
      {
        content: 'todo-content',
        complete: 'false'
      }
    ]
  },
  getters: {
    todoIndex (state) {
      return filter[state.route.name](state.todos).map(todo => state.todos.indexOf(todo))
    }
  },
  mutations: {
    // save LS
    // 儲存 localstorage 把資料塞回 state 中
    SET_TODOS (state, data) {
      //  state.todos 等於傳進來的 data
      state.todos = data
      LS.save(state.todos)
    },
    ADD_TODO (state, data) {
      state.todos.push(data)
      // 記得存入，下次重新整理才拿得到
      LS.save(state.todos)
    },
    // 解構
    UPDATE_TODO (state, { index, data }) {
      state.todos[index].complete = data.complete
      state.todos[index].content = data.content
      LS.save(state.todos)
    },
    REMOVE_TODO (state, index) {
      state.todos.splice(index, 1)
      LS.save(state.todos)
    }
  },
  actions: {
    // load LS
    // 需要去讀取 localstorage
    INIT_TODOS ({ commit }) {
      commit('SET_TODOS', LS.load())
    }
  },
  modules: {}
})
