import {FilterValuesType, TodoListType} from '../App';
import {v1} from 'uuid';

export type RemoveTodolistAT = {
  type: 'REMOVE-TODOLIST'
  todoListID: string
}

export type AddTodolistAT = {
  type: 'ADD-TODOLIST'
  title: string
  todolistId: string
}

type ChangeTodoListFilterAT = {
  type: 'CHANGE-TODOLIST-FILTER'
  filter: FilterValuesType
  todoListID: string
}

type ChangeTodoListTitleAT = {
  type: 'CHANGE-TODOLIST-TITLE'
  title: string
  todoListID: string
}

export type ActionType = RemoveTodolistAT | AddTodolistAT | ChangeTodoListFilterAT | ChangeTodoListTitleAT

const initialState: TodoListType[] = []

export const todoListsReducer = (todoLists = initialState, action: ActionType): Array<TodoListType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return todoLists.filter(tl => tl.id !== action.todoListID)
    case 'ADD-TODOLIST':
      const newTodoList: TodoListType = {
        id: action.todolistId,
        title: action.title,
        filter: 'all'
      }
      return [...todoLists, newTodoList]
    case 'CHANGE-TODOLIST-FILTER':
      return todoLists.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl)
    case 'CHANGE-TODOLIST-TITLE':
      return todoLists.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)
    default:
      return todoLists
  }
}

export const RemoveTodolistAC = (todoListID: string): RemoveTodolistAT => ({
  type: 'REMOVE-TODOLIST',
  todoListID
})

export const AddTodolistAC = (title: string): AddTodolistAT => ({
  type: 'ADD-TODOLIST',
  title,
  todolistId: v1()
})

export const ChangeTodoListFilterAC = (filter: FilterValuesType, todoListID: string): ChangeTodoListFilterAT => ({
  type: 'CHANGE-TODOLIST-FILTER',
  filter,
  todoListID
})

export const ChangeTodoListTitleAC = (title: string, todoListID: string): ChangeTodoListTitleAT => ({
  type: 'CHANGE-TODOLIST-TITLE',
  title,
  todoListID
})