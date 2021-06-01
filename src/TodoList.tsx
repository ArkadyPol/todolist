import {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from './App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';

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
        <li key={t.id} className={taskClass}>
          <input type="checkbox"
                 checked={t.isDone}
                 onChange={changeTaskStatus}
          />
          <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
          <button onClick={removeTask}>X</button>
        </li>
    )
  })

  const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListID)

  const onClickSetAllFilter = () => props.changeTodoListFilter('all', props.todoListID)
  const onClickSetActiveFilter = () => props.changeTodoListFilter('active', props.todoListID)
  const onClickSetCompletedFilter = () => props.changeTodoListFilter('completed', props.todoListID)

  return (
      <div>
        <h3>
          <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
          <button onClick={() => props.removeTodoList(props.todoListID)}>X</button>
        </h3>
        <AddItemForm addItem={addTask}/>
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