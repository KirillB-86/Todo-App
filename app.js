var todoList = {
  todos: [],

  addTodo(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false,
    })
  },

  changeTodo() {},

  deleteTodo(item) {
    this.todos.splice(item, 1)
  },

  toggleCompleted(item) {
    this.todos[item].completed = !this.todos[item].completed
  },

  toggleAll() {
    let totalTodos = this.todos.length
    let todosTrue = 0

    this.todos.forEach((todo) => {
      if (todo.completed == true) {
        todosTrue++
      }
    })

    this.todos.forEach((todo) => {
      if (totalTodos == todosTrue) {
        todo.completed = false
      } else {
        todo.completed = true
      }
    })
  },
}

var handlers = {
  toggleAll() {
    todoList.toggleAll()
    view.displayTodos()
  },

  addTodo() {
    var addTodoText = document.getElementById("addTodoTextInput")
    var container = document.querySelector(".container-4")
    container.style.display = "flex"
    todoList.addTodo(addTodoText.value)
    addTodoText.value = ""
    view.displayTodos()
  },

  deleteTodo(position) {
    todoList.deleteTodo(position)
    if (todoList.todos.length === 0) {
      var container = document.querySelector(".container-4")
      container.style.display = "none"
    }
    view.displayTodos()
  },

  toggleCompleted(position) {
    todoList.toggleCompleted(position)
    view.displayTodos()
  },

  deleteAll() {
    todoList.todos = []
    var container = document.querySelector(".container-4")
    container.style.display = "none"
    view.displayTodos()
  },
}

var view = {
  displayTodos() {
    var todosUl = document.querySelector("ul")
    todosUl.innerHTML = ""

    todoList.todos.forEach((todo, i) => {
      var todoLi = document.createElement("li")
      var todoTextWithCompletion = ""
      var p = document.createElement("p")

      if (todo.completed === true) {
        todoTextWithCompletion = `${todo.todoText}`
        p.style.color = "rgb(190, 190, 190)"
      } else {
        todoTextWithCompletion = `${todo.todoText}`
        p.style.textDecoration = "none"
      }

      p.textContent = todoTextWithCompletion
      todoLi.className = `container-todo ${i}`
      todoLi.appendChild(p)
      todosUl.appendChild(todoLi)
      todoLi.appendChild(this.createCheckbox(todo.completed))
      todoLi.appendChild(this.createDeleteButton())
    }, this)
  },

  createDeleteButton() {
    var deleteButton
    deleteButton = document.createElement("button")
    deleteButton.textContent = "Delete"
    deleteButton.className = "btn btn-del"

    return deleteButton
  },

  createCheckbox(checked) {
    var checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.className = "check"
    checkbox.checked = checked
    return checkbox
  },

  setUpEventListener() {
    var todosUl = document.querySelector("ul")

    todosUl.addEventListener("click", (event) => {
      var elementClicked = event.target
      if (elementClicked.className === "btn btn-del") {
        handlers.deleteTodo(
          parseInt(elementClicked.parentNode.className.slice(-1))
        )
      }

      if (elementClicked.className === "check") {
        event.target.checked = true
        handlers.toggleCompleted(
          parseInt(elementClicked.parentNode.className.slice(-1))
        )
      }
    })
  },
}
view.setUpEventListener()
document
  .getElementById("addTodoTextInput")
  .addEventListener("keyup", (event) => {
    if (event.key !== "Enter") return
    document.querySelector("button").click()
    event.preventDefault()
  })
