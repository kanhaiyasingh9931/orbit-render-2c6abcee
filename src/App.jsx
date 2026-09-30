import React, { useState, useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CheckCircle2 } from 'lucide-react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import FilterBar from './components/FilterBar';
import { getTodos, saveTodos } from './utils/storage';

const App = () => {
  const [todos, setTodos] = useState(() => getTodos());
  const [filter, setFilter] = useState('all');

  // Persist todos whenever state changes
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const handleAddTodo = (title) => {
    const newTodo = {
      id: uuidv4(),
      title,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
  };

  const handleToggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleClearCompleted = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      case 'all':
      default:
        return todos;
    }
  }, [todos, filter]);

  const activeCount = useMemo(() => {
    return todos.filter((todo) => !todo.completed).length;
  }, [todos]);

  const completedCount = useMemo(() => {
    return todos.filter((todo) => todo.completed).length;
  }, [todos]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-gray-900 py-10 px-4 sm:px-6 lg:px-8">
      <main className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-200 mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Orbit Tasks
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Keep track of your daily tasks, stay productive, and get things done.
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden backdrop-blur-lg">
          <div className="p-6 sm:p-8 space-y-6">
            <TodoInput onAddTodo={handleAddTodo} />

            <FilterBar
              filter={filter}
              onFilterChange={setFilter}
              activeCount={activeCount}
              completedCount={completedCount}
              onClearCompleted={handleClearCompleted}
            />

            <TodoList
              todos={filteredTodos}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
              filter={filter}
            />
          </div>
        </div>

        <footer className="mt-8 text-center text-xs text-gray-400">
          <p>Tasks are automatically saved locally in your browser.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;