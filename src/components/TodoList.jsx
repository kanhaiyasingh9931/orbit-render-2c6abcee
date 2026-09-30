import React from 'react';
import TodoItem from './TodoItem';
import { ClipboardList } from 'lucide-react';

const TodoList = ({ todos, onToggle, onDelete, filter = 'all' }) => {
  if (!todos || todos.length === 0) {
    let emptyMessage = 'No tasks yet. Add one above to get started!';
    if (filter === 'active') {
      emptyMessage = 'No active tasks right now. Great job!';
    } else if (filter === 'completed') {
      emptyMessage = 'No completed tasks yet. Finish a task to see it here!';
    }

    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="w-16 h-16 mb-4 rounded-full bg-blue-50 dark:bg-gray-800 flex items-center justify-center text-blue-500 dark:text-blue-400 shadow-inner">
          <ClipboardList className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
          No tasks found
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-2.5" aria-label="Todo list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default TodoList;