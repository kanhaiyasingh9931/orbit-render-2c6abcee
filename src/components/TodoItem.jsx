import React from 'react';
import { Check, Trash2 } from 'lucide-react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <li className="group flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition duration-150 ease-in-out hover:shadow-md">
      <div className="flex items-center space-x-3 flex-1 min-w-0 pr-4">
        <button
          type="button"
          role="checkbox"
          aria-checked={todo.completed}
          aria-label={`Mark "${todo.title}" as ${todo.completed ? 'incomplete' : 'complete'}`}
          onClick={() => onToggle(todo.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-md border flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            todo.completed
              ? 'bg-blue-600 border-blue-600 text-white'
              : 'border-gray-300 dark:border-gray-600 hover:border-blue-500 bg-transparent'
          }`}
        >
          {todo.completed && <Check className="w-4 h-4 stroke-[3]" />}
        </button>
        <span
          className={`text-base truncate select-none transition-colors duration-150 ${
            todo.completed
              ? 'line-through text-gray-400 dark:text-gray-500'
              : 'text-gray-800 dark:text-gray-100'
          }`}
        >
          {todo.title}
        </span>
      </div>

      <button
        type="button"
        aria-label={`Delete "${todo.title}"`}
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 focus:opacity-100 p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </li>
  );
};

export default TodoItem;