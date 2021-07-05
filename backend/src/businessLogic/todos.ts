import { TodoItem } from '../models/TodoItem'
import { TodosAccess } from '../dataLayer/todosAccess'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import * as uuid from 'uuid'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'

const todosAccess = new TodosAccess()
const logger = createLogger('todos')

export async function getTodos(userId: string): Promise<TodoItem[]> {
  logger.info('Getting todos')

  return await todosAccess.getTodos(userId)
}

export async function createTodo(
  createTodoRequest: CreateTodoRequest,
  userId: string
): Promise<TodoItem> {

  logger.info('Creating todo')

  const todoId = uuid.v4()

  return todosAccess.createTodo({
    userId: userId,
    todoId: todoId,
    createdAt: new Date().toISOString(),
    name: createTodoRequest.name,
    dueDate: createTodoRequest.dueDate,
    done: false
  })
}

export async function deleteTodo(userId: string, todoId: string) {
  logger.info('Deleting todo')

  await todosAccess.deleteTodo(userId, todoId)
}

export async function updateTodo(userId: string, todoId: string, updatedTodoRequest: UpdateTodoRequest) {
  logger.info('Updating todo')

  await todosAccess.updateTodo(userId, todoId, updatedTodoRequest)
}