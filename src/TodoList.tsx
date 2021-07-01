import {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from './App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TodoListType} from './AppWithRedux';

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

function TodoList(props: PropsTodoListType) {
  const todo = useSelector<AppRootStateType, TodoListType>(state => state.todolists.filter(t => t.id === props.todoListID)[0])
  const tasksSel = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.todoListID])
  const dispatch = useDispatch()

  const {filter} = props

  const addTask = (title: string) => props.addTask(title, props.todoListID)

  const tasksJSXElements = props.tasks.map(t => {
    const removeTask = () => props.removeTask(t.id, props.todoListID)
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
      props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
    }
    const changeTaskTitle = (title: string) => {
      props.changeTaskTitle(t.id, title, props.todoListID)
    }

    let taskClass = t.isDone ? 'is-done' : ''
    return (
        <li key={t.id}>
          <span className={taskClass}>
            <Checkbox
                size={'small'}
                color={'primary'}
                checked={t.isDone}
                onChange={changeTaskStatus}
            />
            <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
          </span>
          <IconButton onClick={removeTask} color={'secondary'}>
            <Delete/>
          </IconButton>
        </li>
    )
  })

  const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListID)
  const removeTodolist = () => props.removeTodoList(props.todoListID)
  const onClickSetAllFilter = () => props.changeTodoListFilter('all', props.todoListID)
  const onClickSetActiveFilter = () => props.changeTodoListFilter('active', props.todoListID)
  const onClickSetCompletedFilter = () => props.changeTodoListFilter('completed', props.todoListID)

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
}

export default TodoList