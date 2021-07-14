import {TaskType} from './App';
import {Checkbox, IconButton} from '@material-ui/core';
import EditableSpan from './EditableSpan';
import {Delete} from '@material-ui/icons';
import {ChangeEvent, memo, useCallback} from 'react';

type PropsType = {
  task: TaskType
  removeTask: (taskID: string, todoListID: string) => void
  changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
  changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
  todoListID: string
}


const Task = memo((props: PropsType) => {
  let taskClass = props.task.isDone ? 'is-done' : ''

  const removeTask = () => props.removeTask(props.task.id, props.todoListID)
  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todoListID)
  }
  const changeTaskTitle = useCallback((title: string) => {
    props.changeTaskTitle(props.task.id, title, props.todoListID)
  }, [props.changeTaskTitle, props.task.id, props.todoListID])

  return (
      <li>
          <span className={taskClass}>
            <Checkbox
                size={'small'}
                color={'primary'}
                checked={props.task.isDone}
                onChange={changeTaskStatus}
            />
            <EditableSpan title={props.task.title} changeTitle={changeTaskTitle}/>
          </span>
        <IconButton onClick={removeTask} color={'secondary'}>
          <Delete/>
        </IconButton>
      </li>
  )
})

export default Task