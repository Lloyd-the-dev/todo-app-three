<template>
  <main class="app">
    
		<section class="greeting">
			<h2 class="title">
				What's up, <input type="text" id="name" placeholder="Name here" v-model="name">
			</h2>
		</section>

		<section class="create-todo">
			<h3>CREATE A TODO</h3>

			<form id="new-todo-form" @submit.prevent="addTodo">
				<input 
					type="text" 
					name="content" 
					id="content" 
					placeholder="e.g. write a book"
					v-model="input_content" />

				<input type="submit" value="Add todo" />
			</form>
		</section>

		<section class="todo-list">
			<h3>TODO LIST</h3>
      <p>Click to mark completed</p>
			<div class="list" id="todo-list">

				<div v-for="todo in todos_asc" :class="`todo-item ${todo.done && 'done'}`">
					<label>
						<input type="checkbox" v-model="todo.done" />
            <span :class="`bubble business`"></span>
					</label>

					<div class="todo-content">
						<input type="text" v-model="todo.content" />
					</div>

					<div class="actions">
						<button class="delete" @click="removeTodo(todo)">Delete</button>
					</div>
				</div>

			</div>
		</section>
  </main>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const name = ref('');
const input_content = ref('');

const todos_asc = computed(() => store.state.todos.sort((a, b) => a.createdAt - b.createdAt));

watch(name, (newVal) => {
  store.dispatch('saveName', newVal);
});

watch(store.state.todos, (newVal) => {
  localStorage.setItem('todos', JSON.stringify(newVal));
}, {
  deep: true,
});

const addTodo = () => {
  if (input_content.value.trim() === '') {
    return;
  }

  store.dispatch('addNewTodo', {
    content: input_content.value,
    done: false,
    editable: false,
    createdAt: new Date().getTime(),
  });

  input_content.value = ''; // Clear the input box
};

const removeTodo = (todo) => {
  store.dispatch('removeTodoAction', todo);
};

onMounted(() => {
  name.value = localStorage.getItem('name') || '';
});
</script>
