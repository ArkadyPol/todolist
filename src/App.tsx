import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList';
import {v1} from 'uuid';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
  const [filter, setFilter] = useState<FilterValuesType>('all');

  const [tasks, setTasks] = useState<Array<TaskType>>([
    {id: v1(), title: 'HTML', isDone: true},
    {id: v1(), title: 'CSS', isDone: true},
    {id: v1(), title: 'React', isDone: false},
    {id: v1(), title: 'Redux', isDone: false},
  ])

  function changeTodoListFilter(filterValue: FilterValuesType) {
    setFilter(filterValue);
  }

  function removeTask(taskID: string) {
    const filteredTasks = tasks.filter(t => t.id !== taskID);
    setTasks(filteredTasks);
  }

  function addTask(title: string) {
    const newTask: TaskType = {
      id: v1(),
      title,
      isDone: false
    }
    const newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }

  function getFilteredTasks() {
    switch (filter) {
      case 'active':
        return tasks.filter(t => !t.isDone);
      case 'completed':
        return tasks.filter(t => t.isDone);
      default:
        return tasks;
    }

  }

  return (
      <div className="App">
        <TodoList title={'What to learn'} tasks={getFilteredTasks()} removeTask={removeTask}
                  changeTodoListFilter={changeTodoListFilter} addTask={addTask}/>
      </div>
  );
}

export default App;
