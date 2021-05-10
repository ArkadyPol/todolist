import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from './App';

type PropsTodoListType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskID: string) => void
  addTask: (title: string) => void
  changeTodoListFilter: (filterValue: FilterValuesType) => void
}

function TodoList(props: PropsTodoListType) {
  const [title, setTitle] = useState<string>('');

  const tasksJSXElements = props.tasks.map(t => {
    const removeTask = () => props.removeTask(t.id)
    return (
        <li>
          <input type="checkbox" checked={t.isDone}/>
          <span>{t.title}</span>
          <button onClick={removeTask}>X</button>
        </li>
    )
  })

  const onClickAddTask = () => {
    props.addTask(title);
    setTitle('');
  };
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);
  const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter')
      onClickAddTask()
  };
  const onClickSetAllFilter = () => props.changeTodoListFilter('all');
  const onClickSetActiveFilter = () => props.changeTodoListFilter('active');
  const onClickSetCompletedFilter = () => props.changeTodoListFilter('completed');

  return (
      <div>
        <h3>{props.title}</h3>
        <div>
          <input value={title}
                 onChange={onChangeTitle}
                 onKeyPress={onKeyPressAddTask}
          />
          <button onClick={onClickAddTask}>+</button>
        </div>
        <ul>
          {tasksJSXElements}
        </ul>
        <div>
          <button onClick={onClickSetAllFilter}>All</button>
          <button onClick={onClickSetActiveFilter}>Active</button>
          <button onClick={onClickSetCompletedFilter}>Completed</button>
        </div>
      </div>
  )
}

export default TodoList;