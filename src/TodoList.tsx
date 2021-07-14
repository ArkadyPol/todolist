import {memo, useCallback} from 'react';
import {FilterValuesType, TaskType} from './App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import Task from './Task';

type PropsTodoListType = {
  todoListID: string
  title: string
  tasks: Array<TaskType>
  filter: FilterValuesType
  removeTask: (taskID: string, todoListID: string) => void
  removeTodoList: (todoListID: string) => void
  addTask: (title: string, todoListID: string) => void
  changeTodoListFilter: (filterValue: FilterValuesType, todoListID: string) => void
  changeTodoListTitle: (title: string, todoListID: string) => void
  changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
  changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
}

const TodoList = memo((props: PropsTodoListType) => {
  const {filter, tasks} = props

  const addTask = useCallback((title: string) => props.addTask(title, props.todoListID), [props.addTask, props.todoListID])

  let tasksForTodolist: Array<TaskType> = tasks

  switch (filter) {
    case 'active':
      tasksForTodolist = tasks.filter(t => !t.isDone)
      break
    case 'completed':
      tasksForTodolist = tasks.filter(t => t.isDone)
      break
  }

  const changeTaskTitle = useCallback((taskID: string, title: string, todoListID: string) => {
    props.changeTaskTitle(taskID, title, todoListID)
  }, [props.changeTaskTitle])
  const changeTaskStatus = useCallback((taskID: string, isDone: boolean, todoListID: string) => {
    props.changeTaskStatus(taskID, isDone, todoListID)
  }, [props.changeTaskStatus])
  const removeTask = useCallback((taskID: string, todoListID: string) => {
    props.removeTask(taskID, todoListID)
  }, [props.removeTask])

  const tasksJSXElements = tasksForTodolist.map(t => {

    return (
        <Task key={t.id} task={t} changeTaskTitle={changeTaskTitle}
              changeTaskStatus={changeTaskStatus} todoListID={props.todoListID} removeTask={removeTask}/>
    )
  })

  const changeTodoListTitle = useCallback((title: string) => props.changeTodoListTitle(title, props.todoListID), [props.changeTodoListTitle, props.todoListID])
  const removeTodolist = useCallback(() => props.removeTodoList(props.todoListID), [props.removeTodoList, props.todoListID])
  const onClickSetAllFilter = useCallback(() => props.changeTodoListFilter('all', props.todoListID), [props.changeTodoListFilter])
  const onClickSetActiveFilter = useCallback(() => props.changeTodoListFilter('active', props.todoListID), [props.changeTodoListFilter])
  const onClickSetCompletedFilter = useCallback(() => props.changeTodoListFilter('completed', props.todoListID), [props.changeTodoListFilter])

  return (
      <div>
        <h3>
          <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
          <IconButton onClick={removeTodolist} color={'secondary'}>
            <Delete/>
          </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul style={{listStyle: 'none', padding: 0}}>
          {tasksJSXElements}
        </ul>
        <div>
          <Button
              variant={filter === 'all' ? 'contained' : 'outlined'}
              color={'primary'}
              size={'small'}
              onClick={onClickSetAllFilter}>All
          </Button>
          <Button
              style={{marginLeft: '3px'}}
              variant={filter === 'active' ? 'contained' : 'outlined'}
              color={'primary'}
              size={'small'}
              onClick={onClickSetActiveFilter}>Active
          </Button>
          <Button
              style={{marginLeft: '3px'}}
              variant={filter === 'completed' ? 'contained' : 'outlined'}
              color={'primary'}
              size={'small'}
              onClick={onClickSetCompletedFilter}>Completed
          </Button>
        </div>
      </div>
  )
});

export default TodoList