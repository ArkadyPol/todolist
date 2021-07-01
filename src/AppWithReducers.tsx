import {useReducer} from 'react';
import './App.css';
import TodoList from './TodoList';
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
  AddTodolistAC,
  ChangeTodoListFilterAC,
  ChangeTodoListTitleAC,
  RemoveTodolistAC,
  todoListsReducer
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function AppWithReducer() {
  const todoListID_1 = v1()
  const todoListID_2 = v1()
  const [todoLists, dispatchToTodolists] = useReducer(todoListsReducer, [
    {id: todoListID_1, title: 'What to learn', filter: 'all'},
    {id: todoListID_2, title: 'What to buy', filter: 'all'},
  ])

  const [tasks, dispatchToTasks] = useReducer(
      tasksReducer,
      {
        [todoListID_1]: [
          {id: v1(), title: 'HTML', isDone: true},
          {id: v1(), title: 'CSS', isDone: true},
          {id: v1(), title: 'JS', isDone: true},
          {id: v1(), title: 'React', isDone: false},
        ],
        [todoListID_2]: [
          {id: v1(), title: 'Milk', isDone: false},
          {id: v1(), title: 'Bread', isDone: true},
          {id: v1(), title: 'Meat', isDone: false},
        ]
      }
  )


  function removeTask(taskID: string, todoListID: string) {
    dispatchToTasks(removeTaskAC(taskID, todoListID))
  }

  function addTask(title: string, todoListID: string) {
    dispatchToTasks(addTaskAC(title, todoListID))
  }

  function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
    dispatchToTasks(changeTaskStatusAC(taskID, isDone, todoListID))
  }

  function changeTaskTitle(taskID: string, title: string, todoListID: string) {
    dispatchToTasks(changeTaskTitleAC(taskID, title, todoListID))
  }

  function changeTodoListFilter(filter: FilterValuesType, todoListID: string) {
    let action = ChangeTodoListFilterAC(filter, todoListID)
    dispatchToTodolists(action)
  }

  function changeTodoListTitle(title: string, todoListID: string) {
    dispatchToTodolists(ChangeTodoListTitleAC(title, todoListID))
  }

  function removeTodoList(todoListID: string) {
    const action = RemoveTodolistAC(todoListID)
    dispatchToTodolists(action)
    dispatchToTasks(action)
  }

  function addTodoList(title: string) {
    const action = AddTodolistAC(title)
    dispatchToTodolists(action)
    dispatchToTasks(action)
  }


  function getFilteredTasks(tl: TodoListType) {
    switch (tl.filter) {
      case 'active':
        return tasks[tl.id].filter(t => !t.isDone)
      case 'completed':
        return tasks[tl.id].filter(t => t.isDone)
      default:
        return tasks[tl.id]
    }
  }

  const todoListsComponents = todoLists.map(tl => {
    const tasksForTodoList = getFilteredTasks(tl)
    return (
        <Grid item key={tl.id}>
          <Paper elevation={5} style={{padding: '20px'}}>
            <TodoList
                todoListID={tl.id}
                title={tl.title}
                filter={tl.filter}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                removeTodoList={removeTodoList}
                changeTodoListFilter={changeTodoListFilter}
                changeTodoListTitle={changeTodoListTitle}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
                addTask={addTask}/>
          </Paper>
        </Grid>
    )
  })

  return (
      <div className="App">
        <AppBar position={'static'}>
          <Toolbar style={{justifyContent: 'space-between'}}>
            <IconButton color={'inherit'}>
              <Menu/>
            </IconButton>
            <Typography variant={'h6'}>
              Todolists
            </Typography>
            <Button
                color={'inherit'}
                variant={'outlined'}
            >Login</Button>
          </Toolbar>
        </AppBar>
        <Container fixed>
          <Grid container style={{padding: '20px 0'}}><AddItemForm addItem={addTodoList}/></Grid>
          <Grid container spacing={5}> {todoListsComponents}</Grid>
        </Container>
      </div>
  )
}

export default AppWithReducer
