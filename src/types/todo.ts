interface Todo {
  id: string,
  content: string,
  createdAt: Date,
  isCheck: boolean
}

interface TodoFilter {
  q: string,
  sortDesc: boolean
}

export {
  TodoFilter,
  Todo
}

export default Todo
