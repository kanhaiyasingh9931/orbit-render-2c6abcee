import React from 'react';

const FilterBar = ({
  filter = 'all',
  currentFilter,
  setFilter,
  onFilterChange,
  activeCount,
  completedCount,
  onClearCompleted,
}) => {
  const activeTab = currentFilter || filter;

  const handleFilterSelect = (selectedFilter) => {
    if (onFilterChange) {
      onFilterChange(selectedFilter);
    } else if (setFilter) {
      setFilter(selectedFilter);
    }
  };

  const filterOptions = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-3 px-4 border-t border-slate-100 dark:border-slate-700/60 text-sm text-slate-500 dark:text-slate-400 select-none">
      <div className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 order-2 sm:order-1">
        {typeof activeCount === 'number' ? (
          <span>
            <strong className="text-slate-800 dark:text-slate-100">{activeCount}</strong>{' '}
            {activeCount === 1 ? 'task' : 'tasks'} remaining
          </span>
        ) : null}
      </div>

      <div
        className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl order-1 sm:order-2"
        role="group"
        aria-label="Filter tasks"
      >
        {filterOptions.map(({ key, label }) => {
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => handleFilterSelect(key)}
              aria-pressed={isActive}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                isActive
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="order-3 min-w-[90px] text-right">
        {onClearCompleted && (completedCount === undefined || completedCount > 0) ? (
          <button
            type="button"
            onClick={onClearCompleted}
            className="text-xs sm:text-sm font-medium text-slate-400 hover:text-rose-500 dark:text-slate-500 dark:hover:text-rose-400 transition-colors focus:outline-none focus-visible:underline"
          >
            Clear completed
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default FilterBar;