var todoList = {
  todos: ["item1", "item2", "item3"],

  displayTodos() {
    console.log("My Todos: ")
    for (let i = 0; i < this.todos.length; i++) {
      console.log(this.todos[i])
    }
  },

  addTodo(item) {
    this.todos.push(item)
    this.displayTodos()
  },

  changeTodo(item, text) {
    this.todos[item] = text
    this.displayTodos()
  },

  deleteTodo(item) {
    this.todos.splice(item, 1)
    this.displayTodos()
  },
}
