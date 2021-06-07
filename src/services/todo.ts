import { Todo, TodoFilter } from '@/types'

class TodoService {
  readonly storage
  readonly key: string
  private static instance: TodoService;

  public static getInstance(): TodoService {
    if (!this.instance) {
      this.instance = new TodoService();
    }

    return this.instance
}

  private constructor () {
    this.storage = localStorage
    this.key = 'todos'
  }

  save (todos: Todo[]) {
    this.storage.setItem(this.key, JSON.stringify(todos))
  }

  get (filter: TodoFilter = {q: '', sortDesc: true}): Todo[] {
    const data = this.storage.getItem(this.key)

    let todos: Todo[] = data !== null ? JSON.parse(data) : []

    if (todos.length === 0) {
      return todos
    }

    todos = todos.sort((a, b) => {
      return filter.sortDesc === true
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    })

    if (filter.q?.trim()) {
      const keyword = filter.q.toLowerCase()
      todos = todos.filter(todo => todo.content.toLowerCase().includes(keyword))
    }

    return todos
  }

  create (todo: Todo) {
    const todos = this.get()

    todos.unshift(todo)

    this.save(todos)
  }

  update (id: string, todo: Todo): void {
    const todos = this.get()

    const index : number = todos.findIndex(e => e.id === id)

    if (index === -1) {
      return
    }

    todos[index].content = todo.content
    todos[index].isCheck = todo.isCheck

    this.save(todos)
  }

  delete (id: string) {
    const todos = this.get()

    const index : number = todos.findIndex(e => e.id === id)

    if (index === -1) {
      return
    }

    todos.splice(index, 1)

    this.save(todos)
  }

  deleteAll () {
    this.storage.removeItem(this.key)
  }
}

export default TodoService
