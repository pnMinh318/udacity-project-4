/**
 * Fields in a request to create a single TODO item.
 */
export interface CreateTodoRequest {
  name: string
  dueDate: string
  createdAt: string
  done: boolean
  attachmentUrl: string
}

export interface CreateTodoResponse {
  item: {
    todoId: string
    createdAt: string
    name: string
    dueDate: string
    done: boolean
    attachmentUrl: string
  }
}
