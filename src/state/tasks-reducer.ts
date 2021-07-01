import {TasksStateType, TaskType} from '../App';
import {v1} from 'uuid';
import {AddTodolistAT, RemoveTodolistAT} from './todolists-reducer';

type RemoveTaskActionType = {
  type: 'REMOVE-TASK'
  taskId: string
  todolistId: string
}

type AddTaskActionType = {
  type: 'ADD-TASK'
  title: string
  todolistId: string
}

type ChangeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS'
  taskID: string
  isDone: boolean
  todoListID: string
}

type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE'
  taskID: string
  title: string
  todoListID: string
}

export type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistAT
    | RemoveTodolistAT


const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK':
      return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
    case 'ADD-TASK':
      const newTask: TaskType = {
        id: v1(),
        title: action.title,
        isDone: false
      }
      return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
    case 'CHANGE-TASK-STATUS':
      return {
        ...state,
        [action.todoListID]: state[action.todoListID].map(t => t.id === action.taskID ? {
          ...t,
          isDone: action.isDone
        } : t)
      }
    case 'CHANGE-TASK-TITLE':
      return {
        ...state,
        [action.todoListID]: state[action.todoListID].map(t => t.id === action.taskID ? {
          ...t,
          title: action.title
        } : t)
      }
    case 'ADD-TODOLIST':
      return {...state, [action.todolistId]: []}
    case 'REMOVE-TODOLIST':
      const newState = {...state}
      delete newState[action.todoListID]
      return newState
    default:
      return state
  }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => ({
  type: 'REMOVE-TASK',
  taskId,
  todolistId,
})

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => ({
  type: 'ADD-TASK',
  title,
  todolistId
})

export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string): ChangeTaskStatusActionType => ({
  type: 'CHANGE-TASK-STATUS',
  taskID,
  isDone,
  todoListID
})

export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string): ChangeTaskTitleActionType => ({
  type: 'CHANGE-TASK-TITLE',
  taskID,
  title,
  todoListID
})
