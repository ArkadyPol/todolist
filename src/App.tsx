import {useState} from 'react';
import './App.css';
import TodoList from './TodoList';
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

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

function App() {
  const todoListID_1 = v1()
  const todoListID_2 = v1()
  const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    {id: todoListID_1, title: 'What to learn', filter: 'all'},
    {id: todoListID_2, title: 'What to buy', filter: 'all'},
  ])

  const [tasks, setTasks] = useState<TasksStateType>(
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
    const copyTasks = {...tasks}
    copyTasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
    setTasks(copyTasks)
  }

  function addTask(title: string, todoListID: string) {
    const newTask: TaskType = {
      id: v1(),
      title,
      isDone: false
    }
    setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
  }

  function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
    const copyTasks = {...tasks}
    copyTasks[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, isDone} : t)
    setTasks(copyTasks)
  }

  function changeTaskTitle(taskID: string, title: string, todoListID: string) {
    const copyTasks = {...tasks}
    copyTasks[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, title} : t)
    setTasks(copyTasks)
  }

  function changeTodoListFilter(filter: FilterValuesType, todoListID: string) {
    setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter} : tl))
  }

  function changeTodoListTitle(title: string, todoListID: string) {
    setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, title} : tl))
  }

  function removeTodoList(todoListID: string) {
    setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
    const copyTasks = {...tasks}
    delete copyTasks[todoListID]
    setTasks(copyTasks)
  }

  function addTodoList(title: string) {
    const newTodoListID = v1()
    const newTodoList: TodoListType = {
      id: newTodoListID,
      title,
      filter: 'all'
    }
    setTodoLists([...todoLists, newTodoList])
    setTasks({...tasks, [newTodoListID]: []})
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

export default App
