import { createStore } from 'vuex';

const store = createStore({
  state: {
    name: '',
    todos: [],
  },
  mutations: {
    setName(state, newName) {
      state.name = newName;
    },
    addTodo(state, newTodo) {
      state.todos.push(newTodo);
    },
    removeTodo(state, todo) {
      state.todos = state.todos.filter((t) => t !== todo);
    },
  },
  actions: {
    saveName({ commit }, newName) {
      commit('setName', newName);
      localStorage.setItem('name', newName);
    },
    addNewTodo({ commit }, newTodo) {
      commit('addTodo', newTodo);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    removeTodoAction({ commit }, todo) {
      commit('removeTodo', todo);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
  },
});

export default store;
