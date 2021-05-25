import {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from './App';

type PropsTodoListType = {
  todoListID: string
  title: string
  tasks: Array<TaskType>
  filter: FilterValuesType
  removeTask: (taskID: string, todoListID: string) => void
  removeTodoList: (todoListID: string) => void
  addTask: (title: string, todoListID: string) => void
  changeTodoListFilter: (filterValue: FilterValuesType, todoListID: string) => void
  changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
}

function TodoList(props: PropsTodoListType) {
  const {filter} = props

  const [title, setTitle] = useState<string>('')
  const [error, setError] = useState<boolean>(false)

  const tasksJSXElements = props.tasks.map(t => {
    const removeTask = () => props.removeTask(t.id, props.todoListID)
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
      props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
    }
    let taskClass = t.isDone ? 'is-done' : ''
    return (
        <li key={t.id}>
          <input type="checkbox"
                 checked={t.isDone}
                 onChange={changeTaskStatus}
          />
          <span className={taskClass}>{t.title}</span>
          <button onClick={removeTask}>X</button>
        </li>
    )
  })

  const onClickAddTask = () => {
    const validatedTitle = title.trim()
    if (validatedTitle) {
      props.addTask(validatedTitle, props.todoListID)
    } else {
      setError(true)
    }
    setTitle('')
  };
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    setError(false)
  };
  const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter')
      onClickAddTask()
  };
  const onClickSetAllFilter = () => props.changeTodoListFilter('all', props.todoListID)
  const onClickSetActiveFilter = () => props.changeTodoListFilter('active', props.todoListID)
  const onClickSetCompletedFilter = () => props.changeTodoListFilter('completed', props.todoListID)

  return (
      <div>
        <h3>{props.title}
          <button onClick={() => props.removeTodoList(props.todoListID)}>X</button>
        </h3>
        <div>
          <input value={title}
                 onChange={onChangeTitle}
                 onKeyPress={onKeyPressAddTask}
                 className={error ? 'error' : ''}
          />
          <button onClick={onClickAddTask}>+</button>
          {error && <div style={{color: 'red'}}>Title is required!</div>}
        </div>
        <ul>
          {tasksJSXElements}
        </ul>
        <div>
          <button className={filter === 'all' ? 'active-filter' : ''}
                  onClick={onClickSetAllFilter}>All
          </button>
          <button className={filter === 'active' ? 'active-filter' : ''}
                  onClick={onClickSetActiveFilter}>Active
          </button>
          <button className={filter === 'completed' ? 'active-filter' : ''}
                  onClick={onClickSetCompletedFilter}>Completed
          </button>
        </div>
      </div>
  )
}

export default TodoList