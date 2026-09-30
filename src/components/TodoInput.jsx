import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const TodoInput = ({ onAddTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedText = text.trim();
    if (!trimmedText) return;

    onAddTodo(trimmedText);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center w-full">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        className="w-full px-4 py-3 pr-12 text-gray-800 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out placeholder-gray-400"
        maxLength={200}
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="absolute right-2 p-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-40 disabled:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
        aria-label="Add todo"
      >
        <Plus className="w-5 h-5" />
      </button>
    </form>
  );
};

export default TodoInput;