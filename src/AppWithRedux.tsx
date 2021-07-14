import './App.css';
import TodoList from './TodoList';
import AddItemForm from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
  AddTodolistAC,
  ChangeTodoListFilterAC,
  ChangeTodoListTitleAC,
  RemoveTodolistAC,
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {useCallback} from 'react';

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

function AppWithRedux() {
  const todolists = useSelector<AppRootStateType, TodoListType[]>(state => state.todolists)
  const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

  const dispatch = useDispatch()

  const removeTask = useCallback((taskID: string, todoListID: string) => {
    dispatch(removeTaskAC(taskID, todoListID))
  }, [dispatch])

  const addTask = useCallback((title: string, todoListID: string) => {
    dispatch(addTaskAC(title, todoListID))
  }, [dispatch])

  const changeTaskStatus = useCallback((taskID: string, isDone: boolean, todoListID: string) => {
    dispatch(changeTaskStatusAC(taskID, isDone, todoListID))
  }, [dispatch])

  const changeTaskTitle = useCallback((taskID: string, title: string, todoListID: string) => {
    dispatch(changeTaskTitleAC(taskID, title, todoListID))
  }, [dispatch])

  const changeTodoListFilter = useCallback((filter: FilterValuesType, todoListID: string) => {
    let action = ChangeTodoListFilterAC(filter, todoListID)
    dispatch(action)
  }, [dispatch])

  const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
    dispatch(ChangeTodoListTitleAC(title, todoListID))
  }, [dispatch])

  const removeTodoList = useCallback((todoListID: string) => {
    const action = RemoveTodolistAC(todoListID)
    dispatch(action)
  }, [dispatch])

  const addTodoList = useCallback((title: string) => {
    const action = AddTodolistAC(title)
    dispatch(action)
  }, [dispatch])

  const todoListsComponents = todolists.map(tl => {

    return (
        <Grid item key={tl.id}>
          <Paper elevation={5} style={{padding: '20px'}}>
            <TodoList
                todoListID={tl.id}
                title={tl.title}
                filter={tl.filter}
                tasks={tasks[tl.id]}
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

export default AppWithRedux
