import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList';

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
  const [filter, setFilter] = useState<FilterValuesType>('all');

  const [tasks, setTasks] = useState<Array<TaskType>>([
    {id: 1, title: 'HTML', isDone: true},
    {id: 2, title: 'CSS', isDone: true},
    {id: 3, title: 'React', isDone: false},
    {id: 4, title: 'Redux', isDone: false},
  ])

  function changeTodoListFilter(filterValue: FilterValuesType) {
    setFilter(filterValue);
  }

  function removeTask(taskID: number) {
    const filteredTasks = tasks.filter(t => t.id !== taskID);
    setTasks(filteredTasks);
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
                  changeTodoListFilter={changeTodoListFilter}/>
      </div>
  );
}

export default App;
